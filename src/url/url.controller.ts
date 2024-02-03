import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  HttpStatus,
  Put,
  Param,
} from '@nestjs/common';
import { URLService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Response } from 'express';

@Controller('tinyurl')
export class URLController {
  constructor(private readonly urlService: URLService) {}

  @Post()
  async createShortUzrl(
    @Body() createUrlDto: CreateUrlDto,
    @Res() res: Response,
  ) {
    try {
      const shortenedUrl = await this.urlService.createShortUrl(createUrlDto);
      return res.status(HttpStatus.OK).json({
        message: 'success',
        data: { shortenedUrl },
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'EInternal server error',
        error: error.message,
      });
    }
  }

  @Put()
  async updateShortUrl(
    @Body() createUrlDto: CreateUrlDto,
    @Res() res: Response,
  ) {
    const shortenedUrl = await this.urlService.updateShortUrl(createUrlDto);
    return res.status(HttpStatus.OK).json({
      message: 'Short URL updated successfully',
      data: { shortenedUrl },
    });
  }

  @Get(':shortenedUrl')
  async decodeShortUrl(
    @Param('shortenedUrl') shortenedUrl: string,
    @Res() res: Response,
  ) {
    console.log('originalUrl', shortenedUrl);
    const originalUrl = await this.urlService.getOriginalUrl(shortenedUrl);
    return res.status(HttpStatus.OK).json({
      message: 'Original URL fetched successfully',
      data: { originalUrl },
    });
  }
}
