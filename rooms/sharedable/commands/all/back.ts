import { ChatEnum, ICommandArgs } from '@types';

import { room, store } from '@context';

export default ({ player, message, command }: ICommandArgs): boolean => {
  if (player.team != 0) {
    room.sendAnnouncement(`🔻 You cant go AFK when you are playing!`, player.id, ChatEnum.ERROR, 'small-bold', 2);
    return false;
  }
  const isPlayerNotAFK = !store.afkPlayersIds.has(player.id);

  if (isPlayerNotAFK) {
    room.sendAnnouncement(`🔻 You aren't AFK!`, player.id, ChatEnum.ERROR, 'small-bold', 2);
    return false;
  }

  store.afkPlayersIds.delete(player.id);
  room.sendAnnouncement(`🔻 ${player.name} went back from AFK!`, null, ChatEnum.ERROR, 'small-bold', 1);

  return true;
};
