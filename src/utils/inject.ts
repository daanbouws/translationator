const injectablesMap: Map<symbol, any> = new Map();

type EmptyConstructor<T = any> = new () => T;

export function register(key: symbol) {
  return (constructor: EmptyConstructor) => {
    injectablesMap.set(key, new constructor());
  };
}

export function inject(key: symbol) {
  const module = injectablesMap.get(key);
  if (module == undefined) {
    throw new Error(`cant find module for ${key.toString()}`);
  }

  return module;
}
