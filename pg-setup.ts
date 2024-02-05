import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

console.log('PG_HOST:', process.env.PG_HOST);
console.log('PG_USER:', process.env.PG_USER);
console.log('PG_DB:', process.env.PG_DB);
console.log('PG_PASSWORD:', process.env.PG_PASSWORD);
console.log('PG_PORT:', process.env.PG_PORT);

const client = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || '5432', 10),
});

const createTableText = `
  CREATE TABLE IF NOT EXISTS urlstats (
    id SERIAL PRIMARY KEY,
    short_url VARCHAR(255) NOT NULL,
    original_url VARCHAR(255) NOT NULL,
    ip_address VARCHAR(255) NOT NULL,
    user_agent VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

async function migrate() {
  try {
    await client.connect();
    await client.query(createTableText);
    console.log('Table created successfully.');
    await client.end();
  } catch (err) {
    console.error('Error during migration', err.stack);
  } finally {
    await process.exit();
  }
}

migrate();
