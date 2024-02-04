import { connect, disconnect } from 'mongoose';
import * as dotenv from 'dotenv';
import { Schema, model } from 'mongoose';

dotenv.config(); // Load environment variables from .env file

const seedData = [
  {
    shortenedUrl: 'abc123',
    originalUrl: 'https://example.com',
    userId: 'user1',
  },
  {
    shortenedUrl: 'xyz789',
    originalUrl: 'https://anotherexample.com',
    userId: 'user2',
  },
];

dotenv.config();

const urlSchema = new Schema({
  shortenedUrl: String,
  originalUrl: String,
  userId: String,
});

const URLModel = model('URL', urlSchema);

async function seed() {
  try {
    console.log(process.env.URL_MONGO);
    await connect('mongodb://localhost:27017/tinyurl');

    const seeded = await URLModel.insertMany(seedData);
    console.log('Database seeded successfully:', seeded);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await disconnect();
  }
}

seed();
