import {Translator} from "../translator/translator.js";

const t = new Translator('my-example-key', {
  defaultValue: 'my example'
})

console.log(t.translate())
