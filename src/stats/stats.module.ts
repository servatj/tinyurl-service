import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
