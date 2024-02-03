import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { URL } from './schemas/url.schema';

@Injectable()
export class URLService {
  constructor(@InjectModel(URL.name) private urlModel: Model<URL>) {}

  private async shortUrl(largeUrl: string): Promise<string> {
    Logger.log('notImplemented');
    return largeUrl;
  }

  async createShortUrl(createUrlDto: { originalUrl: string }): Promise<string> {
    const shortenedUrl = this.shortUrl(createUrlDto.originalUrl);
    const newUrl = new this.urlModel({
      originalUrl: createUrlDto.originalUrl,
      shortenedUrl,
    });
    await newUrl.save();
    return `http://yourdomain.com/${shortenedUrl}`;
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
