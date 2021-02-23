export function generateRandomString(): string {
  return [...Array(16)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
}
