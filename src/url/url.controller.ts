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

@Controller()
export class URLController {
  constructor(private readonly urlService: URLService) {}

  @Post('tinyurl')
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

  @Put('tinyurl')
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

  @Get('tinyurl/decode/:shortenedUrl')
  async decodeShortUrl(
    @Param('shortenedUrl') shortenedUrl: string,
    @Res() res: Response,
  ) {
    const originalUrl = await this.urlService.getOriginalUrl(shortenedUrl);
    return res.status(HttpStatus.OK).json({
      message: 'Original URL fetched successfully',
      data: { originalUrl },
    });
  }
}
