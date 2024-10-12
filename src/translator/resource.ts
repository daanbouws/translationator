import { inject } from "../utils/inject.js";
import { TRANSLATIONS, Translations } from './store.js';

export class TranslationResource {

  store = inject(TRANSLATIONS)

  initializeResourceWith(translations: Translations){
    this.store.initializeWith(translations)
  }

  writeToResource(translations: Translations) {
    this.store.setTranslations(translations)
  }
}
