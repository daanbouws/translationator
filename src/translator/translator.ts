import { TRANSLATIONS } from './store.js';
import { inject } from '../utils/inject.js';

type TranslatorOptionsBase = {
  defaultValue: string,
  [key: string]: any;
}

type SingularTranslateOptions = {
  count?: never;
  defaultPlural?: never;
}

type PluralTranslateOptions = {
  count: number;
  defaultPlural: string;
}

export type TranslatorOptions = TranslatorOptionsBase & (SingularTranslateOptions | PluralTranslateOptions)

export class Translator {
  store = inject(TRANSLATIONS);
  key: string;
  options: TranslatorOptions;

  constructor(
    translationKey: string = '',
    options: TranslatorOptions,
  ) {
    if (options.count && options.count > 1) {
      this.key = `${translationKey}_plural`
    } else {
      this.key = translationKey;
    }

    this.options = options
  }

  private interpolate = (variable: string, options: TranslatorOptions): string => {
    return variable.replace(
      /{{(\w*)}}/g,
      (_, key) => Object.hasOwn(options, key) ? options[key] : ''
    )
  }

  translate(): string {
    return this.interpolate(
      this.store.translations.get(this.key) || this.options.defaultValue,
      this.options
    )
  }
}
