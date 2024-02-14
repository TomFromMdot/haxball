import getPlayers from '@sharedable/utils/getPlayers';

import { room, store } from '@context';

import { ChatEnum, IPlayer, TeamsEnum, IModifiedPlayer } from '@types';

import PlayerManager from './PlayerManager';
import PointsCalculator from './PointsCalculator';

import ranks from '../assets/ranks';

export default class {
  static subtractPoints({ player }: { player: IPlayer }) {
    try {
      const { redPlayers, bluePlayers } = getPlayers();

      const opponentTeamPoints: number[] = (player.team == TeamsEnum.RED ? bluePlayers : redPlayers).map((player) => PlayerManager.getUser(player as IPlayer)?.entity?.state.statistics?.points ?? 0);
      const playerTeamPoints: number[] = (player.team == TeamsEnum.RED ? redPlayers : bluePlayers).map((player) => PlayerManager.getUser(player as IPlayer)?.entity?.state.statistics?.points ?? 0);

      const opponentTeamPointsAverage = PointsCalculator.getAverage(opponentTeamPoints) || 0;
      const playerTeamPointsAverage = PointsCalculator.getAverage(playerTeamPoints) || 0;

      const currentUser = PlayerManager.getUser(player);

      const { ratingChange } = PointsCalculator.calculate({
        currentPlayerPoints: currentUser.entity.state.statistics.points,
        playerTeamAverrage: playerTeamPointsAverage,
        opponentTeamAverrage: opponentTeamPointsAverage,
        playerWin: false,
      });

      const currentTotalPoints = currentUser.entity.state.statistics.points + ratingChange;

      currentUser.entity.state.statistics.points = currentTotalPoints;

      const ranksEntries = Object.entries(ranks);
      const matchingRang = ranksEntries.reduce((curr, prev) => (curr[1] <= currentTotalPoints && prev[1] >= currentTotalPoints ? curr : prev));

      const stats = {
        points: Math.floor(ratingChange),
        rank: matchingRang[0],
      };

      PlayerManager.updateStats({ user: currentUser, stats });

      room.sendAnnouncement(`[RAGEQUIT] ${player.name} | PTS: ${Math.floor(ratingChange)}`, null, ChatEnum.ERROR, 'small-bold', 1);
    } catch (error) {
      console.log(error.message);
    }
  }

  static addPoints({ winnerTeamId }: { winnerTeamId: number }) {
    const playingPlayers = store.playersInMatch;

    const bluePlayers = playingPlayers.filter((p: IPlayer) => p.team === TeamsEnum.BLUE);
    const redPlayers = playingPlayers.filter((p: IPlayer) => p.team === TeamsEnum.RED);

    let modifiedPlayers: IModifiedPlayer[] = [];

    for (const player of playingPlayers) {
      const opponentTeamPoints: number[] = (player.team == TeamsEnum.RED ? bluePlayers : redPlayers).map((player: IPlayer) => PlayerManager.getUser(player)?.entity?.state.statistics?.points ?? 0);
      const playerTeamPoints: number[] = (player.team == TeamsEnum.RED ? redPlayers : bluePlayers).map((player: IPlayer) => PlayerManager.getUser(player)?.entity?.state.statistics?.points ?? 0);

      const opponentTeamPointsAverage = PointsCalculator.getAverage(opponentTeamPoints) || 0;
      const playerTeamPointsAverage = PointsCalculator.getAverage(playerTeamPoints) || 0;

      const currentUser = PlayerManager.getUser(player);

      if (!currentUser) continue;

      const { ratingChange } = PointsCalculator.calculate({
        currentPlayerPoints: currentUser.entity.state.statistics.points,
        playerTeamAverrage: playerTeamPointsAverage,
        opponentTeamAverrage: opponentTeamPointsAverage,
        playerWin: winnerTeamId == player.team,
      });

      const currentTotalPoints = currentUser.entity.state.statistics.points + ratingChange;

      const ranksEntries = Object.entries(ranks);
      const matchingRangs = ranksEntries.reduce((curr, prev) => (curr[1] <= currentTotalPoints && prev[1] >= currentTotalPoints ? curr : prev));

      modifiedPlayers = [{ name: player.name, ratingChange, currentRank: matchingRangs[0] }, ...modifiedPlayers];

      room.sendAnnouncement(`CURRENT RANK: ${matchingRangs[0]} | PTS: ${Math.floor(ratingChange)} | TOTAL PTS: ${Math.floor(currentTotalPoints)}`, player.id, ChatEnum.YELLOW, 'small-bold', 1);

      const stats = {
        points: Math.floor(ratingChange),
        rank: matchingRangs[0],
      };

      PlayerManager.updateStats({ user: currentUser, stats });
    }

    return modifiedPlayers;
  }
}
