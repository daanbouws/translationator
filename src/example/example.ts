import { Translator } from '../translator/translator.js';

const t = new Translator('my-example-key', {
  defaultValue: 'Hello {{name}}!, can you count to {{count}}?',
  defaultPlural: 'Hello group of {{name}}s!, can you count to {{count}}?',
  name: 'Daan',
  count: 17,
});

console.log(t.translate());
