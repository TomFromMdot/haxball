interface IRating {
  playerRating: number;
  opponentRating: number;
}

interface ICalculate {
  currentPlayerPoints: number;
  playerTeamAverrage: number;
  opponentTeamAverrage: number;
  playerWin: boolean;
}
export default class {
  static limit = 800;

  static getKFactor = (rating: number) => {
    let K_FACTOR = null;

    if (rating <= 1200) K_FACTOR = 150;
    else if (1200 < rating && rating <= 2000) K_FACTOR = 175;
    else if (2000 < rating) K_FACTOR = 150;

    return K_FACTOR;
  };

  static ratingDifference = ({ playerRating, opponentRating }: IRating) => Math.max(Math.min(opponentRating - playerRating, this.limit), -this.limit);

  static expected = ({ playerRating, opponentRating }: IRating): number => 1 / (1 + Math.pow(10, this.ratingDifference({ opponentRating, playerRating }) / this.limit));

  static calculate = ({ currentPlayerPoints, playerTeamAverrage, opponentTeamAverrage, playerWin }: ICalculate) => {
    const playerExpected = this.expected({
      playerRating: playerTeamAverrage,
      opponentRating: opponentTeamAverrage,
    });

    let ratingChange = Number(this.getKFactor(playerTeamAverrage) * (Number(playerWin) - playerExpected));

    // if (currentPlayerPoints < 600) ratingChange = Math.floor(ratingChange + Math.abs(ratingChange) / 3);

    // if (currentPlayerPoints > 2100) ratingChange = Math.floor(ratingChange - Math.abs(ratingChange) / 6);

    const playerPoints = currentPlayerPoints + ratingChange;

    return { ratingChange: Math.floor(playerPoints < 0 ? -currentPlayerPoints : ratingChange) };
  };

  static getAverage = (playersPoints: number[]) => playersPoints.reduce((a, b) => a + b, 0) / playersPoints.length;
}
