import { ICommandArgs, ChatEnum } from '@types';

import { room } from '@context';

import PlayerManager from '@sharedable/helpers/PlayerManager';

export default ({ player, message }: ICommandArgs) => {
  const user = PlayerManager.getUser(player).entity;
  room.sendAnnouncement(`Your rank: ${user.state.statistics.rank}\n💠 Points: ${user.state.statistics.points}\n⚡ Bolts: ${user.state.statistics.coins}`, player.id, ChatEnum.YELLOW, 'small-bold', 2);
};
