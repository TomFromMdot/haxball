import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Player, RoomState } from './player.graphql';
import { IGetPlayerRoomStateArgs } from './player.interface';
import { Prisma } from '@prisma/client';

import { AuthenticationError } from '@nestjs/apollo';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  upsertPlayer({
    player,
    roomState,
  }: {
    player: Prisma.PlayerCreateInput;
    roomState: { room: string };
  }): Promise<{ player: Player; roomState: RoomState } | null> {
    return this.prisma.$transaction(async (tx) => {
      const playerQuery = {
        where: {
          auth: player.auth,
        },
        update: {},
        create: player,
      };

      const createdPlayer = await tx.player.upsert(playerQuery);

      if (!createdPlayer?.id) throw new Error('Player doest not exist');

      const roomStateQuery = {
        where: {
          auth_room: {
            room: roomState.room,
            auth: player.auth,
          },
        },
        update: {},
        create: {
          playerId: createdPlayer.id,
          auth: player.auth,
          room: roomState.room,
          statistics: {},
        },
      };

      const createdRoomState = await tx.roomState.upsert(roomStateQuery);

      console.log(createdRoomState);

      return { player: createdPlayer, roomState: createdRoomState };
    });
  }

  async updatePlayer(data: {
    filter: Prisma.PlayerWhereUniqueInput;
    fields: Prisma.PlayerUpdateInput;
  }) {
    const query = {
      where: data.filter,
      data: data.fields,
    };
    const updatedPlayer = await this.prisma.player.update(query);

    console.log(updatedPlayer);
    return updatedPlayer;
  }

  async updateRoomState(data: {
    filter: Prisma.RoomStateAuthRoomCompoundUniqueInput;
    fields: Prisma.RoomStateUpdateInput;
  }) {
    const player = await this.prisma.player.findUnique({
      where: { auth: data.filter.auth },
    });

    if (!player) throw new Error('Player doest not exist');

    const createFields = {
      ...data.fields,
      ...data.filter,
      playerId: player.id,
    } as Prisma.RoomStateCreateInput;

    const statsIncrementQuery = Object.entries(data.fields.statistics).map(
      ([key, value]) => [
        key,
        typeof value == 'string' ? value : { increment: value },
      ],
    );

    return this.prisma.roomState.upsert({
      where: { auth_room: data.filter },
      update: {
        statistics: { update: Object.fromEntries(statsIncrementQuery) },
      },
      create: createFields,
    });
  }

  getRoomStates(data: IGetPlayerRoomStateArgs): Promise<RoomState[]> {
    const query = { where: { auth: data.auth, room: { in: data.rooms } } };

    return this.prisma.roomState.findMany(query);
  }

  authorization({ password }: { password: string }) {
    if (password != process.env.JWT_PASSWORD) {
      throw new AuthenticationError('Invalid password');
    }

    return jwt.sign({ role: 'ADMIN' }, process.env.JWT_SECRET, {
      expiresIn: '365d',
    });
  }

  async getPlayers(data) {
    const limit = 30;

    const playerQuery = {
      name: {
        contains: data?.name,
        mode: 'insensitive',
      },
    };

    const query = {
      orderBy: [
        {
          statistics: {
            [data.sortBy]: 'desc',
          },
        },
      ],
      include: { player: true },

      where: {
        room: data.room,
        ...(data?.name && { player: playerQuery }),
      },
      take: limit,
      skip: data.page * limit,
    };

    //@ts-ignore
    const players = await this.prisma.roomState.findMany(query);

    return players;
  }
}
