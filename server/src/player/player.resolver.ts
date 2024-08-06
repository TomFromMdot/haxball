import {
  Args,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import {
  UpdateRoomStateOutput,
  Player,
  RoomState,
  RoomStateInput,
  UpdatePlayerInput,
  UpdateRoomStateInput,
  AuthorizationInput,
  AuthorizationOutput,
  UpsertPlayerInput,
  UpsertPlayerOutput,
  BasicPlayer,
  GetPlayersInput,
  GetPlayersOutput,
} from './player.graphql';

import { PlayerService } from './player.service';

import { AuthGuard } from './player.guard';

import { UseGuards } from '@nestjs/common';

import { connectionFromArraySlice } from 'graphql-relay';

@Resolver((of) => Player)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  @Query((returns) => String, { nullable: false, name: 'authorization' })
  async authorization(@Args('input') input: AuthorizationInput) {
    const token = await this.playerService.authorization(input);

    return token;
  }

  @Query((returns) => UpsertPlayerOutput, {
    nullable: true,
    name: 'upsertPlayer',
  })
  @UseGuards(AuthGuard)
  async upsertPlayer(@Args('input') input: UpsertPlayerInput) {
    const matchingUser = await this.playerService.upsertPlayer(input);

    return matchingUser;
  }

  @ResolveField('roomsState', () => [RoomState], {
    nullable: false,
    description: "e.g roomsState(input: {rooms: ['RS_1']})",
  })
  @UseGuards(AuthGuard)
  async roomsState(
    @Parent() player: Player,
    @Args('input') input: RoomStateInput,
  ) {
    const matchingRoomStates = await this.playerService.getRoomStates({
      auth: player.auth,
      rooms: input.rooms,
    });

    return matchingRoomStates;
  }

  @Mutation((returns) => Player, { name: 'updatePlayer' })
  // @UseGuards(AuthGuard)
  async updatePlayer(@Args('input') input: UpdatePlayerInput) {
    const createdPlayer = await this.playerService.updatePlayer(input);

    return createdPlayer;
  }

  @Mutation((returns) => UpdateRoomStateOutput, { name: 'updateRoomState' })
  @UseGuards(AuthGuard)
  async updateRoomState(@Args('input') input: UpdateRoomStateInput) {
    const updatedRoomState = await this.playerService.updateRoomState(input);

    return updatedRoomState;
  }

  @Query((returns) => [GetPlayersOutput], { name: 'getPlayers' })
  async getPlayers(@Args('input') input: GetPlayersInput) {
    const players = await this.playerService.getPlayers(input);

    return players;
  }
}
