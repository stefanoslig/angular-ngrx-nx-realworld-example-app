import { describe, it, expect } from 'vitest';
import { getInitials, getAvatarColor, AVATAR_PALETTE } from './avatar.utils';

describe('getInitials', () => {
  it('returns first letter of first and last word for two-word names', () => {
    expect(getInitials('Eleanor Vance')).toBe('EV');
    expect(getInitials('Daniel Park')).toBe('DP');
  });

  it('returns first two letters for single-word usernames', () => {
    expect(getInitials('eleanor')).toBe('EL');
    expect(getInitials('a')).toBe('A');
  });

  it('returns first letter of first word + first letter of last word for 3+ word names', () => {
    expect(getInitials('Mary Jane Watson')).toBe('MW');
    expect(getInitials('Jean-Luc Picard de la Forge')).toBe('JF');
  });

  it('uppercases the result', () => {
    expect(getInitials('alice bob')).toBe('AB');
  });

  it('returns ? for empty or whitespace-only input', () => {
    expect(getInitials('')).toBe('?');
    expect(getInitials('   ')).toBe('?');
  });

  it('handles leading/trailing whitespace', () => {
    expect(getInitials('  Eleanor Vance  ')).toBe('EV');
  });

  it('handles non-ASCII characters', () => {
    expect(getInitials('Émile Zöe')).toBe('ÉZ');
  });
});

describe('getAvatarColor', () => {
  it('returns the same color for the same username (deterministic)', () => {
    expect(getAvatarColor('eleanor')).toBe(getAvatarColor('eleanor'));
    expect(getAvatarColor('Eleanor Vance')).toBe(getAvatarColor('Eleanor Vance'));
  });

  it('returns a color from the curated palette', () => {
    const result = getAvatarColor('eleanor');
    expect(AVATAR_PALETTE).toContain(result);
  });

  it('distributes across the palette for varied inputs', () => {
    const inputs = ['alice', 'bob', 'carol', 'dan', 'eve', 'frank', 'grace', 'henry', 'iris', 'jack'];
    const colors = new Set(inputs.map(getAvatarColor));
    // With 10 different inputs over an 8-color palette, expect at least 4 distinct hits.
    expect(colors.size).toBeGreaterThanOrEqual(4);
  });

  it('returns the first palette color for empty input (deterministic fallback)', () => {
    expect(getAvatarColor('')).toBe(AVATAR_PALETTE[0]);
  });

  it('palette has exactly 8 colors', () => {
    expect(AVATAR_PALETTE).toHaveLength(8);
  });
});
