export function isZero(x) {
  return x === 0;
}

export function isEven(x) {
  return isZero(x % 2);
}

export function isLocalURL(url, base) {
  return new URL(url, base).origin === base;
}