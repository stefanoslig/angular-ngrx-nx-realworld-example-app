import { describe, it, expect } from 'vitest';
import { readingTimeMinutes } from './reading-time';

describe('readingTimeMinutes', () => {
  it('returns 1 for empty input (minimum 1 minute)', () => {
    expect(readingTimeMinutes('')).toBe(1);
    expect(readingTimeMinutes('   ')).toBe(1);
  });

  it('returns 1 for very short text', () => {
    expect(readingTimeMinutes('Hello world')).toBe(1);
  });

  it('computes minutes at 200 words per minute', () => {
    const text = Array.from({ length: 200 }, () => 'word').join(' ');
    expect(readingTimeMinutes(text)).toBe(1);
  });

  it('rounds up (ceiling) for partial minutes', () => {
    const text = Array.from({ length: 201 }, () => 'word').join(' ');
    expect(readingTimeMinutes(text)).toBe(2);
  });

  it('handles multi-paragraph prose', () => {
    // 600 words spread across paragraphs.
    const paragraph = Array.from({ length: 200 }, () => 'word').join(' ');
    const text = [paragraph, paragraph, paragraph].join('\n\n');
    expect(readingTimeMinutes(text)).toBe(3);
  });

  it('ignores markdown formatting characters when counting words', () => {
    // 4 words regardless of markdown noise.
    expect(readingTimeMinutes('**Hello** _world_ # heading')).toBe(1);
  });

  it('treats null/undefined input as empty (returns 1)', () => {
    expect(readingTimeMinutes(null as unknown as string)).toBe(1);
    expect(readingTimeMinutes(undefined as unknown as string)).toBe(1);
  });
});
