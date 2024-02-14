import { ChatEnum, ICommandArgs } from '@types';

import { room, store } from '@context';

export default ({ player, message, command }: ICommandArgs): boolean => {
  if (player.team != 0) {
    room.sendAnnouncement(`🔻 You cant go AFK when you are playing!`, player.id, ChatEnum.ERROR, 'small-bold', 2);
    return false;
  }

  const isPlayerAFK = store.afkPlayersIds.has(player.id);

  if (isPlayerAFK) {
    room.sendAnnouncement(`🔻 You're already AFK!`, player.id, ChatEnum.ERROR, 'small-bold', 2);
    room.sendAnnouncement(`🔻 Type !back if u dont wan't be AFK anymore!`, player.id, ChatEnum.ERROR, 'small-bold', 2);

    return false;
  }

  store.afkPlayersIds.add(player.id);
  room.sendAnnouncement(`🔻 ${player.name} went AFK!`, null, ChatEnum.ERROR, 'small-bold', 1);

  return true;
};
