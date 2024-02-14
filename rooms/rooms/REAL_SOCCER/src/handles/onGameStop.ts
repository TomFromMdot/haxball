import { room, store } from '@context';

export default () => {
  store.gameIsStarted = false;

  clearInterval(store.customTimer);
  clearInterval(store.extraTimeTimer);
};
