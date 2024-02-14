import { ChatEnum, ICommandArgs, TeamsEnum } from '@types';

import { room } from '@context';

export default ({ player, message }: ICommandArgs) => {
  if (player.team != TeamsEnum.SPEC) return room.sendAnnouncement(`You can't leave if you're in match right now.`, player.id, ChatEnum.RED, 'small-bold', 1);

  room.kickPlayer(player.id, 'KICK', false);
};
