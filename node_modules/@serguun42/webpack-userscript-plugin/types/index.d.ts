import webpack from 'webpack';

export type UserscriptMetadata = {
  name?: string;
  namespace?: string;
  version?: string;
  author?: string;
  description?: string;
  homepage?: string;
  homepageURL?: string;
  website?: string;
  source?: string;
  icon?: string;
  iconURL?: string;
  defaulticon?: string;
  icon64?: string;
  icon64URL?: string;
  updateURL?: string;
  downloadURL?: string | 'none';
  installURL?: string;
  supportURL?: string;
  include?: string | string[];
  match?: string | string[];
  exclude?: string | string[];
  require?: string | string[];
  resource?: string | string[];
  connect?: string | string[];
  'run-at'?: 'document-start' | 'document-body' | 'document-end' | 'document-idle' | 'context-menu';
  grant?: string | string[] | 'none';
  webRequest?: string;
  noframes?: boolean;
  unwrap?: boolean;
  nocompat?: boolean | string;
  [field: string]: string | string[] | boolean | undefined;
};

export type WebpackUserscriptPluginOptions = {
  /** Location of `.json` file with headers or object with metadata fields */
  headers: UserscriptMetadata | string;
  /**
   * Prettify headers with even space or not
   * @default true
   */
  pretty?: boolean;
  /**
   * Create additional `.meta.js` file (in the same output directory) with headers only
   * @default false
   */
  metajs?: boolean;
};

export class WebpackUserscriptPlugin {
  static DEFAULT_OPTIONS: WebpackUserscriptPluginOptions;

  pluginName: string;

  config: WebpackUserscriptPluginOptions;

  constructor(options: WebpackUserscriptPluginOptions);

  apply(compiler: webpack.Compiler): void;

  version4(compiler: import('webpack').Compiler, builtMetadata: string): void;

  version5(compiler: import('webpack').Compiler, builtMetadata: string): void;
}

export = WebpackUserscriptPlugin;
