import { UpsertPlayerPlayerInput, UpdateRoomStateFieldsInput, UpdatePlayerInput, ReceiveOrderInput, CreatedOrderInput, ItemOutput } from 'global/types/graphql';

import graphQlClient from '@sharedable/utils/getGraphqlClient';
import { IPlayer, IPlayerAdditional, IUpsertPlayer, IUser } from '@types';

import { config } from '@context';

export default class {
  static client = graphQlClient;

  static async upsertPlayer({ player }: { player: IUpsertPlayer }): Promise<IUser['entity'] | null> {
    try {
      const playerInput = { auth: player.auth, conn: player.conn, name: player.name } as UpsertPlayerPlayerInput;

      const { entity } = await graphQlClient.UpsertPlayer({ player: playerInput, roomState: { room: config.source.id } });

      // @ts-ignore
      return entity;
    } catch (err) {
      console.log(err);

      return null;
    }
  }

  static async updatePlayer(input: UpdatePlayerInput): Promise<void> {
    try {
      await graphQlClient.UpdatePlayer({ input });
    } catch (err) {
      console.log(err);

      return null;
    }
  }

  static async receiveOrder(input: ReceiveOrderInput) {
    try {
      const { receiveOrder } = await graphQlClient.ReceiveOrder({ input });
      return receiveOrder;
    } catch (err) {
      console.log(err);

      return null;
    }
  }

  static async updateRoomState({ user, data }: { user: IUser; data: UpdateRoomStateFieldsInput }): Promise<void> {
    try {
      const input = {
        filter: {
          auth: user.player.auth,
          room: user.entity.state.room,
        },
        fields: data,
      };

      const res = await graphQlClient.UpdateRoomState({ input });
    } catch (err) {
      console.log(err);

      return null;
    }
  }
}
