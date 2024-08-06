export interface IRanking {
  username: string;
  country: string;
  statistics: IStatistics;
}

export interface IStatistics {
  points: number;
  defeats: number;
  goals: number;
  wins: number;
  games: number;
  rank: string;
}
