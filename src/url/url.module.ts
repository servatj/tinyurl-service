import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { URLController } from './url.controller';
import { URLService } from './url.service';
import { URL, URLSchema } from './schemas/url.schema';
import { StatsService } from 'src/stats/stats.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [
    DbModule,
    MongooseModule.forFeature([{ name: URL.name, schema: URLSchema }]),
  ],
  controllers: [URLController],
  providers: [URLService, StatsService],
})
export class URLModule {}
