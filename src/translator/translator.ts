import { TRANSLATIONS } from './store.js';
import { inject } from '../utils/inject.js';

export type TranslatorOptions = {
  defaultValue: string,
  [key: string]: any;
}

export class Translator {
  store = inject(TRANSLATIONS);
  key: string;
  options: TranslatorOptions;

  constructor(
    translationKey: string = '',
    options: TranslatorOptions,
  ) {
    this.key = translationKey;
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
