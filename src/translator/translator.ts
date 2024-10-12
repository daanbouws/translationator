import { TRANSLATIONS } from './store.js';
import { inject } from '../utils/inject.js';

export class Translator {
  store = inject(TRANSLATIONS);
  key: string;
  defaultValue: string;

  constructor(
    translationKey: string = '',
    defaultValue: string,
  ) {
    this.key = translationKey;
    this.defaultValue = defaultValue
  }

  translate() {
    return this.store.translations.get(this.key) || this.defaultValue;
  }
}
