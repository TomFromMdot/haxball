import sharedableStore from '@sharedable/store';

let store = {
  ...sharedableStore,

  lastAction: false,

  isAfterGoal: false,

  gameIsActive: false,
  outIsActive: false,
  gkIsActive: false,
  cornerIsActive: false,
  lastTocuhTeamId: 0,
  outTimestamp: 0,
  gkTimestamp: 0,
  cornerTimestamp: 0,
  gameIsPaused: false,

  eventExecutingTeamId: 0,

  extraTimeFrames: 0,

  powershotIsActive: false,
  powershotIsUsed: false,

  lastTouchPlayer: {
    name: '',
    id: 0,
    team: 0,
  },

  touchTimestamp: 0,

  gkBallBlocker: {
    index: 3,
  },

  outProperties: {
    position: {
      x: 0,
      y: 0,
    },
    team: {
      executingId: 0,
    },
  },

  afkPlayersIds: new Set(),
  mutedPlayersIds: new Set(),

  customTimer: null,

  stadium: null,

  extraTimeTimer: null,

  vpnCheck: true,
};

export default store;
