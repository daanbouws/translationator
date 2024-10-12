class TranslationStore {

  translations: Map<string, string> = new Map()

  initializeWith(translations: Record<string, string>) {
    for (const translation in translations) {
      const exists = this.translations.get(translation) != undefined
      if (exists) continue
      this.translations.set(translation, translations[translation] || '')
    }
  }
}

export const translationsStore = new TranslationStore()
