import { Module } from '@nestjs/common';
import { PlayerResolver } from './player.resolver';
import { PlayerService } from './player.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PlayerResolver, PlayerService, PrismaService],
})
export class PlayerModule {}
