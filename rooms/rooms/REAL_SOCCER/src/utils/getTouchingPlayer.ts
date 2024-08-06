import { room, store } from '@context';

import { BallEnum } from '@types';

const calculatePointDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
  const d1 = p1.x - p2.x;
  const d2 = p1.y - p2.y;

  return Math.sqrt(d1 * d1 + d2 * d2);
};

export default () => {
  const players = room.getPlayerList();
  const ballPosition = room.getBallPosition();

  const playerRadius = 15;

  const triggerDistance = BallEnum.DEFAULT_RADIUS + playerRadius + 2;

  const touchedPlayer = players.find((player) => {
    if (player.position == null) return false;

    const distanceToBall = calculatePointDistance(player.position, ballPosition);

    const playerTouchesBall = distanceToBall < triggerDistance;

    return playerTouchesBall;
  });

  return touchedPlayer;
};
