import * as crypto from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { URL } from './schemas/url.schema';
import { base62Encode } from '../utils/utils';
import { StatsService } from '../stats/stats.service';
import { CreateStatsDto } from '../stats/dto/create-stats.dto';

interface Response {
  message: string;
  data: { shortenedUrl: string };
}

@Injectable()
export class URLService {
  constructor(
    @InjectModel(URL.name) private urlModel: Model<URL>,
    private statsService: StatsService,
  ) {}

  generateShortUrl(originalUrl) {
    const hash = crypto.createHash('md5').update(originalUrl).digest('hex');
    const encode = base62Encode(hash);
    return encode ? encode.substring(0, 7) : '';
  }

  async createShortUrl(createUrlDto: {
    originalUrl: string;
  }): Promise<Response> {
    console.log('createUrlDto', createUrlDto);
    const isExist = await this.urlModel
      .findOne({ originalUrl: createUrlDto.originalUrl })
      .exec();

    if (isExist) {
      return {
        message: 'Original URL already exists',
        data: { shortenedUrl: isExist.shortenedUrl },
      };
    }

    const shortenedUrl = this.generateShortUrl(createUrlDto.originalUrl);
    const domain = process.env.DOMAIN || 'http://localhost:3000';
    const fullShortenedUrl = `${domain}/${shortenedUrl}`;
    const newUrl = new this.urlModel({
      originalUrl: createUrlDto.originalUrl,
      shortenedUrl,
    });
    await newUrl.save();
    return {
      message: 'Short URL created successfully',
      data: { shortenedUrl: fullShortenedUrl },
    };
  }

  async getOriginalUrl(shortenedUrl: string): Promise<Response> {
    const url = await this.urlModel.findOne({ shortenedUrl }).exec();

    if (!url) {
      return {
        message: 'Short URL not found',
        data: null,
      };
    }

    const createStatsDto = new CreateStatsDto();
    createStatsDto.url = url.originalUrl;
    createStatsDto.shortUrl = shortenedUrl;
    createStatsDto.userAgent = 'userAgent';
    createStatsDto.ipAddress = 'ipAddress';

    await this.statsService.recordUrlStat(createStatsDto);
    return {
      message: 'Original URL found',
      data: url,
    };
  }

  async updateShortUrl(createUrlDto: { originalUrl: string }): Promise<string> {
    Logger.log('notImplemented');
    return createUrlDto.originalUrl;
  }

  async decodeShortUrl(shortenedUrl: string): Promise<string> {
    Logger.log('notImplemented');
    return shortenedUrl;
  }
}
