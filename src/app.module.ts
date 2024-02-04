import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { URLModule } from './url/url.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    StatsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    URLModule,
    MongooseModule.forRoot('mongodb://localhost:27017/tinyurl'),
    DbModule,
  ],
  controllers: [],
})
export class AppModule {}
