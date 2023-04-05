const { basename, extname, resolve } = require('path');
const { writeFile } = require('fs/promises');
const { Compilation, version: webpackVersion } = require('webpack');
const { RawSource } = require('webpack-sources');
const LoadHeaders = require('./util/load-headers.js');
const StringifyMetadata = require('./util/stringify-metadata.js');

class WebpackUserscriptPlugin {
  /** @type {import('./types').WebpackUserscriptPluginOptions} */
  static DEFAULT_OPTIONS = {
    pretty: true,
    metajs: false,
  };

  pluginName = WebpackUserscriptPlugin.name;

  /** @type {import('./types').WebpackUserscriptPluginOptions} */
  config = {};

  /** @param {import('./types').WebpackUserscriptPluginOptions} options */
  constructor(options) {
    if (!options || typeof options !== 'object') throw new TypeError('Options must be and object');

    this.config = {
      ...WebpackUserscriptPlugin.DEFAULT_OPTIONS,
      ...options,
    };

    if (!this.config.headers) throw new Error('Headers field in option is required');
  }

  /** @param {import('webpack').Compiler} compiler */
  apply(compiler) {
    const metadata = LoadHeaders(this.config.headers);
    const builtMetadata = StringifyMetadata(metadata, this.config.pretty);

    if (/^4\./.test(webpackVersion)) this.version4(compiler, builtMetadata);
    else if (/^5\./.test(webpackVersion)) this.version5(compiler, builtMetadata);
    else throw new Error(`Webpack version ${webpackVersion} is not supported`);
  }

  /**
   * @param {import('webpack').Compiler} compiler
   * @param {string} builtMetadata
   * @returns {void}
   */
  version4(compiler, builtMetadata) {
    compiler.hooks.emit.tap(this.pluginName, (compilation) => {
      compilation.chunks.forEach((chunk) => {
        /** Exit if non-entry */
        if (!chunk.canBeInitial()) return;

        chunk.files.forEach((filename) => {
          if (extname(filename) !== '.js') return;

          /** Prepending user script data to compiled */
          compilation.assets[filename] = new RawSource(
            `${builtMetadata}\n${compilation.assets[filename].source().toString()}`
          );

          if (this.config.metajs) {
            const outputFileBasename = basename(compilation.outputOptions.filename);
            const metajsBasename = outputFileBasename.replace(/(\.user)?\.js$/i, '.meta.js');

            compilation.assets[metajsBasename] = new RawSource(builtMetadata);
          }
        });
      });
    });
  }

  /**
   * @param {import('webpack').Compiler} compiler
   * @param {string} builtMetadata
   */
  version5(compiler, builtMetadata) {
    if (this.config.metajs)
      compiler.hooks.afterEmit.tapPromise(this.pluginName, (compilation) => {
        const outputDirectory = compilation.outputOptions.path;
        const outputFileBasename = basename(compilation.outputOptions.filename);
        const metajsBasename = outputFileBasename.replace(/(\.user)?\.js$/i, '.meta.js');
        const metajsAbsoluteFilename = resolve(outputDirectory, metajsBasename);

        return writeFile(metajsAbsoluteFilename, builtMetadata).catch((error) => compilation.errors.push(error));
      });

    compiler.hooks.compilation.tap(this.pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this.pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
        },
        () => {
          compilation.chunks.forEach((chunk) => {
            /** Exit if non-entry */
            if (!chunk.canBeInitial()) return;

            chunk.files.forEach((filename) => {
              if (extname(filename) !== '.js') return;

              /** Prepending user script data to compiled */
              compilation.updateAsset(filename, (old) => new RawSource(`${builtMetadata}\n${old.source().toString()}`));
            });
          });
        }
      );
    });
  }
}

module.exports = WebpackUserscriptPlugin;
