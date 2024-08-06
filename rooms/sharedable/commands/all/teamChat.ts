import { ChatEnum, IPlayer, TeamsEnum } from '@types';

import getPlayers from '@sharedable/utils/getPlayers';

import { room } from '@context';

export default (player: IPlayer, message: string) => {
  const { redPlayers, bluePlayers, specPlayers } = getPlayers();

  const teams = {
    [TeamsEnum.RED]: redPlayers,
    [TeamsEnum.BLUE]: bluePlayers,
    [TeamsEnum.SPEC]: specPlayers,
  };

  const colors = {
    [TeamsEnum.RED]: ChatEnum.RED,
    [TeamsEnum.BLUE]: ChatEnum.BLUE,
    [TeamsEnum.SPEC]: ChatEnum.GRAY,
  };

  const matchingTeam = teams[player.team];
  const matchingColor = colors[player.team];

  for (const p of matchingTeam) {
    const prefix = `[${player.team == TeamsEnum.SPEC ? `SPEC` : 'TEAM'}]`;

    room.sendAnnouncement(`${prefix} ${player.name}: ${message.split(' ').slice(1).join(' ')}`, p.id, matchingColor, 'bold', 1);
  }
};
