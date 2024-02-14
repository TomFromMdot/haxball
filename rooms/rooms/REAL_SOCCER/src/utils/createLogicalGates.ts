import { room, store } from '@context';

import { IPlayer, TeamsEnum, WallsEnum } from '@types';

let gatesInitialState = {
  IS: {
    OUT: false,

    RED_GK: false,
    BLUE_GK: false,
    GK: false,

    RED_CORNER: false,
    BLUE_CORNER: false,
    CORNER: false,

    RED_OUT: false,
    BLUE_OUT: false,

    GAME_ACTIVE: true,

    LAST_TOUCH_RED: false,
    LAST_TOUCH_BLUE: false,

    CENTER: false,

    GOAL: false,
  },
};

let gates = structuredClone(gatesInitialState);

export default ({ ball, lastTouchPlayer }: { ball: { x: number; y: number }; lastTouchPlayer: IPlayer }) => {
  gates = structuredClone(gatesInitialState);

  const lastTouchedTeam = lastTouchPlayer?.team;

  gates.IS.CENTER = Math.abs(ball.x) <= 10 && Math.abs(ball.y) <= 10;

  gates.IS.OUT = ball.y < WallsEnum.TOP_Y || ball.y > WallsEnum.BOTTOM_Y;
  gates.IS.GK = (ball.x < WallsEnum.LEFT_X && lastTouchedTeam == TeamsEnum.BLUE) || (ball.x > WallsEnum.RIGHT_X && lastTouchedTeam == TeamsEnum.RED);
  gates.IS.CORNER = (ball.x < WallsEnum.LEFT_X && lastTouchedTeam == TeamsEnum.RED) || (ball.x > WallsEnum.RIGHT_X && lastTouchedTeam == TeamsEnum.BLUE);

  gates.IS.GOAL = (ball.x < WallsEnum.LEFT_X && ball.y > -124 && ball.y < 124) || (ball.x > WallsEnum.RIGHT_X && ball.y > -124 && ball.y < 124);

  if (ball.x < WallsEnum.LEFT_X) {
    gates.IS.RED_GK = !(lastTouchedTeam == TeamsEnum.RED);
    gates.IS.RED_CORNER = lastTouchedTeam == TeamsEnum.RED;
  }

  if (ball.x > WallsEnum.RIGHT_X) {
    gates.IS.BLUE_GK = !(lastTouchedTeam == TeamsEnum.BLUE);
    gates.IS.BLUE_CORNER = lastTouchedTeam == TeamsEnum.BLUE;
  }

  if (ball.y < WallsEnum.TOP_Y || ball.y > WallsEnum.BOTTOM_Y) {
    gates.IS.RED_OUT = !(lastTouchedTeam == TeamsEnum.RED);
    gates.IS.BLUE_OUT = !(lastTouchedTeam == TeamsEnum.BLUE);
  }

  gates.IS.GAME_ACTIVE = !(gates.IS.OUT || gates.IS.RED_GK || gates.IS.BLUE_GK || gates.IS.RED_CORNER || gates.IS.BLUE_CORNER || gates.IS.RED_OUT || gates.IS.BLUE_OUT);

  gates.IS.LAST_TOUCH_BLUE = lastTouchPlayer?.team == TeamsEnum.BLUE;
  gates.IS.LAST_TOUCH_RED = lastTouchPlayer?.team == TeamsEnum.RED;

  return gates;
};
