window.injectablesMap = new Map();

type EmptyConstructor<T = any> = new () => T;

export function register(key: symbol) {
  return (constructor: EmptyConstructor) => {
    window.injectablesMap.set(key, new constructor());
  };
}

export function inject(key: symbol) {
  return window.injectablesMap.get(key);
}

declare global {
interface Window {
    injectablesMap
  }
}
