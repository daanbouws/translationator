import { Translator } from './translator.js';
import { test, expect } from 'vitest';
import { TranslationResource } from './resource.js';

test('defaults to empty string', () => {
  const t = new Translator('', { defaultValue: '' });
  expect(t.translate()).to.equal('');
});

test('translate', () => {
  const setter = new TranslationResource();
  setter.initializeResourceWith({
    'some-trans-key': 'some other translation',
  });
  const t = new Translator('some-trans-key', { defaultValue: '' });
  expect(t.translate()).to.equal('some other translation');
});

test('can overwrite translations', () => {
  const t = new Translator('my-key', { defaultValue: '' });
  expect(t.translate()).to.equal('');

  const setter = new TranslationResource();
  setter.initializeResourceWith({
    'my-key': 'lobsters',
  });
  expect(t.translate()).to.equal('lobsters');

  setter.writeToResource({
    'my-key': 'mobsters',
  });
  expect(t.translate()).to.equal('mobsters');
});

test('can provide a default', () => {
  const t = new Translator('my-unique-key', {
    defaultValue: 'a unique default text',
  });
  expect(t.translate()).to.equal('a unique default text');
});

test('supports interpolation', () => {
  const t = new Translator('greet-me', {
    defaultValue: 'Hello {{name}}',
    name: 'Daan',
  });
  expect(t.translate()).to.equal('Hello Daan');
});

test('support pluralization', () => {
  const setter = new TranslationResource();
  setter.initializeResourceWith({
    'orange-counter': '{{count}} apple',
    'orange-counter_plural': '{{count}} apples',
  });

  const t = new Translator('orange-counter', {
    defaultValue: '{{count}} orange',
    defaultPlural: '{{count}} oranges',
    count: 2,
  });

  expect(t.translate()).to.equal('2 apples');
});
