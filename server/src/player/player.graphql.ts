import {
  Field,
  ObjectType,
  InputType,
  PartialType,
  PickType,
  OmitType,
  createUnionType,
} from '@nestjs/graphql';
import { ERole } from '@prisma/client';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class Player {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  auth: string;

  @Field()
  conn: string;

  @Field({ nullable: true })
  country: string;
}
@ObjectType()
export class BasicPlayer extends OmitType(Player, ['conn'], ObjectType) {}

@ObjectType()
export class Statistics {
  @Field()
  goals: number;

  @Field()
  owngoals: number;

  @Field()
  assists: number;

  @Field()
  wins: number;

  @Field()
  defeats: number;

  @Field()
  points: number;

  @Field()
  draws: number;

  @Field()
  games: number;

  @Field()
  coins: number;

  @Field()
  rank: string;
}

@ObjectType()
export class RoomState {
  @Field()
  room: string;

  @Field()
  role: ERole;

  @Field()
  statistics: Statistics;
}

@ObjectType()
export class UpsertPlayerOutput {
  @Field()
  player: Player;

  @Field()
  roomState: RoomState;
}

@InputType()
export class UpsertPlayerRoomStateInput extends PickType(
  RoomState,
  ['room'],
  InputType,
) {}

@InputType()
export class UpsertPlayerPlayerInput extends OmitType(
  Player,
  ['id'],
  InputType,
) {}

@InputType()
export class UpsertPlayerInput {
  @Field()
  player: UpsertPlayerPlayerInput;

  @Field()
  roomState: UpsertPlayerRoomStateInput;
}

@InputType()
export class UpdatePlayerFilterInput extends PickType(
  Player,
  ['auth'],
  InputType,
) {}

@InputType()
export class UpdatePlayerFieldsInput extends PartialType(Player, InputType) {}

@InputType()
export class UpdateRoomStateStatisticsInput extends PartialType(
  Statistics,
  InputType,
) {}

@InputType()
export class RoomStateInput {
  @Field((type) => [String], { nullable: true })
  rooms: string[];
}

@ObjectType()
export class UpdateRoomStateOutput extends Player {
  @Field({ nullable: true })
  statistics: Statistics;
}

@InputType()
export class GetPlayersInput {
  @Field()
  room: string;

  @Field()
  page: number;

  @Field()
  sortBy: string;

  @Field({ nullable: true })
  name: string;
}

@ObjectType()
class BasicRes {
  @Field()
  room: string;

  @Field()
  player: Player;

  @Field()
  statistics: Statistics;
}

@ObjectType()
export class GetPlayersOutput {
  @Field()
  player: BasicPlayer;

  @Field()
  statistics: Statistics;
}

@InputType()
export class UpdateRoomStateFilterInput {
  @Field()
  auth: string;

  @Field()
  room: string;
}

@InputType()
export class UpdateRoomStateFieldsInput {
  @Field()
  statistics: UpdateRoomStateStatisticsInput;
}

@InputType()
export class UpdateRoomStateInput {
  @Field()
  filter: UpdateRoomStateFilterInput;

  @Field()
  fields: UpdateRoomStateFieldsInput;
}

@InputType()
export class UpdatePlayerInput {
  @Field()
  filter: UpdatePlayerFilterInput;

  @Field()
  fields: UpdatePlayerFieldsInput;
}

@InputType()
export class AuthorizationInput {
  @Field()
  password: string;
}

@ObjectType()
export class AuthorizationOutput {
  @Field()
  token: string;
}
