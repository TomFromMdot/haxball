import { ChatEnum, ICommandArgs } from '@types';

import PlayerManager from '@sharedable/helpers/PlayerManager';

import { room, store } from '@context';

export default ({ player, message }: ICommandArgs) => {
  const playerNames = [];

  for (const playerId of store.afkPlayersIds) {
    const player = room.getPlayer(Number(playerId));
    if (player) {
      playerNames.push(player.name);
    }
  }

  if (playerNames.length > 0) {
    room.sendAnnouncement(`🔻 AFKs: ${playerNames.join(', ')}`, player.id, ChatEnum.LIME, 'small-bold', 2);
  } else {
    room.sendAnnouncement('🔻 There is no AFK.', player.id, ChatEnum.LIME, 'small-bold', 2);
  }

  return false;
};
