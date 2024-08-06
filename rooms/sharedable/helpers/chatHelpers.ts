import { room } from '@context';
import { ChatEnum, ICommand, IUser } from '@types';
import PlayerManager from './PlayerManager';

interface IParams {
  user: IUser;
  command: ICommand;
}
export const buyCommand = ({ user, command }: IParams) => {
  // if (user.entity.state.role == 'ADMIN') return;

  const updatedCoins = (user.entity.state.statistics.coins || 0) - command.price;

  PlayerManager.updateStats({ user, stats: { coins: -command.price } });

  room.sendAnnouncement(`🔻 You have bought ${command.cmd.substring(1).toUpperCase()}! Your current balance: ${updatedCoins} BOLTS`, user.player.id, ChatEnum.SUCCESS, 'small-bold', 2);
};

export const isEnoughCoins = ({ user, command }: IParams): boolean => {
  const isNotEnoughCoins = (user.entity.state.statistics.coins || 0) < command.price;
  const success = isNotEnoughCoins === false;

  if (isNotEnoughCoins) {
    room.sendAnnouncement(`🔻 You don't have enough BOLTS, to use this command! (${command.price} BOLTS). You can buy BOLTS on yourdomain.com/shop!`, user.player.id, ChatEnum.ERROR, 'small-bold', 1);
  }

  return success;
};
