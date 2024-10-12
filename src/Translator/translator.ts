import { TRANSLATIONS } from './store.js';
import { inject } from '../utils/inject.js';

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
