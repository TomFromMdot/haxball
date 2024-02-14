import { IPlayer, TeamsEnum, ChatEnum } from '@types';

import { room, store } from '@context';

export default (changedPlayer: IPlayer) => {
  if (changedPlayer.team == TeamsEnum.SPEC) {
    return;
  }

  setTimeout(() => room.sendAnnouncement(`🍀 ${changedPlayer.name} 🍀 You are in relax mode. SPEC can't see your messages...`, changedPlayer.id, ChatEnum.CALM_GREEN, 'small-bold', 1), 2000);

  store.playersActivity[changedPlayer.id] = Date.now();
};
