import 'dotenv/config';

import { readFile } from 'fs/promises';
import path from 'path';

import {
  onRoomLink,
  onGameTick,
  onPlayerBallKick,
  onGameStart,
  onPositionsReset,
  onPlayerJoin,
  onPlayerLeave,
  onPlayerChat,
  onGameStop,
  onTeamGoal,
  onPlayerTeamChange,
  onPlayerAdminChange,
  onPlayerActivity,
} from './src/handles';

import unactivePlayersObserver from '@sharedable/utils/unactivePlayersObserver';

import { store, config } from '@context';
import Room from 'core/Room';
// @ts-ignore
export default (room) => {
  const stadiumPath = path.join(process.cwd(), `./sharedable/assets/maps/REAL_SOCCER.json`);

  readFile(stadiumPath, { encoding: 'utf-8' })
    .then((data: string) => room.setCustomStadium(data))
    .catch((error: Error) => console.error(error));

  store.gameIsStarted = true;

  room.onRoomLink = onRoomLink;
  room.onGameTick = onGameTick;
  room.onPlayerBallKick = onPlayerBallKick;
  room.onGameStart = onGameStart;
  room.onPlayerJoin = onPlayerJoin;
  room.onPlayerLeave = onPlayerLeave;
  room.onPlayerChat = onPlayerChat;
  room.onPositionsReset = onPositionsReset;
  room.onGameStop = onGameStop;
  room.onTeamGoal = onTeamGoal;
  room.onPlayerTeamChange = onPlayerTeamChange;
  room.onPlayerAdminChange = onPlayerAdminChange;
  room.onPlayerActivity = onPlayerActivity;

  room.setTeamsLock(true);
  room.setTimeLimit(config?.app?.limits?.time || 0);
  room.setScoreLimit(config?.app?.limits?.goals || 0);

  room.startRecording();

  //Game Observers
  const unactiveObserver = setInterval(unactivePlayersObserver, 1000);
};
