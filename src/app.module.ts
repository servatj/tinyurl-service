import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { URLModule } from './url/url.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    URLModule,
    MongooseModule.forRoot('mongodb://localhost:27017/tinyurl'),
  ],
})
export class AppModule {}
