import { Translator } from './translator.js';
import { test, expect } from 'vitest';
import { TRANSLATIONS } from './store.js';
import { inject } from '../utils/inject.js';

test('defaults to empty string', () => {
  const t = new Translator('', '');
  expect(t.translate()).to.equal('');
});

test('translate', () => {
  const translationsStore = inject(TRANSLATIONS);
  translationsStore.initializeWith({
    'some-trans-key': 'some other translation',
  });
  const t = new Translator('some-trans-key', '');
  expect(t.translate()).to.equal('some other translation');
});

test('can overwrite translations', () => {
  const t = new Translator('my-key', '');
  expect(t.translate()).to.equal('');

  const translationsStore = inject(TRANSLATIONS);
  translationsStore.initializeWith({
    'my-key': 'lobsters',
  });
  expect(t.translate()).to.equal('lobsters');

  translationsStore.setTranslations({
    'my-key': 'mobsters',
  })
  expect(t.translate()).to.equal('mobsters');
})

test('can provide a default', () => {
  const t = new Translator('my-unique-key', 'a unique default text')
  expect(t.translate()).to.equal('a unique default text')
})
