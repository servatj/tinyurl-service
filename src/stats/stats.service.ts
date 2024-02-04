import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants/constants';
import { CreateStatsDto } from './dto/create-stats.dto';

@Injectable()
export class StatsService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async getUrlStats(url: string) {
    const res = await this.conn.query('SELECT * FROM URLStats WHERE url = $1', [
      url,
    ]);
    return res.rows;
  }

  async getUrlStatsTop10(url: string) {
    const res = await this.conn.query(
      'SELECT count(*) as count, url FROM URLStats WHERE url = $1 GROUP BY url ORDER BY count DESC LIMIT 10',
      [url],
    );
    return res.rows;
  }

  async recordUrlStat(url: CreateStatsDto) {
    await this.conn.query(
      'INSERT INTO URLStats (short_url, original_url, ip_address, user_agent, created_at) VALUES ($1, $2, $3, $4, NOW())',
      [url.shortUrl, url.url, url.ipAddress, url.userAgent],
    );
  }
}
