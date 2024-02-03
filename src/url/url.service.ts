import * as crypto from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { URL } from './schemas/url.schema';
import { base62Encode } from '../utils/utils';
// import httpStatus from 'http-status';

interface Response {
  message: string;
  data: { shortenedUrl: string };
}

@Injectable()
export class URLService {
  constructor(@InjectModel(URL.name) private urlModel: Model<URL>) {}

  generateShortUrl(originalUrl) {
    const hash = crypto.createHash('md5').update(originalUrl).digest('hex');
    const encode = base62Encode(hash);
    return encode ? encode.substring(0, 7) : '';
  }

  async createShortUrl(createUrlDto: { originalUrl: string }): Promise<Response> {
    console.log('createUrlDto', createUrlDto);
    const isExist = await this.urlModel
      .findOne({ originalUrl: createUrlDto.originalUrl })
      .exec();

    if (isExist) {
      // throw new HttpException({
      //   status: HttpStatus.BAD_REQUEST,
      //   error: 'Original URL already exists',
      // }, HttpStatus.BAD_REQUEST);
      return {
        message: 'Original URL already exists',
        data: { shortenedUrl: isExist.shortenedUrl },
      };
    }

    const shortenedUrl = this.generateShortUrl(createUrlDto.originalUrl);
    const newUrl = new this.urlModel({
      originalUrl: createUrlDto.originalUrl,
      shortenedUrl,
    });
    await newUrl.save();
    return {
      message: 'Short URL created successfully',
      data: { shortenedUrl },
    };
  }

  async getOriginalUrl(shortenedUrl: string): Promise<string> {
    const url = await this.urlModel.findOne({ shortenedUrl }).exec();
    return url.originalUrl;
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
