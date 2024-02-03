import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { URLController } from './url.controller';
import { URLService } from './url.service';
import { URL, URLSchema } from './schemas/url.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: URL.name, schema: URLSchema }])],
  controllers: [URLController],
  providers: [URLService],
})
export class URLModule {}
