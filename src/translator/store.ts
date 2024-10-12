import { register } from '../utils/inject.js';

export const TRANSLATIONS = Symbol('TRANSLATIONS');

export type Translations = Record<string, string>;

@register(TRANSLATIONS)
class TranslationStore {
  private translations: Map<string, string> = new Map();

  initializeWith(translations: Translations) {
    for (const translation in translations) {
      const exists = this.translations.get(translation) != undefined;
      if (exists) continue;
      this.translations.set(translation, translations[translation] || '');
    }
  }

  setTranslations(translations: Translations) {
    for (const translation in translations) {
      this.translations.set(translation, translations[translation] || '');
    }
  }
}
