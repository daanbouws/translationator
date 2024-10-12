import { Translator } from './translator.js'
import { test, expect } from "vitest";
import {translationsStore} from "./store.js";

test("defaults to empty string", () => {
  const t = new Translator()
  expect(t.translate()).to.equal('');
});

test('translate', () => {
  translationsStore.initializeWith({
    'some-trans-key': 'some other translation',
  })
  const t = new Translator('some-trans-key')
  expect(t.translate()).to.equal('some other translation')
})
