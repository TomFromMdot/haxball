import { Player, RoomState } from './graphql';

export enum LinesEnum {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',

  LEFT = 'LEFT',
  RIGHT = 'RIGHT',

  TOP_RED = 'TOP_RED',
  TOP_BLUE = 'TOP_BLUE',

  BOTTOM_RED = 'BOTTOM_RED',
  BOTTOM_BLUE = 'BOTTOM_BLUE',
}

export enum CornersEnum {
  TOP_LEFT = 'TOP_LEFT',
  TOP_RIGHT = 'TOP_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
}

export enum TeamsEnum {
  SPEC = 0,
  RED = 1,
  BLUE = 2,
}

export enum BallEnum {
  DEFAULT_CGROUP = 193,
  DEFAULT_COLOR = 0xffffff,
  DEFAULT_INVMASS = 1.15,
  DEFAULT_RADIUS = 8,

  INDEX = 0,
  RADIUS = 8,

  RED_COLOR = 0xe56e56,
  BLUE_COLOR = 0x4797ff,
  YELLOW_COLOR = 0xebd834,

  POWERSHOT_INVMASS = 1.9,
  POWERSHOT_SPIN_POWER = 1.5,
  POWERSHOT_SPIN_DURATION = 900,

  CORNER_INVMASS = 1.9,
  CORNER_SPIN_POWER = 2,
  CORNER_SPIN_DURATION = 800,

  GK_INVMASS = 2,
}

export enum BlockersEnum {
  GK_BLOCKER_INDEX = 1,

  CORNER_BLOCKER_INDEX = 1,
  CORNER_BLOCKER_RADIUS = 350,
}

export enum ChatEnum {
  ERROR = 0xff0000,
  SUCCESS = 0x00ff26,
  INFO = 0xeb4034,

  CALM_GREEN = 0x0da82f,
  BLUE = 0x4797ff,
  RED = 0xf23333,
  GRAY = 0xc7c7c7,
  YELLOW = 0xffcd19,
  AQUA = 0x19fffb,
  LIME = 0xc4ff65,
  PURPLE = 0x7289da,
}

export enum WallsEnum {
  LEFT_X = -1150 - BallEnum.RADIUS,
  RIGHT_X = 1150 + BallEnum.RADIUS,

  BOTTOM_Y = 600 + BallEnum.RADIUS,
  TOP_Y = -600 - BallEnum.RADIUS,
}

export enum GameFinalsEnum {
  DRAW = 'DRAW',
  WIN = 'WIN',
}

export enum StatsKeysEnum {
  DRAWS = 'draws',
  WINS = 'wins',
  DEFEATS = 'defeats',
  GOALS = 'goals',
  OWNGOALS = 'og',
}

export interface IPlayerAdditional {
  country: string;
}

export interface IPlayer {
  id: number;
  name: string;
  team: 0 | 1 | 2;
  admin: boolean;
  position: { x: number; y: number } | null;
  auth?: string;
  conn?: string;
}

export interface IModifiedPlayer {
  name: string;
  currentRank: string;
  ratingChange: number;
}

export interface IUpsertPlayer extends Partial<IPlayer> {
  country?: string;
}

export interface IUser {
  player: IPlayer;

  entity: {
    player: Partial<Player>;
    state: Partial<RoomState>;
  };
}

export interface Blacklist {
  banauth: any;
  enabled: boolean;
  reason: any;
  admin: any;
  bandate: string;
  bantime: number;
}

export interface Statistics {
  rank: string;
  points: number;
  games: number;
  wins: number;
  defeats: number;
  draws: number;
  goals: number;
}

export interface IConnection {
  query: string;
  countryCode: string;
}

export interface IResponse {
  status: number;
  data: unknown;
}

export interface ICommand {
  cmd: string;
  executor: Function;
  price: number;
  admin: boolean;
}

export interface ICommandArgs extends ICommand {
  player: IPlayer;
  message: string;
  command: ICommand;
}

export enum WebhookEnum {
  REPLYS = `https://discord.com/api/webhooks/1191397886538305546/_AA6qSHFm94gv5pOAAxh9nc3byRxeOlRhssAHGOtQexz7pLWxdkGUnFIROc1rDb-XDAT`,
}
