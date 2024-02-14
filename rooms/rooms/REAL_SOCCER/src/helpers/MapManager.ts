import { room, store } from '@context';

import { LinesEnum, TeamsEnum, BallEnum, CornersEnum, BlockersEnum, IPlayer } from '@types';

import getPlayers from '@sharedable/utils/getPlayers';

export default class {
  static createOut({ wall, executingTeamId, position }: { wall: LinesEnum.TOP | LinesEnum.BOTTOM; executingTeamId: number; position: { x: number; y: number } }) {
    this.clearState();

    //Draw lines & change players collision flags
    const { redPlayers, bluePlayers } = getPlayers();

    const triggeredPlayers = [...redPlayers, ...bluePlayers].filter((player) => player.team != executingTeamId);

    triggeredPlayers.forEach((player) => room.setPlayerDiscProperties(player.id, { cGroup: room.CollisionFlags.c1 | room.CollisionFlags.blue }));

    const matchingLines = wall == LinesEnum.TOP ? [LinesEnum.TOP_RED, LinesEnum.TOP_BLUE] : [LinesEnum.BOTTOM_RED, LinesEnum.BOTTOM_BLUE];

    const matchingLine = executingTeamId == TeamsEnum.RED ? matchingLines[0] : matchingLines[1];

    this.toggleLine({ line: matchingLine, show: true });

    //Change players position to outside out line
    const linesEdgesY = {
      [LinesEnum.TOP]: -445,
      [LinesEnum.BOTTOM]: 445,
    };

    const matchingLineEdgeY = linesEdgesY[wall];

    const playedPlayers = [...redPlayers, ...bluePlayers];

    const positionConditions = {
      [LinesEnum.TOP]: (player: IPlayer) => player.position.y < linesEdgesY[LinesEnum.TOP],
      [LinesEnum.BOTTOM]: (player: IPlayer) => player.position.y > linesEdgesY[LinesEnum.BOTTOM],
    };

    const playersOnBadPosition = triggeredPlayers.filter((player: IPlayer) => positionConditions[wall](player));

    playersOnBadPosition.forEach((player) => room.setPlayerDiscProperties(player.id, { y: matchingLineEdgeY }));

    //Change ball collision flags (Cannot move ball only kick)
    const currentBallColor = executingTeamId == TeamsEnum.BLUE ? BallEnum.BLUE_COLOR : BallEnum.RED_COLOR;

    room.setDiscProperties(BallEnum.INDEX, {
      cGroup: room.CollisionFlags.score | room.CollisionFlags.kick,
      color: currentBallColor,
      yspeed: 0,
      xspeed: 0,
      ...position,
    });

    store.outIsActive = true;
  }

  static async createGk({ teamId }: { teamId: TeamsEnum }) {
    this.clearState();

    const { redPlayers, bluePlayers } = getPlayers();

    const positionsX: {
      [key in TeamID]?: number;
    } = {
      [TeamsEnum.RED]: -1060,
      [TeamsEnum.BLUE]: 1060,
    };

    const matchingPositionX = positionsX[teamId];

    const currentBallColor = teamId == TeamsEnum.BLUE ? BallEnum.BLUE_COLOR : BallEnum.RED_COLOR;

    room.setDiscProperties(BlockersEnum.GK_BLOCKER_INDEX, {
      x: matchingPositionX,
      y: 0,
      radius: 18,
    });

    await new Promise((r) => setTimeout(r, 100));

    room.setDiscProperties(BallEnum.INDEX, {
      x: matchingPositionX,
      y: 0,
      xspeed: 0,
      yspeed: 0,
      xgravity: 0,
      ygravity: 0,
      invMass: BallEnum.GK_INVMASS,
      color: currentBallColor,
    });

    setTimeout(() => {
      room.setDiscProperties(BlockersEnum.GK_BLOCKER_INDEX, { y: 2000 });
    }, 3000);

    const opponentsPlayers = teamId == TeamsEnum.RED ? getPlayers().bluePlayers : getPlayers().redPlayers;

    [...redPlayers, ...bluePlayers].forEach((player) => room.setPlayerDiscProperties(player.id, { invMass: 1000 }));

    opponentsPlayers.forEach((player) => room.setPlayerDiscProperties(player.id, { cGroup: room.CollisionFlags.c0 | room.CollisionFlags.blue }));

    const penaltyConditions: {
      [key in TeamsEnum]?: (player: IPlayer) => boolean;
    } = {
      [TeamsEnum.RED]: (player: IPlayer) => player.position.x < -830 && player.position.y > -330 && player.position.y < 330,
      [TeamsEnum.BLUE]: (player: IPlayer) => player.position.x > 830 && player.position.y > -330 && player.position.y < 330,
    };

    const matchingPenaltyEdge: {
      [key in TeamsEnum]?: number;
    } = {
      [TeamsEnum.RED]: -825,
      [TeamsEnum.BLUE]: 825,
    };

    const opponentPlayersInPenalty = opponentsPlayers.filter((player: IPlayer) => penaltyConditions[teamId](player));

    opponentPlayersInPenalty.forEach((player) => room.setPlayerDiscProperties(player.id, { x: matchingPenaltyEdge[teamId], xspeed: 0, yspeed: 0 }));

    store.gkIsActive = true;
  }

