import { room, store } from '@context';
import { IPlayer } from '@types';

export default (player: IPlayer, message: string) => {
  room.sendAnnouncement(process?.env?.npm_package_version, player.id);
};
