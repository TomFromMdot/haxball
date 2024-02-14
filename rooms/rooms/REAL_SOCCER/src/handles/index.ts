import onPlayerChat from '@sharedable/handles/onPlayerChat';
import onPlayerJoin from '@sharedable/handles/onPlayerJoin';
import onRoomLink from '@sharedable/handles/onRoomLink';
import onPlayerLeave from '@sharedable/handles/onPlayerLeave';
import onPlayerTeamChange from '@sharedable/handles/onPlayerTeamChange';
import onPlayerAdminChange from '@sharedable/handles/onPlayerAdminChange';
import onPlayerActivity from '@sharedable/handles/onPlayerActivity';

import onGameTick from './onGameTick';
import onPlayerBallKick from './onPlayerBallKick';
import onGameStart from './onGameStart';
import onPositionsReset from './onPositionsReset';
import onGameStop from './onGameStop';
import onTeamGoal from './onTeamGoal';

export {
  onPlayerActivity,
  onPlayerTeamChange,
  onPlayerAdminChange,
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
};
