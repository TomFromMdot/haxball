import { ChatEnum, ICommandArgs } from '@types';

import { room, store } from '@context';

export default ({ player, message }: ICommandArgs) => {
  if (!player.admin) return;

  if (store.vpnCheck == true) {
    room.sendAnnouncement(`🔻 VPN has been turned off!`, player.id, ChatEnum.RED, 'small-bold', 2);
    store.vpnCheck = false;
  } else {
    room.sendAnnouncement(`🔻 VPN has been turned on!`, player.id, ChatEnum.CALM_GREEN, 'small-bold', 2);
    store.vpnCheck = true;
  }
  return false;
};
