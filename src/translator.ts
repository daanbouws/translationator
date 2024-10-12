import { translationsStore } from "./store.js";

export class Translator {

  key: string

  constructor(translationKey: string = '') {
    this.key = translationKey
  }

  translate() {
    return translationsStore.translations.get(this.key) || ''
  }
}
