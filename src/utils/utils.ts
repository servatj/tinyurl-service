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
