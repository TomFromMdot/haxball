import { ChatEnum, ICommandArgs } from '@types';

import PlayerManager from '@sharedable/helpers/PlayerManager';

import { room, store } from '@context';

export default ({ player, message }: ICommandArgs) => {
  if (!player.admin) return false;

  const params = message.split(' ');
  const playerId = params[1];

  const invalidParameter = !playerId;

  if (invalidParameter) {
    room.sendAnnouncement(`🔻 Usage: !unmute id`, player.id, ChatEnum.ERROR, 'small-bold', 1);
    return false;
  }

  const matchingPlayer = room.getPlayer(Number(playerId));

  if (!matchingPlayer) {
    room.sendAnnouncement(`🔻 Cannot find this player. Usage: !unmute id`, player.id, ChatEnum.ERROR, 'small-bold', 1);
    return false;
  }

  const user = PlayerManager.getUser(matchingPlayer as { id: number });

  const mutedAuth = user.entity.player.auth;

  if (!store.mutedPlayers.hasOwnProperty(mutedAuth)) {
    room.sendAnnouncement(`🔻 Player is not muted!`, player.id, ChatEnum.ERROR, 'small-bold', 1);
    return false;
  }

  delete store.mutedPlayers[mutedAuth];

  room.sendAnnouncement(`🔻 Player ${matchingPlayer.name} has been unmuted by ${player.name}!`, null, ChatEnum.PURPLE, 'small-bold', 1);

  return true;
};
