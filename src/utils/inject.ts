const injectablesMap = new Map();

type EmptyConstructor<T = any> = new () => T;

export function register(key: symbol) {
  return (constructor: EmptyConstructor) => {
    injectablesMap.set(key, new constructor());
  };
}

export function inject(key: symbol) {
  return injectablesMap.get(key);
}
