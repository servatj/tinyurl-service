import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateStatsDto {
  @IsNotEmpty({ message: 'The original URL is required' })
  @IsUrl({}, { message: 'The original URL must be a valid URL' })
  url: string;

  @IsNotEmpty({ message: 'The shortened URL is required' })
  @IsUrl({}, { message: 'The shortened URL must be a valid URL' })
  shortUrl: string;

  @IsNotEmpty({ message: 'The user agent is required' })
  userAgent: string;

  @IsNotEmpty({ message: 'The referrer is required' })
  ipAddress: string;
}
