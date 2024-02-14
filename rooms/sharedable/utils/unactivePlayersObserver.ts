import { room, store, config } from '@context';

import getPlayers from './getPlayers';
import { ChatEnum, TeamsEnum } from '@types';

export default async () => {
  const { redPlayers, bluePlayers } = getPlayers();
  const isFullTeamGame = [...redPlayers, ...bluePlayers].length == config.app.targetPlayersOnTeam * 2;

  if (store.gameIsStarted == false || isFullTeamGame == false) return;

  for (const playerId in store.playersActivity) {
    const lastActive = store.playersActivity[playerId];
    const elapsedSeconds = Math.floor((Date.now() - lastActive) / 1000);

    const player = room.getPlayer(Number(playerId));

    if (!player) continue;

    if (elapsedSeconds >= 11 && player.team != TeamsEnum.SPEC) {
      if (process.env.NODE_ENV != 'production') continue;

      for (let i = 0; i < 5; i++) {
        setTimeout(() => room.sendAnnouncement(`🔻 ${player.name} move or kick...`, player.id, ChatEnum.ERROR, 'small-bold', 2), 70 * i);
      }
    }

    if (elapsedSeconds >= 15 && player.team != TeamsEnum.SPEC) {
      if (process.env.NODE_ENV == 'production') {
        await room.kickPlayer(Number(playerId), 'AFK', false);
      }
    }
  }
};
