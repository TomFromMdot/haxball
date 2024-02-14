import { room, config, store } from '@context';

import { BallEnum, ChatEnum, TeamsEnum, StatsKeysEnum, IPlayer } from '@types';
import PlayerManager from '@sharedable/helpers/PlayerManager';
import getPlayers from '@sharedable/utils/getPlayers';
import Query from '@sharedable/helpers/Query';

export default (teamId: TeamsEnum) => {
  const { redPlayers, bluePlayers } = getPlayers();

  store.gameIsActive = false;
  room.setDiscProperties(BallEnum.INDEX, { cGroup: room.CollisionFlags.ball });

  const goalsMessages = {
    owngoal: () => room.sendAnnouncement(`🔻 OWNGOAL ${store.lastTouchPlayer.name}`, null, ChatEnum.ERROR, 'small-bold', 1),
    goal: () => room.sendAnnouncement(`💠 GOOOAL ${store.lastTouchPlayer.name}`, null, ChatEnum.YELLOW, 'small-bold', 1),
  };

  const goalType = teamId == store.lastTouchPlayer.team ? 'goal' : 'owngoal';
  const sendMatchingMessage = goalsMessages[goalType];

  sendMatchingMessage();

  const isFullTeamGame = redPlayers.length + bluePlayers.length == config.app.targetPlayersOnTeam * 2;

  if (isFullTeamGame) {
    const triggeredUser = PlayerManager.getUser({ id: store.lastTouchPlayer.id });

    const matchingStatsKey = goalType == 'goal' ? 'goals' : 'owngoals';

    Query.updateRoomState({ user: triggeredUser, data: { statistics: { [matchingStatsKey]: 1 } } }).then(() => PlayerManager.updateEntity({ player: triggeredUser.player }));
  }

  const scores = room.getScores();

  const isGoalLimit = scores.red == 3 || scores.blue == 3;

  if (isGoalLimit) {
    //onGameTick watch this property
    store.lastAction = true;
  }
};
