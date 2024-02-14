import { ChatEnum, IPlayer } from '@types';
import { config, room, store } from '@context';

import getPlayers from '@sharedable/utils/getPlayers';

import PlayerManager from '@sharedable/helpers/PlayerManager';

import TeamsManager from '@sharedable/helpers/TeamsManager';

import API from '@sharedable/helpers/API';

import { IConnection } from '@types';
import Query from '@sharedable/helpers/Query';

import messageFilter from '@sharedable/utils/messageFilter';

export default async (player: IPlayer) => {
  //Connection
  const playerIp = Buffer.from(player.conn, 'hex').toString();

  API.checkBlacklist({ ip: playerIp }).then((data) => {
    if (data?.type?.includes('blacklist')) room.kickPlayer(player.id, 'BLACKLIST', true);

    // if (store.vpnCheck) {
    if (data?.proxy == 'yes' || data?.vpn == 'yes') room.kickPlayer(player.id, 'VPN', true);
    // }
  });

  API.checkBlacklist({ ip: playerIp }).then((data) => {
    if (data?.type?.includes('blacklist')) room.kickPlayer(player.id, '', true);
  });

  const usersExists = PlayerManager.findManyUsers({ auth: player.auth, conn: player.conn });

  if (usersExists.length >= 1) {
    if (process.env.NODE_ENV == 'production') room.kickPlayer(player.id, `Duplicated Account!`, false);

    return false;
  }

  const playerManager = new PlayerManager(player);

  const { player: playerEntity, state: playerRoomState } = await playerManager.authenticate();

  if (messageFilter(player.name)) {
    room.kickPlayer(player.id, 'BLACKLIST', true);
    return false;
  }

  const connection: Promise<IConnection> = API.getConnection({ ip: playerIp });
  connection
    .then((data) => Query.updatePlayer({ filter: { auth: player.auth }, fields: { name: player.name, conn: player.conn, country: data?.countryCode } }))
    .then(() => PlayerManager.updateEntity({ player }));

  const isAdmin = playerRoomState.role == 'ADMIN';

  if (process.env.NODE_ENV != 'production' || isAdmin) room.setPlayerAdmin(player.id, true);

  if (room.getPlayerList().length >= config.room.maxPlayers) {
    const isKickPlayer = !isAdmin;

    if (isKickPlayer) return room.kickPlayer(player.id, `Slots are reserved for admins!`, false);
  }

  if (playerRoomState.statistics.points < config.app.requiredPoints && isAdmin === false) {
    room.kickPlayer(player.id, `Missing points: ${config.app.requiredPoints - playerRoomState.statistics.points}`, false);
  }

  TeamsManager.createTeamsDynamically({ playerJoined: true, triggerPlayer: player });
};
