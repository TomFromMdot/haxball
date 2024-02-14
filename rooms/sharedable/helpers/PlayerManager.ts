import { IPlayer, IUser } from '@types';

import { Statistics } from 'global/types/graphql';

let users: IUser[] = [];

import Query from './Query';
import { config } from '@context';

export default class {
  player: IPlayer;

  constructor(player: IPlayer) {
    this.player = player;
  }

  async authenticate() {
    try {
      const entity = await Query.upsertPlayer({ player: this.player });

      users = [...users, { player: this.player, entity }];

      return entity;
    } catch (err) {
      console.log(err);
    }
  }

  static updateEntity = async ({ player }: { player: IPlayer }) => {
    try {
      const entity = await Query.upsertPlayer({ player });

      const currentPlayer = { player, entity };

      this.add(currentPlayer);
    } catch (err) {
      console.log(err);
    }
  };

  static updateStats = async ({ user, stats }: { user: IUser; stats: Partial<Statistics> }) => {
    await Query.updateRoomState({ user, data: { statistics: stats } });

    await this.updateEntity({ player: user?.player });
  };

  static delete = ({ id }: { id: number }) => {
    users = users.filter((user) => user.player.id != id);
  };

  static add = (user: IUser) => {
    this.delete(user.player);

    users = [...users, user];
  };

  static getUser = (player: { id: number }): IUser => users.find((user) => user.player.id == player.id);
  static getAllUsers = () => users;
  static findUser = ({ auth, conn, id }: { auth: string; conn: string; id: number }) => users.find((user) => user.player.auth == auth || user.player.conn == conn || user.player.id == id);
  static findManyUsers = ({ auth, conn }: { auth: string; conn: string }) => users.filter((user) => user.player.auth === auth || user.player.conn === conn);
}
