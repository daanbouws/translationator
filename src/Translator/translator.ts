import { inject } from './inject.js';
import { TRANSLATIONS } from './store.js';

export class Translator {
  store = inject(TRANSLATIONS);
  key: string;

  constructor(translationKey: string = '') {
    this.key = translationKey;
  }

  translate() {
    return this.store.translations.get(this.key) || '';
  }
}
