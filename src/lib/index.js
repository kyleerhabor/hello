// place files you want to import through the `$lib` alias in this folder.
export function identity(x) {
  return x;
}

export function isZero(n) {
  return n === 0;
}

export function isEven(n) {
  return isZero(n % 2);
}

export function isLocalURL(url, base) {
  return new URL(url, base).origin === base;
}

export function key(key, coll) {
  return coll.reduce((obj, element) => ({ ...obj, [key(element)]: element }), {});
}

export function unique(transform = identity, coll) {
  const result = coll.reduce((obj, element) => {
    const s = transform(element);

    if (obj.set.has(s)) {
      return obj;
    }

    obj.set.add(s);
    obj.items.push(element);

    return obj;
  }, {
    items: [],
    set: new Set()
  });

  return result.items;
}
