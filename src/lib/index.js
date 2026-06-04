export function isEven(x) {
  return x % 2 === 0;
}

export function isLocalURL(url, base) {
  return new URL(url, base).origin === base;
}