import { GameFinalsEnum, TeamsEnum, StatsKeysEnum, WebhookEnum, IPlayer } from '@types';

import { room, store, config } from '@context';

import RankingManager from '@sharedable/helpers/RankingManager';
import PlayerManager from '@sharedable/helpers/PlayerManager';
import TeamsManager from '@sharedable/helpers/TeamsManager';

import uploadReplay from '@sharedable/utils/uploadReplay';
import getWebhook from '@sharedable/utils/getWebhook';

export default async () => {
  const scores = room.getScores();

  if (!scores) return;

  room.pauseGame(true);

  const getWinnerTeamId = () => (scores.red < scores.blue ? TeamsEnum.BLUE : TeamsEnum.RED);
  const isDraw = scores.red === scores.blue;

  const winnerTeamId = getWinnerTeamId();

  const gameFinal = isDraw ? GameFinalsEnum.DRAW : GameFinalsEnum.WIN;

  const isFullTeamGame = store.playersInMatch.length == config.app.targetPlayersOnTeam * 2;

  //Only players who are still in the room
  // store.playersInMatch = store.playersInMatch.filter((player) => room.getPlayer(player.id));

  store.playersInMatch = store.playersInMatch.filter((player: IPlayer) => room.getPlayer(player.id));

  if (gameFinal == GameFinalsEnum.DRAW && isFullTeamGame) {
    store.playersInMatch.forEach((player: IPlayer) => PlayerManager.updateStats({ user: PlayerManager.getUser(player), stats: { draws: 1, coins: 20 } }));
  }

  if (gameFinal == GameFinalsEnum.WIN && isFullTeamGame) {
    const bluePlayers = store.playersInMatch.filter((p: IPlayer) => p.team === TeamsEnum.BLUE);
    const redPlayers = store.playersInMatch.filter((p: IPlayer) => p.team === TeamsEnum.RED);

    const winningPlayers = winnerTeamId == TeamsEnum.RED ? redPlayers : bluePlayers;
    const losingPlayers = winnerTeamId == TeamsEnum.RED ? bluePlayers : redPlayers;

    const modifiedPlayers = RankingManager.addPoints({ winnerTeamId });

    const replayBuffer: Uint8Array = room.stopRecording();

    if (process.env.NODE_ENV == 'production') {
      const replayUrl = await uploadReplay(replayBuffer);

      const playerString = modifiedPlayers.map((player) => `${player.name} | ${player.currentRank} | ${player.ratingChange}`);

      const message = '```' + playerString.join('\n') + '```' + `\n [Replay](${replayUrl}) **ROOM: ${config.container.name}**`;

      getWebhook(WebhookEnum.REPLYS).send(message);
    }

    winningPlayers.forEach((player: IPlayer) => PlayerManager.updateStats({ user: PlayerManager.getUser(player), stats: { wins: 1, games: 1, coins: 20 } }));
    losingPlayers.forEach((player: IPlayer) => PlayerManager.updateStats({ user: PlayerManager.getUser(player), stats: { defeats: 1, games: 1, coins: 5 } }));
  }

  await new Promise((r) => setTimeout(r, 1000));

  room.stopGame();

  await TeamsManager.createTeams({ winnerTeamId, gameFinal });
};
