import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('URLModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tinyurl (POST) - create short URL', () => {
    return request(app.getHttpServer())
      .post('/tinyurl')
      .send({ originalUrl: 'https://example.com' })
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.data).toHaveProperty('shortenedUrl');
        expect(res.body.message).toEqual('success');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
