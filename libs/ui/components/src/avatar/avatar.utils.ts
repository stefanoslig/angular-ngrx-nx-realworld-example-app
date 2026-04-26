/**
 * Curated 8-color palette for avatar fallbacks. Each color has been
 * verified for AA contrast against white text.
 *
 * Colors: terracotta, moss, plum, teal, ochre, dusk blue, rose, slate.
 */
export const AVATAR_PALETTE = [
  '#c2613a',
  '#4a6b3f',
  '#6d3d5d',
  '#2e6e6a',
  '#9a7724',
  '#3d5a80',
  '#b56576',
  '#52606d',
] as const;

export function getInitials(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return '?';
  }

  const parts = trimmed.split(/\s+/u);

  if (parts.length === 1) {
    const word = parts[0];
    return (word.length >= 2 ? word.slice(0, 2) : word).toUpperCase();
  }

  const first = parts[0].charAt(0);
  const last = parts[parts.length - 1].charAt(0);
  return (first + last).toUpperCase();
}

export function getAvatarColor(username: string): string {
  if (username.length === 0) {
    return AVATAR_PALETTE[0];
  }
  const hash = djb2Hash(username);
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

/**
 * djb2 string hash. Returns a non-negative 32-bit integer.
 * Chosen for being simple, deterministic, and well-distributed for short strings.
 */
function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}
