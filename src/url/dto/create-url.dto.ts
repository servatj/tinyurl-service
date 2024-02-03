import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty({ message: 'The original URL is required' })
  @IsUrl({}, { message: 'The original URL must be a valid URL' })
  originalUrl: string;
}
