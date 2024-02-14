/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Hexadecimal scalar type */
  Hex: { input: any; output: any; }
};

export type AuthorizationInput = {
  password: Scalars['String']['input'];
};

export type BasicPlayer = {
  __typename?: 'BasicPlayer';
  auth: Scalars['String']['output'];
  country?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type BoosterType = {
  __typename?: 'BoosterType';
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ColorType = {
  __typename?: 'ColorType';
  type: Scalars['String']['output'];
  value: Scalars['Hex']['output'];
};

export type CreatedOrderInput = {
  itemId: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CreatedOrderOutput = {
  __typename?: 'CreatedOrderOutput';
  order: Order;
  payment: Payment;
};

export enum EStatus {
  Completed = 'Completed',
  Created = 'Created',
  Failed = 'Failed',
  Succeeded = 'Succeeded'
}

export type GetItemOutput = {
  __typename?: 'GetItemOutput';
  data: TData;
  id: Scalars['String']['output'];
  img: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  stripeItemId: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type GetPlayersInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  page: Scalars['Float']['input'];
  room: Scalars['String']['input'];
  sortBy: Scalars['String']['input'];
};

export type GetPlayersOutput = {
  __typename?: 'GetPlayersOutput';
  player: BasicPlayer;
  statistics: Statistics;
};

export type ItemOutput = BoosterType | ColorType;

export type Mutation = {
  __typename?: 'Mutation';
  createOrder: CreatedOrderOutput;
  receiveOrder: ReceiveOrderOutput;
  updatePlayer: Player;
  updateRoomState: UpdateRoomStateOutput;
};


export type MutationCreateOrderArgs = {
  input: CreatedOrderInput;
};


export type MutationReceiveOrderArgs = {
  input: ReceiveOrderInput;
};


export type MutationUpdatePlayerArgs = {
  input: UpdatePlayerInput;
};


export type MutationUpdateRoomStateArgs = {
  input: UpdateRoomStateInput;
};

export type Order = {
  __typename?: 'Order';
  code: Scalars['String']['output'];
  status: EStatus;
  value?: Maybe<Scalars['String']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  clientSecret: Scalars['String']['output'];
};

export type Player = {
  __typename?: 'Player';
  auth: Scalars['String']['output'];
  conn: Scalars['String']['output'];
  country?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** e.g roomsState(input: {rooms: ['RS_1']}) */
  roomsState: Array<RoomState>;
};


export type PlayerRoomsStateArgs = {
  input: RoomStateInput;
};

export type Query = {
  __typename?: 'Query';
  authorization: Scalars['String']['output'];
  getItems: Array<GetItemOutput>;
  getPlayers: Array<GetPlayersOutput>;
  upsertPlayer?: Maybe<UpsertPlayerOutput>;
};


export type QueryAuthorizationArgs = {
  input: AuthorizationInput;
};


export type QueryGetPlayersArgs = {
  input: GetPlayersInput;
};


export type QueryUpsertPlayerArgs = {
  input: UpsertPlayerInput;
};

export type ReceiveOrderInput = {
  auth: Scalars['String']['input'];
  code: Scalars['String']['input'];
  room: Scalars['String']['input'];
};

export type ReceiveOrderOutput = {
  __typename?: 'ReceiveOrderOutput';
  status: Scalars['Boolean']['output'];
};

export type RoomState = {
  __typename?: 'RoomState';
  items: Array<ItemOutput>;
  role: Scalars['String']['output'];
  room: Scalars['String']['output'];
  statistics: Statistics;
};

export type RoomStateInput = {
  rooms?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Statistics = {
  __typename?: 'Statistics';
  assists: Scalars['Float']['output'];
  coins: Scalars['Float']['output'];
  defeats: Scalars['Float']['output'];
  draws: Scalars['Float']['output'];
  games: Scalars['Float']['output'];
  goals: Scalars['Float']['output'];
  owngoals: Scalars['Float']['output'];
  points: Scalars['Float']['output'];
  rank: Scalars['String']['output'];
  wins: Scalars['Float']['output'];
};

export type TData = {
  __typename?: 'TData';
  type: Scalars['String']['output'];
  value?: Maybe<Scalars['Float']['output']>;
};

export type UpdatePlayerFieldsInput = {
  auth?: InputMaybe<Scalars['String']['input']>;
  conn?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePlayerFilterInput = {
  auth: Scalars['String']['input'];
};

export type UpdatePlayerInput = {
  fields: UpdatePlayerFieldsInput;
  filter: UpdatePlayerFilterInput;
};

export type UpdateRoomStateFieldsInput = {
  statistics: UpdateRoomStateStatisticsInput;
};

export type UpdateRoomStateFilterInput = {
  auth: Scalars['String']['input'];
  room: Scalars['String']['input'];
};

export type UpdateRoomStateInput = {
  fields: UpdateRoomStateFieldsInput;
  filter: UpdateRoomStateFilterInput;
};

export type UpdateRoomStateOutput = {
  __typename?: 'UpdateRoomStateOutput';
  auth: Scalars['String']['output'];
  conn: Scalars['String']['output'];
  country?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** e.g roomsState(input: {rooms: ['RS_1']}) */
  roomsState: Array<RoomState>;
  statistics?: Maybe<Statistics>;
};


export type UpdateRoomStateOutputRoomsStateArgs = {
  input: RoomStateInput;
};

export type UpdateRoomStateStatisticsInput = {
  assists?: InputMaybe<Scalars['Float']['input']>;
  coins?: InputMaybe<Scalars['Float']['input']>;
  defeats?: InputMaybe<Scalars['Float']['input']>;
  draws?: InputMaybe<Scalars['Float']['input']>;
  games?: InputMaybe<Scalars['Float']['input']>;
  goals?: InputMaybe<Scalars['Float']['input']>;
  owngoals?: InputMaybe<Scalars['Float']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  rank?: InputMaybe<Scalars['String']['input']>;
  wins?: InputMaybe<Scalars['Float']['input']>;
};

export type UpsertPlayerInput = {
  player: UpsertPlayerPlayerInput;
  roomState: UpsertPlayerRoomStateInput;
};

export type UpsertPlayerOutput = {
  __typename?: 'UpsertPlayerOutput';
  player: Player;
  roomState: RoomState;
};

export type UpsertPlayerPlayerInput = {
  auth: Scalars['String']['input'];
  conn: Scalars['String']['input'];
  country?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type UpsertPlayerRoomStateInput = {
  room: Scalars['String']['input'];
};

export type GetPlayersQueryVariables = Exact<{
  input: GetPlayersInput;
}>;


export type GetPlayersQuery = { __typename?: 'Query', players: Array<{ __typename?: 'GetPlayersOutput', player: { __typename?: 'BasicPlayer', name: string, auth: string, country?: string | null }, statistics: { __typename?: 'Statistics', points: number, wins: number, defeats: number, goals: number, games: number, rank: string } }> };

export type CreateOrderMutationVariables = Exact<{
  input: CreatedOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'CreatedOrderOutput', order: { __typename?: 'Order', status: EStatus, code: string, value?: string | null }, payment: { __typename?: 'Payment', clientSecret: string } } };

export type GetItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetItemsQuery = { __typename?: 'Query', getItems: Array<{ __typename?: 'GetItemOutput', id: string, name: string, img: string, stripeItemId: string, price: number, type: string, data: { __typename?: 'TData', type: string, value?: number | null } }> };


export const GetPlayersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlayers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetPlayersInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"players"},"name":{"kind":"Name","value":"getPlayers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"auth"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"wins"}},{"kind":"Field","name":{"kind":"Name","value":"defeats"}},{"kind":"Field","name":{"kind":"Name","value":"goals"}},{"kind":"Field","name":{"kind":"Name","value":"games"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}}]}}]}}]} as unknown as DocumentNode<GetPlayersQuery, GetPlayersQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatedOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const GetItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"img"}},{"kind":"Field","name":{"kind":"Name","value":"stripeItemId"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetItemsQuery, GetItemsQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Hexadecimal scalar type */
  Hex: { input: any; output: any; }
};

export type AuthorizationInput = {
  password: Scalars['String']['input'];
};

export type BasicPlayer = {
  __typename?: 'BasicPlayer';
  auth: Scalars['String']['output'];
  country?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type BoosterType = {
  __typename?: 'BoosterType';
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ColorType = {
  __typename?: 'ColorType';
  type: Scalars['String']['output'];
  value: Scalars['Hex']['output'];
};

export type CreatedOrderInput = {
  itemId: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CreatedOrderOutput = {
  __typename?: 'CreatedOrderOutput';
  order: Order;
  payment: Payment;
};

export enum EStatus {
  Completed = 'Completed',
  Created = 'Created',
  Failed = 'Failed',
  Succeeded = 'Succeeded'
}

export type GetItemOutput = {
  __typename?: 'GetItemOutput';
  data: TData;
  id: Scalars['String']['output'];
  img: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  stripeItemId: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type GetPlayersInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  page: Scalars['Float']['input'];
  room: Scalars['String']['input'];
  sortBy: Scalars['String']['input'];
};

export type GetPlayersOutput = {
  __typename?: 'GetPlayersOutput';
  player: BasicPlayer;
  statistics: Statistics;
};

export type ItemOutput = BoosterType | ColorType;

export type Mutation = {
  __typename?: 'Mutation';
  createOrder: CreatedOrderOutput;
  receiveOrder: ReceiveOrderOutput;
  updatePlayer: Player;
  updateRoomState: UpdateRoomStateOutput;
};


export type MutationCreateOrderArgs = {
  input: CreatedOrderInput;
};


export type MutationReceiveOrderArgs = {
  input: ReceiveOrderInput;
};


export type MutationUpdatePlayerArgs = {
  input: UpdatePlayerInput;
};


export type MutationUpdateRoomStateArgs = {
  input: UpdateRoomStateInput;
};

export type Order = {
  __typename?: 'Order';
  code: Scalars['String']['output'];
  status: EStatus;
  value?: Maybe<Scalars['String']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  clientSecret: Scalars['String']['output'];
};

export type Player = {
  __typename?: 'Player';
  auth: Scalars['String']['output'];
  conn: Scalars['String']['output'];
  country?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** e.g roomsState(input: {rooms: ['RS_1']}) */
  roomsState: Array<RoomState>;
};


export type PlayerRoomsStateArgs = {
  input: RoomStateInput;
};

export type Query = {
  __typename?: 'Query';
  authorization: Scalars['String']['output'];
  getItems: Array<GetItemOutput>;
  getPlayers: Array<GetPlayersOutput>;
  upsertPlayer?: Maybe<UpsertPlayerOutput>;
};


export type QueryAuthorizationArgs = {
  input: AuthorizationInput;
};


export type QueryGetPlayersArgs = {
  input: GetPlayersInput;
};


export type QueryUpsertPlayerArgs = {
  input: UpsertPlayerInput;
};

export type ReceiveOrderInput = {
  auth: Scalars['String']['input'];
  code: Scalars['String']['input'];
  room: Scalars['String']['input'];
};

export type ReceiveOrderOutput = {
  __typename?: 'ReceiveOrderOutput';
  status: Scalars['Boolean']['output'];
};

export type RoomState = {
  __typename?: 'RoomState';
  items: Array<ItemOutput>;
  role: Scalars['String']['output'];
  room: Scalars['String']['output'];
  statistics: Statistics;
};

export type RoomStateInput = {
  rooms?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Statistics = {
  __typename?: 'Statistics';
  assists: Scalars['Float']['output'];
  coins: Scalars['Float']['output'];
  defeats: Scalars['Float']['output'];
  draws: Scalars['Float']['output'];
  games: Scalars['Float']['output'];
  goals: Scalars['Float']['output'];
  owngoals: Scalars['Float']['output'];
  points: Scalars['Float']['output'];
  rank: Scalars['String']['output'];
  wins: Scalars['Float']['output'];
};

export type TData = {
  __typename?: 'TData';
  type: Scalars['String']['output'];
  value?: Maybe<Scalars['Float']['output']>;
};

export type UpdatePlayerFieldsInput = {
  auth?: InputMaybe<Scalars['String']['input']>;
  conn?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePlayerFilterInput = {
  auth: Scalars['String']['input'];
};

export type UpdatePlayerInput = {
  fields: UpdatePlayerFieldsInput;
  filter: UpdatePlayerFilterInput;
};

export type UpdateRoomStateFieldsInput = {
  statistics: UpdateRoomStateStatisticsInput;
};

export type UpdateRoomStateFilterInput = {
  auth: Scalars['String']['input'];
  room: Scalars['String']['input'];
};

export type UpdateRoomStateInput = {
  fields: UpdateRoomStateFieldsInput;
  filter: UpdateRoomStateFilterInput;
};

export type UpdateRoomStateOutput = {
  __typename?: 'UpdateRoomStateOutput';
  auth: Scalars['String']['output'];
  conn: Scalars['String']['output'];
  country?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** e.g roomsState(input: {rooms: ['RS_1']}) */
  roomsState: Array<RoomState>;
  statistics?: Maybe<Statistics>;
};


export type UpdateRoomStateOutputRoomsStateArgs = {
  input: RoomStateInput;
};

export type UpdateRoomStateStatisticsInput = {
  assists?: InputMaybe<Scalars['Float']['input']>;
  coins?: InputMaybe<Scalars['Float']['input']>;
  defeats?: InputMaybe<Scalars['Float']['input']>;
  draws?: InputMaybe<Scalars['Float']['input']>;
  games?: InputMaybe<Scalars['Float']['input']>;
  goals?: InputMaybe<Scalars['Float']['input']>;
  owngoals?: InputMaybe<Scalars['Float']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  rank?: InputMaybe<Scalars['String']['input']>;
  wins?: InputMaybe<Scalars['Float']['input']>;
};

export type UpsertPlayerInput = {
  player: UpsertPlayerPlayerInput;
  roomState: UpsertPlayerRoomStateInput;
};

export type UpsertPlayerOutput = {
  __typename?: 'UpsertPlayerOutput';
  player: Player;
  roomState: RoomState;
};

export type UpsertPlayerPlayerInput = {
  auth: Scalars['String']['input'];
  conn: Scalars['String']['input'];
  country?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type UpsertPlayerRoomStateInput = {
  room: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  ItemOutput: ( BoosterType ) | ( ColorType );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthorizationInput: AuthorizationInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  BasicPlayer: ResolverTypeWrapper<BasicPlayer>;
  BoosterType: ResolverTypeWrapper<BoosterType>;
  ColorType: ResolverTypeWrapper<ColorType>;
  CreatedOrderInput: CreatedOrderInput;
  CreatedOrderOutput: ResolverTypeWrapper<CreatedOrderOutput>;
  EStatus: EStatus;
  GetItemOutput: ResolverTypeWrapper<GetItemOutput>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GetPlayersInput: GetPlayersInput;
  GetPlayersOutput: ResolverTypeWrapper<GetPlayersOutput>;
  Hex: ResolverTypeWrapper<Scalars['Hex']['output']>;
  ItemOutput: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ItemOutput']>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  Payment: ResolverTypeWrapper<Payment>;
  Player: ResolverTypeWrapper<Player>;
  Query: ResolverTypeWrapper<{}>;
  ReceiveOrderInput: ReceiveOrderInput;
  ReceiveOrderOutput: ResolverTypeWrapper<ReceiveOrderOutput>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  RoomState: ResolverTypeWrapper<Omit<RoomState, 'items'> & { items: Array<ResolversTypes['ItemOutput']> }>;
  RoomStateInput: RoomStateInput;
  Statistics: ResolverTypeWrapper<Statistics>;
  TData: ResolverTypeWrapper<TData>;
  UpdatePlayerFieldsInput: UpdatePlayerFieldsInput;
  UpdatePlayerFilterInput: UpdatePlayerFilterInput;
  UpdatePlayerInput: UpdatePlayerInput;
  UpdateRoomStateFieldsInput: UpdateRoomStateFieldsInput;
  UpdateRoomStateFilterInput: UpdateRoomStateFilterInput;
  UpdateRoomStateInput: UpdateRoomStateInput;
  UpdateRoomStateOutput: ResolverTypeWrapper<UpdateRoomStateOutput>;
  UpdateRoomStateStatisticsInput: UpdateRoomStateStatisticsInput;
  UpsertPlayerInput: UpsertPlayerInput;
  UpsertPlayerOutput: ResolverTypeWrapper<UpsertPlayerOutput>;
  UpsertPlayerPlayerInput: UpsertPlayerPlayerInput;
  UpsertPlayerRoomStateInput: UpsertPlayerRoomStateInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthorizationInput: AuthorizationInput;
  String: Scalars['String']['output'];
  BasicPlayer: BasicPlayer;
  BoosterType: BoosterType;
  ColorType: ColorType;
  CreatedOrderInput: CreatedOrderInput;
  CreatedOrderOutput: CreatedOrderOutput;
  GetItemOutput: GetItemOutput;
  Float: Scalars['Float']['output'];
  GetPlayersInput: GetPlayersInput;
  GetPlayersOutput: GetPlayersOutput;
  Hex: Scalars['Hex']['output'];
  ItemOutput: ResolversUnionTypes<ResolversParentTypes>['ItemOutput'];
  Mutation: {};
  Order: Order;
  Payment: Payment;
  Player: Player;
  Query: {};
  ReceiveOrderInput: ReceiveOrderInput;
  ReceiveOrderOutput: ReceiveOrderOutput;
  Boolean: Scalars['Boolean']['output'];
  RoomState: Omit<RoomState, 'items'> & { items: Array<ResolversParentTypes['ItemOutput']> };
  RoomStateInput: RoomStateInput;
  Statistics: Statistics;
  TData: TData;
  UpdatePlayerFieldsInput: UpdatePlayerFieldsInput;
  UpdatePlayerFilterInput: UpdatePlayerFilterInput;
  UpdatePlayerInput: UpdatePlayerInput;
  UpdateRoomStateFieldsInput: UpdateRoomStateFieldsInput;
  UpdateRoomStateFilterInput: UpdateRoomStateFilterInput;
  UpdateRoomStateInput: UpdateRoomStateInput;
  UpdateRoomStateOutput: UpdateRoomStateOutput;
  UpdateRoomStateStatisticsInput: UpdateRoomStateStatisticsInput;
  UpsertPlayerInput: UpsertPlayerInput;
  UpsertPlayerOutput: UpsertPlayerOutput;
  UpsertPlayerPlayerInput: UpsertPlayerPlayerInput;
  UpsertPlayerRoomStateInput: UpsertPlayerRoomStateInput;
};

export type BasicPlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['BasicPlayer'] = ResolversParentTypes['BasicPlayer']> = {
  auth?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoosterTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BoosterType'] = ResolversParentTypes['BoosterType']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ColorTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ColorType'] = ResolversParentTypes['ColorType']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Hex'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatedOrderOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatedOrderOutput'] = ResolversParentTypes['CreatedOrderOutput']> = {
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetItemOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetItemOutput'] = ResolversParentTypes['GetItemOutput']> = {
  data?: Resolver<ResolversTypes['TData'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  img?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  stripeItemId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetPlayersOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetPlayersOutput'] = ResolversParentTypes['GetPlayersOutput']> = {
  player?: Resolver<ResolversTypes['BasicPlayer'], ParentType, ContextType>;
  statistics?: Resolver<ResolversTypes['Statistics'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface HexScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Hex'], any> {
  name: 'Hex';
}

export type ItemOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemOutput'] = ResolversParentTypes['ItemOutput']> = {
  __resolveType: TypeResolveFn<'BoosterType' | 'ColorType', ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createOrder?: Resolver<ResolversTypes['CreatedOrderOutput'], ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'input'>>;
  receiveOrder?: Resolver<ResolversTypes['ReceiveOrderOutput'], ParentType, ContextType, RequireFields<MutationReceiveOrderArgs, 'input'>>;
  updatePlayer?: Resolver<ResolversTypes['Player'], ParentType, ContextType, RequireFields<MutationUpdatePlayerArgs, 'input'>>;
  updateRoomState?: Resolver<ResolversTypes['UpdateRoomStateOutput'], ParentType, ContextType, RequireFields<MutationUpdateRoomStateArgs, 'input'>>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EStatus'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']> = {
  clientSecret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  auth?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  conn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roomsState?: Resolver<Array<ResolversTypes['RoomState']>, ParentType, ContextType, RequireFields<PlayerRoomsStateArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  authorization?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryAuthorizationArgs, 'input'>>;
  getItems?: Resolver<Array<ResolversTypes['GetItemOutput']>, ParentType, ContextType>;
  getPlayers?: Resolver<Array<ResolversTypes['GetPlayersOutput']>, ParentType, ContextType, RequireFields<QueryGetPlayersArgs, 'input'>>;
  upsertPlayer?: Resolver<Maybe<ResolversTypes['UpsertPlayerOutput']>, ParentType, ContextType, RequireFields<QueryUpsertPlayerArgs, 'input'>>;
};

export type ReceiveOrderOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReceiveOrderOutput'] = ResolversParentTypes['ReceiveOrderOutput']> = {
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoomState'] = ResolversParentTypes['RoomState']> = {
  items?: Resolver<Array<ResolversTypes['ItemOutput']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  room?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  statistics?: Resolver<ResolversTypes['Statistics'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatisticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Statistics'] = ResolversParentTypes['Statistics']> = {
  assists?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  coins?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  defeats?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  draws?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  games?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  goals?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  owngoals?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wins?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['TData'] = ResolversParentTypes['TData']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateRoomStateOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateRoomStateOutput'] = ResolversParentTypes['UpdateRoomStateOutput']> = {
  auth?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  conn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roomsState?: Resolver<Array<ResolversTypes['RoomState']>, ParentType, ContextType, RequireFields<UpdateRoomStateOutputRoomsStateArgs, 'input'>>;
  statistics?: Resolver<Maybe<ResolversTypes['Statistics']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpsertPlayerOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpsertPlayerOutput'] = ResolversParentTypes['UpsertPlayerOutput']> = {
  player?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  roomState?: Resolver<ResolversTypes['RoomState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BasicPlayer?: BasicPlayerResolvers<ContextType>;
  BoosterType?: BoosterTypeResolvers<ContextType>;
  ColorType?: ColorTypeResolvers<ContextType>;
  CreatedOrderOutput?: CreatedOrderOutputResolvers<ContextType>;
  GetItemOutput?: GetItemOutputResolvers<ContextType>;
  GetPlayersOutput?: GetPlayersOutputResolvers<ContextType>;
  Hex?: GraphQLScalarType;
  ItemOutput?: ItemOutputResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  Payment?: PaymentResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReceiveOrderOutput?: ReceiveOrderOutputResolvers<ContextType>;
  RoomState?: RoomStateResolvers<ContextType>;
  Statistics?: StatisticsResolvers<ContextType>;
  TData?: TDataResolvers<ContextType>;
  UpdateRoomStateOutput?: UpdateRoomStateOutputResolvers<ContextType>;
  UpsertPlayerOutput?: UpsertPlayerOutputResolvers<ContextType>;
};

