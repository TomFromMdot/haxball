import { room, store } from '@context';

import MapManager from '../helpers/MapManager';
import { BallEnum, IPlayer } from '@types';

export default (player: IPlayer) => {
  const playerDisc = room.getPlayerDiscProperties(player.id);
  const ball = room.getBallPosition();

  //Delay after kick
  // const debounceDelay = [store.outTimestamp, store.cornerTimestamp, store.gkTimestamp].some((timestamp) => (Date.now() - timestamp) <= 80)

  const isFalseKick = (store.outIsActive || store.cornerIsActive) && store.eventExecutingTeamId != player.team;

  const isKickAfterEvent = (store.outIsActive || store.gkIsActive || store.cornerIsActive) && isFalseKick == false;

  if (isKickAfterEvent) {
    MapManager.clearState();

    store.outIsActive = false;
    store.gkIsActive = false;
  }

  if (store.powershotIsActive) {
    store.powershotIsUsed = true;

    MapManager.clearState();

    const powerBallProperties = {
      ygravity: -(playerDisc.yspeed / 50) * BallEnum.POWERSHOT_SPIN_POWER,
    };

    room.setDiscProperties(BallEnum.INDEX, powerBallProperties);

    setTimeout(() => {
      store.powershotIsUsed = false;

      if (store.gkIsActive || store.cornerIsActive) return;

      room.setDiscProperties(BallEnum.INDEX, {
        xgravity: 0,
        ygravity: 0,
        invMass: BallEnum.DEFAULT_INVMASS,
      });
    }, BallEnum.POWERSHOT_SPIN_DURATION);
  }

  if (store.cornerIsActive && isKickAfterEvent) {
    const cornerBallProperties = {
      xgravity: (playerDisc.xspeed / 70) * -1 * BallEnum.CORNER_SPIN_POWER,
      ygravity: ball.y < 0 ? 0.015 : -0.015,
    };

    room.setDiscProperties(BallEnum.INDEX, cornerBallProperties);
    store.cornerIsActive = false;

    setTimeout(() => {
      if (store.gkIsActive == true || store.cornerIsActive) return;

      room.setDiscProperties(BallEnum.INDEX, {
        xgravity: 0,
        ygravity: 0,
        invMass: BallEnum.DEFAULT_INVMASS,
      });
    }, BallEnum.CORNER_SPIN_DURATION);
  }

  store.lastTouchPlayer = player;
  store.gameIsActive = true;
};
