export interface IPlayer {
  username: string;
  auth: string;
  conn: string;
}

export interface IGetPlayerRoomStateArgs {
  auth: string;
  rooms: string[];
}
