import { room, store, config } from '@context';

import { ChatEnum, IPlayer } from '@types';

import MapManager from '../helpers/MapManager';

import getCustomTimer from '../utils/getCustomTimer';

import getPlayers from '@sharedable/utils/getPlayers';

export default () => {
  store.cornerIsActive = false;
  store.gameIsActive = true;
  store.outIsActive = false;
  store.gkIsActive = false;
  store.lastAction = false;

  store.extraTimeFrames = 0;

  store.gameIsStarted = true;

  store.playersActivity = {};

  clearInterval(store.customTimer);
  clearInterval(store.extraTimeTimer);

  store.customTimer = setTimeout(getCustomTimer, 1000 * 60 * 4);

  MapManager.clearState();

  const { redPlayers, bluePlayers } = getPlayers();

  store.playersInMatch = [...redPlayers, ...bluePlayers];

  store.playersInMatch.forEach((player: IPlayer) => (store.playersActivity[player.id] = Date.now()));

  const isFullTeamGame = store.playersInMatch.length == config.app.targetPlayersOnTeam * 2;

  if (isFullTeamGame) {
    room.sendAnnouncement(`💠 STARTED RANKED MATCH`, null, ChatEnum.YELLOW, 'small-bold', 1);
  }

  room.stopRecording();
  room.startRecording();
};
