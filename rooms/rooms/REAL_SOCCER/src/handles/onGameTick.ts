import { room, store } from '@context';

import { BallEnum, BlockersEnum, CornersEnum, IPlayer, LinesEnum, TeamsEnum, WallsEnum } from '@types';

import createLogicalGates from '../utils/createLogicalGates';
import MapManager from '../helpers/MapManager';

import getPlayers from '@sharedable/utils/getPlayers';

import getTouchingPlayer from '../utils/getTouchingPlayer';
import endGame from '../triggers/endGame';

export default () => {
  const ballPosition = room.getBallPosition();
  const touchingPlayer = getTouchingPlayer() as IPlayer;

  const {
    IS: { GK, OUT, LAST_TOUCH_BLUE, RED_GK, CORNER, RED_CORNER, GOAL, CENTER },
  } = createLogicalGates({ ball: ballPosition, lastTouchPlayer: store.lastTouchPlayer });

  if (touchingPlayer && OUT == false && CENTER == false) {
    if (store.lastTouchPlayer.id != touchingPlayer.id) {
      store.touchTimestamp = Date.now();
    }

    store.lastTouchPlayer = touchingPlayer;
  } else {
    store.touchTimestamp = Date.now();

    if (store.gameIsActive && store.powershotIsActive == true && store.powershotIsUsed == false) {
      MapManager.clearState();
    }

    store.powershotIsActive = false;
  }

  if (store.gameIsActive == false && store.lastAction) {
    store.lastAction = false;

    endGame();

    return;
  }

  if (GOAL) return;

  if (store.gameIsActive == false || CENTER) {
    store.extraTimeFrames++;
  }

  //POWERSHOT
  const powershotIsAvailable = store.gameIsActive && store.powershotIsActive == false && store.gkIsActive == false && store.outIsActive == false;

  if (powershotIsAvailable) {
    if (Date.now() - store.touchTimestamp >= 2000) {
      store.powershotIsActive = true;

      MapManager.givePowershot();
    }
  }

  //OUT
  if (OUT && store.gameIsActive) {
    room.setDiscProperties(BallEnum.INDEX, { xgravity: 0, ygravity: 0 });

    store.gameIsActive = false;
    store.outTimestamp = Date.now();

    const executingTeamId = LAST_TOUCH_BLUE ? TeamsEnum.RED : TeamsEnum.BLUE;

    store.outProperties = {
      position: {
        y: ballPosition.y < 0 ? WallsEnum.TOP_Y : WallsEnum.BOTTOM_Y,
        x: ballPosition.x,
      },
      team: {
        executingId: executingTeamId,
      },
    };

    const matchingWall = ballPosition.y < 0 ? LinesEnum.TOP : LinesEnum.BOTTOM;

    MapManager.createOut({ wall: matchingWall, executingTeamId, position: store.outProperties.position });

    store.eventExecutingTeamId = executingTeamId;
    store.outIsActive = true;
  }

  if (store.outIsActive) {
    const currentTimestamp = Date.now();

    const SECONDS_5 = 8000;

    const timeIsExceeded = currentTimestamp - store.outTimestamp >= SECONDS_5;

    if (timeIsExceeded) {
      const newExecutingTeamId = store.outProperties.team.executingId == TeamsEnum.RED ? TeamsEnum.BLUE : TeamsEnum.RED;

      store.outProperties.team.executingId = newExecutingTeamId;
      store.eventExecutingTeamId = newExecutingTeamId;

      const matchingWall = ballPosition.y < 0 ? LinesEnum.TOP : LinesEnum.BOTTOM;

      MapManager.createOut({ wall: matchingWall, executingTeamId: newExecutingTeamId, position: store.outProperties.position });

      store.outTimestamp = Date.now();
    }
  }

  //GK
  if (GK && store.gameIsActive) {
    store.gameIsActive = false;

    store.gkIsActive = true;
    store.gkTimestamp = Date.now();

    const teamId = RED_GK ? TeamsEnum.RED : TeamsEnum.BLUE;

    store.eventExecutingTeamId = teamId;

    MapManager.createGk({ teamId });
  }

  if (store.gkIsActive) {
    const currentTimestamp = Date.now();

    const SECONDS_5 = 8000;

    const timeIsExceeded = currentTimestamp - store.gkTimestamp >= SECONDS_5;

    if (timeIsExceeded) {
      const { redPlayers, bluePlayers } = getPlayers();

      store.touchTimestamp = Date.now();
      store.gameIsActive = true;
      store.gkTimestamp = Date.now();

      //Unlock penalty field but still lock ball for GK
      [...redPlayers, ...bluePlayers].forEach((player) => room.setPlayerDiscProperties(player.id, { cGroup: room.CollisionFlags.red | room.CollisionFlags.blue }));
    }
  }

  //CORNER
  if (CORNER && store.gameIsActive) {
    store.gameIsActive = false;

    store.cornerTimestamp = Date.now();

    const executingTeamId = RED_CORNER ? TeamsEnum.BLUE : TeamsEnum.RED;

    const getWall = {
      Y: () => (ballPosition.y < 0 ? LinesEnum.TOP : LinesEnum.BOTTOM),
      X: () => (ballPosition.x < 0 ? LinesEnum.LEFT : LinesEnum.RIGHT),
    };

    const matchingCorner = `${getWall.Y()}_${getWall.X()}` as CornersEnum;

    MapManager.createCorner({ corner: matchingCorner, executingTeamId });
  }

  if (store.cornerIsActive) {
    const currentTimestamp = Date.now();

    const SECONDS_5 = 8000;

    const timeIsExceeded = currentTimestamp - store.cornerTimestamp >= SECONDS_5;

    if (timeIsExceeded) {
      store.touchTimestamp = Date.now();
      store.gameIsActive = true;
      store.cornerIsActive = false;
      store.cornerTimestamp = Date.now();

      // MapManager.clearState();

      //Corner time excectet change to GK
      const matchingGkTeamId = ballPosition.x < 0 ? TeamsEnum.RED : TeamsEnum.BLUE;

      store.eventExecutingTeamId = matchingGkTeamId;

      MapManager.createGk({ teamId: matchingGkTeamId });

      store.gameIsActive = false;

      store.gkIsActive = true;
      store.gkTimestamp = Date.now();
    }
  }
};
