export default {
  source: {
    id: 'RS',
    name: 'REAL_SOCCER',
    stadium: 'REAL_SOCCER',
  },

  container: {
    name: 'REAL_SOCCER',
    host: 'ip...',
  },

  app: {
    baseUrl: 'https://api.yourdomain.eu/',
    targetPlayersOnTeam: 5,
    requiredPoints: 0,
  },

  room: {
    maxPlayers: 29,
    roomName: '🟨 [ALL] Real Soccer ✨ yourdomain.EU 🟨',
    token: 'thr1.AAAAAGWoUmtPogJV6YPllg.l2OlouUY5iE',
    noPlayer: true,
    public: false,
    geo: { code: 'bn', lat: 51.56999969482422, lon: 19.966999053955077 },
  },
};
