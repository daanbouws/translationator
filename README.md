environment agnostic translation solution with 0 dependencies.

exposes a Translator object, a TranslationResource object and a scan executable.

1.Translator object
The translator object lets you create a new translatable. It takes a configuration in its constructor and will be picked up by scan to generate a translation template

```
  const t = new Translator('simple-key', {
    defaultValue: 'simple',
  });
```

2. A TranslationResource object
   The translation resource object lets you write translations to the store that the translator object looks in.
   The idea being that you fill in the generated translation template to create translations, which you load in again with this resource.

```
  const setter = new TranslationResource();
  setter.initializeResourceWith({
    'simple-key': 'not simple',
  });
  const t = new Translator('simple-key', {
    defaultValue: 'simple',
  });
  console.log(t.translate()) // 'not simple'
```

4. A scan executable
   This scripts, meant to be included in the consumer's pipeline scans code looking for Translator constructors.
   It collects the parameters to the constructor and pieces them together to generate a translation template

```
  npm run scan
```
