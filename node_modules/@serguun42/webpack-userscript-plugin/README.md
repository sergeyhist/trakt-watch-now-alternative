# Webpack Userscript Plugin

Appends generated script with Userscript metadata. Continuation of [`serguun42-webpack-userscript`](https://github.com/serguun42/serguun42-webpack-userscript) which itself was a fork of [webpack-userscript package by MomoCow](https://github.com/momocow/webpack-userscript). Supports webpack of versions 4+ and 5+.

## Usage

Suitable for _webpack v4_ and _webpack v5_. From `package.json`:

```json
"peerDependencies": {
  "webpack": "^4.0.0 || ^5.0.0"
}
```

1. Install – `npm i @serguun42/webpack-userscript-plugin`.
2. Add to webpack config's plugins section (_usually `webpack.config.js`_):

```javascript
const WebpackUserscriptPlugin = require("@serguun42/webpack-userscript-plugin");

module.exports = {
  entry: "…",
  output: {
    path: "…",
    filename: "…",
  },
  …
  plugins: [
    …,
    new WebpackUserscriptPlugin(pluginOption),
    …
  ]
}
```

### Config/params

Add plugin with constructor:

```javascript
new WebpackUserscriptPlugin(pluginOption);
```

Where `pluginOption` is object of type [`WebpackUserscriptPluginOptions`](./types/index.d.ts#L37) with following props:

| name      | description/type                                                                                                                          | default      |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `headers` | `string` for location of `.json` file with headers or object with metadata fields (of type [`UserscriptMetadata`](./types/index.d.ts#L3)) | **required** |
| `pretty`  | Prettify headers with even space or not                                                                                                   | `true`       |
| `metajs`  | Create additional `.meta.js` file (in the same output directory) with headers only                                                        | `false`      |

---

### See also

- [Tampermonkey documentation](https://www.tampermonkey.net/documentation.php)
- [Metadata block for Violentmonkey](https://violentmonkey.github.io/api/metadata-block/)
- [Metadata block on greasespot.net](https://wiki.greasespot.net/Metadata_Block)
- [webpack-userscript package by MomoCow](https://github.com/momocow/webpack-userscript)
- [generate-file-webpack-plugin by kflGALORE](https://github.com/kflGALORE/generate-file-webpack-plugin/blob/master/src/index.ts#L24)
- [workbox by GoogleChrome](https://github.com/GoogleChrome/workbox/blob/v6/packages/workbox-webpack-plugin/src/generate-sw.ts#L110)

---

### [BSL-1.0 License](./LICENSE)
