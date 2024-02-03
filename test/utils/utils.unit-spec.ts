// import { Test, TestingModule } from '@nestjs/testing';
import { base62Encode, base62Decode } from '../../src/utils/utils';

describe('base62Encode', () => {
  it('should encode a joe to base62', () => {
    const result = base62Encode('josep');
    expect(result).toBe('82Z3BL2');
  });

  it('should encode a jose to base62', () => {
    const result = base62Encode('jose');
    expect(result).toBe('1WQzgp');
  });
});

describe('base62Decode', () => {
  it('should decode a base62 to josep', () => {
    const result = base62Decode('82Z3BL2');
    expect(result).toBe('josep');
  });

  it('should decode a base62 to jose', () => {
    const result = base62Decode('1WQzgp');
    expect(result).toBe('jose');
  });
});
