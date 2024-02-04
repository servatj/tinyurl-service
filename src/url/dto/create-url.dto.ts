import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  @IsNotEmpty({ message: 'The original URL is required' })
  @IsUrl({}, { message: 'The original URL must be a valid URL' })
  originalUrl: string;
}
