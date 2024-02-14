import { config, room, store } from '@context';

import { IPlayer, ChatEnum, TeamsEnum } from '@types';
import PlayerManager from '@sharedable/helpers/PlayerManager';

import commands from '@sharedable/commands/all';

import teamChat from '@sharedable/commands/all/teamChat';

import { isEnoughCoins, buyCommand } from '@sharedable/helpers/chatHelpers';

import messageFilter from '@sharedable/utils/messageFilter';

const slowMode = new Set();

export default (player: IPlayer, message: string) => {
  const user = PlayerManager.getUser(player);

  let [command, ...rest] = message.split(' ');
  const msgArray = [command.toLowerCase(), rest.join(' ')];

  if (command.startsWith('!')) {
    const matchingCommand = commands.find(({ cmd }) => msgArray[0] == cmd);

    if (matchingCommand) {
      const params = { player, message, user, command: matchingCommand };

      const commandIsFailed = [isEnoughCoins, matchingCommand.executor].some((func) => func(params) === false);

      if (commandIsFailed || matchingCommand.price === 0) return false;

      buyCommand({ user, command: matchingCommand });

      return false;
    }

    room.sendAnnouncement(`Command "${msgArray[0]}" does not exist!`, player.id, ChatEnum.ERROR, 'small-bold', 1);
    return false;
  }

  //Check Mute
  const mutedAuth = user.entity.player.auth;

  if (store.mutedPlayers.hasOwnProperty(mutedAuth)) {
    room.sendAnnouncement(`You're muted!`, player.id, ChatEnum.ERROR, 'small-bold', 1);
    return false;
  }

  if (config.source.name == 'REAL_SOCCER' || config.source.name == 'NORMAL') {
    const isPrivateMessage = msgArray[0].substring(0, 2) === '@@' && msgArray[1];
    const isTeamChat = msgArray[0].toLowerCase() === 't' && msgArray[1];

    if (isTeamChat && !store.afkPlayersIds.has(player.id)) {
      teamChat(player, message);
      return false;
    }
  }

  const customColor: number = user.entity.state.items.find((item) => item.type === 'COLOR')?.value;
  const defaultColor = user.entity.state.role === 'ADMIN' ? 0xffdb72 : 0xffffff;

  const customMessage = {
    text: `[${user.entity.state.statistics.rank}] ${player.name}: ${message}`,
    color: customColor || defaultColor,
    type: customColor ? 'bold' : 'normal',
  };

  const sender = player;

  const recipents = room.getPlayerList();

  if (messageFilter(message)) return false;

  if (!slowMode.has(sender.id)) {
    for (const recipent of recipents) {
      const matchingSound = recipent.team != TeamsEnum.SPEC && sender.team == TeamsEnum.SPEC && recipent.admin == false ? 0 : 1;

      if (sender.team != TeamsEnum.SPEC && recipent.team == TeamsEnum.SPEC && recipent.admin == false) continue;

      room.sendAnnouncement(customMessage.text, recipent.id, customMessage.color, 'normal', matchingSound);

      if (!sender.admin) {
        slowMode.add(sender.id);

        setTimeout((playerId) => slowMode.delete(playerId), 3000, sender.id);
      }
    }
  }

  return false;
};
