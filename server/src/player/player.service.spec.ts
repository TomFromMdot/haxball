import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

describe('PlayerService', () => {
  let playerService: PlayerService;
  let prismaService: PrismaService;

  const originalMockPlayer = {
    id: '1',
    name: 'testuser',
    auth: `auth:${Date.now()}`,
    conn: 'xxx',
    country: null,
  };
  const mockRoomState = {
    room: 'RS',
    auth: originalMockPlayer.auth,
    statistics: {},
  };

  let findUniqueMock = jest.fn();
  let updateMock = jest.fn();
  let playerUpsertMock = jest.fn();
  let roomStateUpsertMock = jest.fn();
  let findManyMock = jest.fn();
  let transactionMock = jest.fn();

  beforeEach(async () => {
    const prismaMock = {
      player: {
        findUnique: findUniqueMock,
        update: updateMock,
        findMany: findManyMock,
        upsert: playerUpsertMock,
      },
      roomState: {
        upsert: roomStateUpsertMock,
      },
      $transaction: transactionMock,
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    playerService = moduleRef.get(PlayerService);
    // prismaService = moduleRef.get(PrismaService);
  });

  it('should be defined', () => {
    expect(playerService).toBeDefined();
  });

  describe('UPSERT / UPDATE', () => {
    it('upsert transaction failed', async () => {
      transactionMock.mockRejectedValue(
        new Error('Unknown transaction errror'),
      );

      await expect(transactionMock).rejects.toThrowError(
        'Unknown transaction errror',
      );
    });

    it('should be upsert mockUser and mockRoomState', async () => {
      const playerUpsertQuery = {
        player: originalMockPlayer,
        roomState: mockRoomState,
      };

      transactionMock.mockResolvedValue(playerUpsertQuery);

      const result = await playerService.upsertPlayer(playerUpsertQuery);

      expect(transactionMock).toHaveBeenCalled();
      expect(result).toEqual(playerUpsertQuery);
    });

    it('should update mockPlayer', async () => {
      const updateQuery = {
        filter: originalMockPlayer,
        fields: { conn: 'test-conn' },
      };
      const expectedUpdateOperation = {
        where: originalMockPlayer,
        data: { conn: 'test-conn' },
      };

      const updatedMockPlayer = {
        ...originalMockPlayer,
        conn: 'test-conn',
      };

      updateMock.mockResolvedValue(updatedMockPlayer);
      const result = await playerService.updatePlayer(updateQuery);

      expect(updateMock).toHaveBeenCalledWith(expectedUpdateOperation);
      expect(result.conn).toEqual('test-conn');
    });
    it('should update room state and increment statistics', async () => {
      const updateQuery = {
        filter: { auth: originalMockPlayer.auth, room: mockRoomState.room },
        fields: { statistics: { goals: 1 } },
      };

      const expectedCreateFields = {
        auth: originalMockPlayer.auth,
        room: mockRoomState.room,
        playerId: originalMockPlayer.id,
        ...updateQuery.fields,
      };

      const expectedUpsertQuery = {
        where: {
          auth_room: {
            auth: originalMockPlayer.auth,
            room: mockRoomState.room,
          },
        },
        update: {
          statistics: { update: { goals: { increment: 1 } } },
        },
        create: expectedCreateFields,
      };

      findUniqueMock.mockResolvedValue(originalMockPlayer);
      roomStateUpsertMock.mockResolvedValue(expectedCreateFields);

      const result = await playerService.updateRoomState(updateQuery);

      expect(findUniqueMock).toHaveBeenCalledWith({
        where: { auth: originalMockPlayer.auth },
      });
      expect(roomStateUpsertMock).toHaveBeenCalledWith(expectedUpsertQuery);
      expect(result).toEqual(expectedCreateFields);
    });

    it('update room state and increment statistics failed', async () => {
      const updateQuery = {
        filter: { auth: originalMockPlayer.auth, room: mockRoomState.room },
        fields: { statistics: { goals: 1 } },
      };

      findUniqueMock.mockResolvedValue(null);

      const result = playerService.updateRoomState(updateQuery);

      await expect(result).rejects.toThrowError('Player doest not exist');
    });
  });
});
