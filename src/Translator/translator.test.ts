import { Translator } from './translator.js';
import { test, expect } from 'vitest';
import { TRANSLATIONS } from './store.js';
import { inject } from '../utils/inject.js';

test('defaults to empty string', () => {
  const t = new Translator();
  expect(t.translate()).to.equal('');
});

test('translate', () => {
  const translationsStore = inject(TRANSLATIONS);
  translationsStore.initializeWith({
    'some-trans-key': 'some other translation',
  });
  const t = new Translator('some-trans-key');
  expect(t.translate()).to.equal('some other translation');
});
