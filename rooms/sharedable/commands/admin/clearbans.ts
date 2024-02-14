import { ChatEnum, ICommandArgs } from '@types';
import { room } from '@context';

export default ({ player, message }: ICommandArgs) => {
  if (!player.admin) return;

  room.clearBans();
  room.sendAnnouncement(`🔻 Bans have been cleared!`, player.id, ChatEnum.SUCCESS, 'small-bold', 1);
};
