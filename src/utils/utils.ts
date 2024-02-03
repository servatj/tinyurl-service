import crypto from 'crypto';

export function generateShortUrl(originalUrl) {
  const hash = crypto.createHash('md5').update(originalUrl).digest('hex');
  const encode = base62Encode(hash);
  return encode ? encode.substring(0, 7) : '';
}

export function base62Encode(text) {
  const base62chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  let num = parseInt(Buffer.from(text).toString('hex'), 16);

  if (num === 0) return '0';

  while (num > 0) {
    result = base62chars[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result;
}

export function base62Decode(str) {
  const base62chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    result = result * 62 + base62chars.indexOf(str[i]);
  }
  return Buffer.from(result.toString(16), 'hex').toString('utf-8');
}

// const originalUrl = 'https://www.example.com/long-url-path';
// const shortUrlKey = generateShortUrl(originalUrl);
// console.log(shortUrlKey);
