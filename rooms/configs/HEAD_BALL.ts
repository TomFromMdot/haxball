import util from 'node:util';

export default {
  source: {
    id: 'HDB',
    name: 'HEAD_BALL',
    stadium: 'HEAD_BALL',
  },

  container: {
    name: 'HEAD_BALL',
    host: 'ip...',
  },

  app: {
    baseUrl: 'https://api.yourdomain.eu/',
    targetPlayersOnTeam: 2,
    requiredPoints: 0,
  },

  room: {
    maxPlayers: 2,
    roomName: '',
    token: 'thr1.AAAAAGW83nIDw2GWfDQO-Jg.W-NpcEfGbT4',
    noPlayer: true,
    public: false,
    geo: { code: 'bn', lat: 51.56999969482423, lon: 19.966999053955076 },
    proxy: '',
  },
};
