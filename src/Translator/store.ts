import { register } from '../utils/inject.js';

export const TRANSLATIONS = Symbol('TRANSLATIONS');

type TranslationsSet = Record<string, string>;

@register(TRANSLATIONS)
class TranslationStore {
  translations: Map<string, string> = new Map();

  initializeWith(translations: TranslationsSet) {
    for (const translation in translations) {
      const exists = this.translations.get(translation) != undefined;
      if (exists) continue;
      this.translations.set(translation, translations[translation] || '');
    }
  }

  setTranslations(translations: TranslationsSet) {
    for (const translation in translations) {
      this.translations.set(translation, translations[translation] || '');
    }
  }
}
