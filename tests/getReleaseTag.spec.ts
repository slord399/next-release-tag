import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import getReleaseTag from '../src/services/releaseService';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.resetAllMocks();
});

describe('test with prefix', () => {
  it.each([
    [undefined],
    [null],
    ['abc'],
    ['1.0.0'],
    ['22.1.6'],
    ['v'],
    ['v2'],
    ['v2.1'],
    ['v2.1.1.5'],
    ['v22.11.3-beta'],
  ])(
    'should return first version when invalid version is passed',
    (input: string | null | undefined) => {
      vi.setSystemTime(new Date('2022-10-13'));
      expect(getReleaseTag('v', input)).toBe('v20221012.1');
    }
  );

  it('should throw exception when malformed version is passed', () => {
    vi.setSystemTime(new Date('2022-10-13'));
    expect(getReleaseTag('v', 'v2.1')).toBe('v20221012.1');
  });

  it('should return version with same month and year with incremented iteration', () => {
    vi.setSystemTime(new Date('2022-11-24'));
    expect(getReleaseTag('v', 'v20221123.5')).toBe('v20221123.6');
  });

  it.each([['v20221001.23'], ['v20220201.21']])(
    'should return version with reset iteration, current month and same year',
    (input: string | null | undefined) => {
      vi.setSystemTime(new Date('2022-11-24'));
      expect(getReleaseTag('v', input)).toBe('v20221123.1');
    }
  );

  it.each([['v20221201.2'], ['v20200501.14']])(
    'should return version with reset iteration, current month and year',
    (input: string | null | undefined) => {
      vi.setSystemTime(new Date('2023-01-02'));
      expect(getReleaseTag('v', input)).toBe('v20230101.1');
    }
  );

  it('should handle multiple dots in iteration part', () => {
    vi.setSystemTime(new Date('2022-11-24'));
    expect(getReleaseTag('v', 'v20221123.1.5')).toBe('v20221123.16');
  });
});

describe('test without prefix', () => {
  it.each([
    [undefined],
    [null],
    ['1.0.0'],
    ['v22.1.6'],
    ['v'],
    ['2'],
    ['2.1'],
    ['2.1.1.5'],
    ['22.11.3-beta'],
  ])(
    'should return first version when invalid version is passed',
    (input: string | null | undefined) => {
      vi.setSystemTime(new Date('2022-10-13'));
      expect(getReleaseTag('', input)).toBe('20221012.1');
    }
  );

  it('should not throw exception when malformed version is passed', () => {
    vi.setSystemTime(new Date('2022-10-13'));
    expect(getReleaseTag('', '2.1')).toBe('20221012.1');
  });

  it('should return version with same month and year with incremented iteration', () => {
    vi.setSystemTime(new Date('2022-11-24'));
    expect(getReleaseTag('', '20221123.5')).toBe('20221123.6');
  });

  it.each([['20221023'], ['20220201']])(
    'should return version with reset iteration, current month and same year',
    (input: string | null | undefined) => {
      vi.setSystemTime(new Date('2022-11-24'));
      expect(getReleaseTag('', input)).toBe('20221123.1');
    }
  );

  it.each([['20221201.2'], ['20200514.1']])(
    'should return version with reset iteration, current month and year',
    (input: string | null | undefined) => {
      vi.setSystemTime(new Date('2023-01-02'));
      expect(getReleaseTag('', input)).toBe('20230101.1');
    }
  );

  it.each([['prod-20221201.2'], ['prod-20200514.1']])(
    'should return version with reset iteration, current month and year',
    (input: string | null | undefined) => {
      vi.setSystemTime(new Date('2023-01-02'));
      expect(getReleaseTag('prod-', input)).toBe('prod-20230101.1');
    }
  );

  it('should return version with same month and year with incremented iteration', () => {
    vi.setSystemTime(new Date('2022-11-24'));
    expect(getReleaseTag('prod-', 'prod-20221123.5')).toBe('prod-20221123.6');
  });
});
