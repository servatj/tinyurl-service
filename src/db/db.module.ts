import { Module } from '@nestjs/common';
import { PG_CONNECTION } from '../constants/constants';
import { Pool } from 'pg';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tinyurl',
    password: 'postgres',
    port: 5432,
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
