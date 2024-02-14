import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  id: Scalars['String']['output'];
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
  id: Scalars['String']['output'];
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
  id?: InputMaybe<Scalars['String']['input']>;
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
  id: Scalars['String']['output'];
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
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpsertPlayerRoomStateInput = {
  room: Scalars['String']['input'];
};

export type UpdateRoomStateMutationVariables = Exact<{
  input: UpdateRoomStateInput;
}>;


export type UpdateRoomStateMutation = { __typename?: 'Mutation', updateRoomState: { __typename?: 'UpdateRoomStateOutput', auth: string } };

export type UpdatePlayerMutationVariables = Exact<{
  input: UpdatePlayerInput;
}>;


export type UpdatePlayerMutation = { __typename?: 'Mutation', updatePlayer: { __typename?: 'Player', auth: string } };

export type CreateOrderMutationVariables = Exact<{
  input: CreatedOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'CreatedOrderOutput', order: { __typename?: 'Order', status: EStatus, code: string, value?: string | null }, payment: { __typename?: 'Payment', clientSecret: string } } };

export type ReceiveOrderMutationVariables = Exact<{
  input: ReceiveOrderInput;
}>;


export type ReceiveOrderMutation = { __typename?: 'Mutation', receiveOrder: { __typename?: 'ReceiveOrderOutput', status: boolean } };

export type PlayerPartsFragment = { __typename?: 'Player', id: string, name: string, auth: string, conn: string };

export type StatisticsPartsFragment = { __typename?: 'Statistics', rank: string, goals: number, wins: number, games: number, assists: number, points: number, coins: number, defeats: number, owngoals: number, draws: number };

export type UpsertPlayerQueryVariables = Exact<{
  player: UpsertPlayerPlayerInput;
  roomState: UpsertPlayerRoomStateInput;
}>;


export type UpsertPlayerQuery = { __typename?: 'Query', entity?: { __typename?: 'UpsertPlayerOutput', player: { __typename?: 'Player', id: string, name: string, auth: string, conn: string }, state: { __typename?: 'RoomState', room: string, role: string, items: Array<{ __typename?: 'BoosterType' } | { __typename?: 'ColorType', type: string, value: any }>, statistics: { __typename?: 'Statistics', rank: string, goals: number, wins: number, games: number, assists: number, points: number, coins: number, defeats: number, owngoals: number, draws: number } } } | null };

export const PlayerPartsFragmentDoc = gql`
    fragment PlayerParts on Player {
  id
  name
  auth
  conn
}
    `;
export const StatisticsPartsFragmentDoc = gql`
    fragment StatisticsParts on Statistics {
  rank
  goals
  wins
  games
  assists
  points
  coins
  defeats
  owngoals
  draws
}
    `;
export const UpdateRoomStateDocument = gql`
    mutation UpdateRoomState($input: UpdateRoomStateInput!) {
  updateRoomState(input: $input) {
    auth
  }
}
    `;
export const UpdatePlayerDocument = gql`
    mutation UpdatePlayer($input: UpdatePlayerInput!) {
  updatePlayer(input: $input) {
    auth
  }
}
    `;
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: CreatedOrderInput!) {
  createOrder(input: $input) {
    order {
      status
      code
      value
    }
    payment {
      clientSecret
    }
  }
}
    `;
export const ReceiveOrderDocument = gql`
    mutation ReceiveOrder($input: ReceiveOrderInput!) {
  receiveOrder(input: $input) {
    status
  }
}
    `;
export const UpsertPlayerDocument = gql`
    query UpsertPlayer($player: UpsertPlayerPlayerInput!, $roomState: UpsertPlayerRoomStateInput!) {
  entity: upsertPlayer(input: {player: $player, roomState: $roomState}) {
    player: player {
      ...PlayerParts
    }
    state: roomState {
      room
      role
      items {
        ... on ColorType {
          type
          value
        }
      }
      statistics {
        ...StatisticsParts
      }
    }
  }
}
    ${PlayerPartsFragmentDoc}
${StatisticsPartsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    UpdateRoomState(variables: UpdateRoomStateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateRoomStateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateRoomStateMutation>(UpdateRoomStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateRoomState', 'mutation');
    },
    UpdatePlayer(variables: UpdatePlayerMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdatePlayerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePlayerMutation>(UpdatePlayerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdatePlayer', 'mutation');
    },
    CreateOrder(variables: CreateOrderMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateOrderMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateOrderMutation>(CreateOrderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateOrder', 'mutation');
    },
    ReceiveOrder(variables: ReceiveOrderMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ReceiveOrderMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ReceiveOrderMutation>(ReceiveOrderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ReceiveOrder', 'mutation');
    },
    UpsertPlayer(variables: UpsertPlayerQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpsertPlayerQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertPlayerQuery>(UpsertPlayerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertPlayer', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;