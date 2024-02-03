import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlService],
    }).compile();

    service = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a short URL key', () => {
    const originalUrl = 'https://www.example.com/long-url-path';
    const shortUrlKey = service.generateShortUrl(originalUrl);

    expect(shortUrlKey).toBeDefined();
    expect(shortUrlKey).toHaveLength(7);
    expect(shortUrlKey).toMatch(/^[0-9A-Za-z]{7}$/);
  });
});
