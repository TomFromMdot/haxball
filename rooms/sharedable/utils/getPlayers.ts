import {room, store} from "@context";

import { TeamsEnum } from '@types';

export default () => {
  const players = room.getPlayerList().filter((player) => !store.afkPlayersIds.has(player.id));

  return {
    redPlayers: players.filter((player) => player.team == TeamsEnum.RED),
    bluePlayers: players.filter((player) => player.team == TeamsEnum.BLUE),
    specPlayers: players.filter((player) => player.team == TeamsEnum.SPEC),
    allPlayers: players,
  };
};