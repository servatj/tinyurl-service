import { Module } from '@nestjs/common';
import { PG_CONNECTION } from '../constants/constants';
import { Pool } from 'pg';

import * as dotenv from 'dotenv';

dotenv.config();

console.log('Connecting db to host', process.env.PG_HOST);

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'postgres',
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: 5432,
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
