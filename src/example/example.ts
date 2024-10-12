import {Translator} from "../translator/translator.js";

const t = new Translator('my-example-key', {
  defaultValue: 'Hello {{name}}!',
  name: "World"
})

console.log(t.translate())
