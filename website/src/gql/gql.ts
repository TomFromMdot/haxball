/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetPlayers($input: GetPlayersInput!) {\n    players: getPlayers(input: $input) {\n      player {\n        name\n        auth\n        country\n      }\n      statistics {\n        points\n        wins\n        defeats\n        goals\n        games\n        rank\n      }\n    }\n  }\n": types.GetPlayersDocument,
    "\n  mutation CreateOrder($input: CreatedOrderInput!) {\n    createOrder(input: $input) {\n      order {\n        status\n        code\n        value\n      }\n      payment {\n        clientSecret\n      }\n    }\n  }\n": types.CreateOrderDocument,
    "\n  query GetItems {\n    getItems {\n      id\n      name\n      img\n      stripeItemId\n      price\n      data {\n        type\n        value\n      }\n      type\n    }\n  }\n": types.GetItemsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPlayers($input: GetPlayersInput!) {\n    players: getPlayers(input: $input) {\n      player {\n        name\n        auth\n        country\n      }\n      statistics {\n        points\n        wins\n        defeats\n        goals\n        games\n        rank\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPlayers($input: GetPlayersInput!) {\n    players: getPlayers(input: $input) {\n      player {\n        name\n        auth\n        country\n      }\n      statistics {\n        points\n        wins\n        defeats\n        goals\n        games\n        rank\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOrder($input: CreatedOrderInput!) {\n    createOrder(input: $input) {\n      order {\n        status\n        code\n        value\n      }\n      payment {\n        clientSecret\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrder($input: CreatedOrderInput!) {\n    createOrder(input: $input) {\n      order {\n        status\n        code\n        value\n      }\n      payment {\n        clientSecret\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetItems {\n    getItems {\n      id\n      name\n      img\n      stripeItemId\n      price\n      data {\n        type\n        value\n      }\n      type\n    }\n  }\n"): (typeof documents)["\n  query GetItems {\n    getItems {\n      id\n      name\n      img\n      stripeItemId\n      price\n      data {\n        type\n        value\n      }\n      type\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;