  static async createCorner({ corner, executingTeamId }: { corner: CornersEnum; executingTeamId: TeamsEnum }) {
    this.clearState();

    const { redPlayers, bluePlayers } = getPlayers();

    const cornersPositions = {
      [CornersEnum.TOP_LEFT]: { x: -1140, y: -590 },
      [CornersEnum.TOP_RIGHT]: { x: 1140, y: -590 },
      [CornersEnum.BOTTOM_LEFT]: { x: -1140, y: 590 },
      [CornersEnum.BOTTOM_RIGHT]: { x: 1140, y: 590 },
    };

    const cornerCoordinates = cornersPositions[corner];
    const currentBallColor = executingTeamId == TeamsEnum.BLUE ? BallEnum.BLUE_COLOR : BallEnum.RED_COLOR;

    room.setDiscProperties(BallEnum.INDEX, {
      ...cornerCoordinates,
      xspeed: 0,
      yspeed: 0,
      color: currentBallColor,
      invMass: BallEnum.CORNER_INVMASS,
    });

    store.cornerIsActive = true;
    store.eventExecutingTeamId = executingTeamId;

    const executingPlayers = executingTeamId == TeamsEnum.RED ? redPlayers : bluePlayers;

    room.setDiscProperties(BlockersEnum.CORNER_BLOCKER_INDEX, { ...cornerCoordinates, radius: BlockersEnum.CORNER_BLOCKER_RADIUS });

    [...redPlayers, ...bluePlayers].forEach((player) => room.setPlayerDiscProperties(player.id, { invMass: 1000 }));

    executingPlayers.forEach((player) =>
      room.setPlayerDiscProperties(player.id, {
        cMask: room.CollisionFlags.ball,
        cGroup: room.CollisionFlags.c2 | room.CollisionFlags.blue,
      })
    );
  }

  static toggleLine({ line, show }: { line: LinesEnum; show: boolean }) {
    const hiddenEdgeX = -1149;
    const showEdgeX = 1149;

    const linesIndexes: { [key in LinesEnum]?: number } = {
      [LinesEnum.TOP_RED]: 17,
      [LinesEnum.TOP_BLUE]: 19,
      [LinesEnum.BOTTOM_RED]: 21,
      [LinesEnum.BOTTOM_BLUE]: 23,
    };

    const matchingIndex = linesIndexes[line as LinesEnum];

    room.setDiscProperties(matchingIndex, { x: show ? showEdgeX : hiddenEdgeX });
  }

  static givePowershot() {
    room.setDiscProperties(BallEnum.INDEX, { color: BallEnum.YELLOW_COLOR, invMass: BallEnum.POWERSHOT_INVMASS });
  }

  static async clearState() {
    const { redPlayers, bluePlayers } = getPlayers();

    const playedPlayers = [...redPlayers, ...bluePlayers];

    room.setDiscProperties(BlockersEnum.GK_BLOCKER_INDEX, {
      y: 2000,
      radius: 0,
    });

    room.setDiscProperties(BallEnum.INDEX, {
      cGroup: BallEnum.DEFAULT_CGROUP,
      color: BallEnum.DEFAULT_COLOR,
      invMass: BallEnum.DEFAULT_INVMASS,
      xgravity: 0,
      ygravity: 0,
    });

    room.setDiscProperties(BlockersEnum.CORNER_BLOCKER_INDEX, {
      y: 2000,
      radius: 0,
    });

    const defaultPlayerProperties = { cGroup: room.CollisionFlags.red | room.CollisionFlags.blue, invMass: 0.5 };

    playedPlayers.forEach((player) => room.setPlayerDiscProperties(player.id, defaultPlayerProperties));

    [LinesEnum.TOP_RED, LinesEnum.TOP_BLUE, LinesEnum.BOTTOM_RED, LinesEnum.BOTTOM_BLUE].forEach((line) => this.toggleLine({ line, show: false }));
  }
}
