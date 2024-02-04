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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('url')
@Controller('tinyurl')
export class URLController {
  constructor(private readonly urlService: URLService) {}

  @Post()
  @ApiOperation({ summary: 'Create a short URL' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Short URL created successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiBody({ type: CreateUrlDto })
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
  @ApiOperation({ summary: 'Update an existing short URL' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Short URL updated successfully',
  })
  @ApiBody({ type: CreateUrlDto })
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
  @ApiParam({
    name: 'shortenedUrl',
    required: true,
    example: 'nwCyj6V4',
    description: 'Shortened URL',
  })
  @ApiResponse({
    status: 200,
    description: 'Original URL fetched successfully',
  })
  @ApiResponse({ status: 404, description: 'URL not found' })
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
