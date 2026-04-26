const WORDS_PER_MINUTE = 200;

/**
 * Estimate reading time in whole minutes at 200 wpm, floored to minimum 1.
 * Markdown formatting noise (#, *, _, `, ~, >, -) is stripped before word-counting.
 */
export function readingTimeMinutes(text: string | null | undefined): number {
  if (!text) {
    return 1;
  }
  const cleaned = text.replace(/[#*_`~>-]+/g, ' ').trim();
  if (cleaned.length === 0) {
    return 1;
  }
  const wordCount = cleaned.split(/\s+/u).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
