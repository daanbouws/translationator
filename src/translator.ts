import { inject } from "./store.js";

export class Translator {

  store = inject('translations')
  key: string

  constructor(translationKey: string = '') {
    this.key = translationKey
  }

  translate() {
    return this.store.translations.get(this.key) || ''
  }
}
