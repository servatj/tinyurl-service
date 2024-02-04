import { Controller, Post, Get, Body, Res, HttpStatus } from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatsDto } from './dto/create-stats.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post()
  async writeUrlUsage(
    @Body() createStatsDto: CreateStatsDto,
    @Res() res: Response,
  ) {
    try {
      const stats = await this.statsService.recordUrlStat(createStatsDto);
      return res.status(HttpStatus.OK).json({
        message: 'success',
        data: { stats },
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  }

  @Get()
  async getUrlStats(@Body('url') url: string, @Res() res: Response) {
    try {
      const stats = await this.statsService.getUrlStats(url);
      return res.status(HttpStatus.OK).json({
        message: 'success',
        data: { stats },
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  }

  @Get()
  async getTopStats(@Body('url') url: string, @Res() res: Response) {
    try {
      const stats = await this.statsService.getUrlStats(url);
      return res.status(HttpStatus.OK).json({
        message: 'success',
        data: { stats },
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  }
}
