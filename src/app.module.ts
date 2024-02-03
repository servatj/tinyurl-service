import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { URLModule } from './url/url.module';

@Module({
  imports: [
    URLModule,
    MongooseModule.forRoot('mongodb://localhost:27017/tinyurl'),
  ],
})
export class AppModule {}
