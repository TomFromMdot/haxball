import { room, store } from '@context';

import { ChatEnum } from '@types';

function secondsToExtraTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes) {
    return `${minutes}min ${remainingSeconds}s`;
  } else {
    return `${seconds} seconds`;
  }
}

export default () => {
  const roundedExtraTime = Math.round(store.extraTimeFrames / 60);
  room.sendAnnouncement(`💠 EXTRA TIME: +${secondsToExtraTime(roundedExtraTime)}`, null, ChatEnum.AQUA, 'small-bold', 1);

  const frameMiliseconds = 16.7;
  const extraTimeMiliseconds = store.extraTimeFrames * frameMiliseconds;

  store.extraTimeTimer = setTimeout(() => {
    store.lastAction = true;

    room.sendAnnouncement('💠 LAST ACTION...', null, ChatEnum.AQUA, 'small-bold', 1);
  }, extraTimeMiliseconds);
};
