import { IPlayer } from '@types';
import { room, store, config } from '@context';

import PlayerManager from '@sharedable/helpers/PlayerManager';

import TeamsManager from '@sharedable/helpers/TeamsManager';
import getPlayers from '@sharedable/utils/getPlayers';
import RankingManager from '@sharedable/helpers/RankingManager';

export default async (player: IPlayer) => {
  TeamsManager.createTeamsDynamically({ playerJoined: false, triggerPlayer: player });

  //Escape - subtract points
  const { redPlayers, bluePlayers, specPlayers } = getPlayers();

  const isPlayedPlayer = player.team != 0;
  const isFullTeamGame = [...redPlayers, ...bluePlayers, ...specPlayers].length >= config.app.targetPlayersOnTeam * 2;

  const isEscape = store.gameIsStarted && isPlayedPlayer && isFullTeamGame;

  if (isEscape) {
    RankingManager.subtractPoints({ player });
  }

  store.matchStage = store.matchStage.filter((match: { sender: IPlayer; recipient: IPlayer }) => match.recipient.id !== player.id && match.sender.id != player.id);
  store.matchQueue = store.matchQueue.filter((match: { sender: IPlayer; recipient: IPlayer }) => match.recipient.id !== player.id && match.sender.id != player.id);

  store.afkPlayersIds.delete(player.id);

  PlayerManager.delete(player);
};
