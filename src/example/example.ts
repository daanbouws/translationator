import { Translator } from '../translator/translator.js';

const t = new Translator('simple-key', {
  defaultValue: 'simple',
});

const t2 = new Translator('my-example-key', {
  defaultValue: 'Hello {{name}}!, can you count to {{count}}?',
  defaultPlural: 'Hello group of {{name}}s!, can you count to {{count}}?',
  name: 'Daan',
  count: 17,
});

console.log(t.translate());
console.log(t2.translate());
