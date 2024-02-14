import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { ConfigModule } from '@nestjs/config';
import { ShopModule } from './shop/shop.module';
import { HexScalar } from './scalars/shop.scalar';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ headers: req.headers }),
      resolvers: { Hex: HexScalar },
    }),
    PlayerModule,
    ShopModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
