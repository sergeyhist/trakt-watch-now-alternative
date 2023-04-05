const { readFileSync } = require('fs');

/**
 * @param {string} headersLocation
 * @returns {import('../types').UserscriptMetadata}
 */
const ReadJSON = (headersLocation) => {
  try {
    const headersRaw = readFileSync(headersLocation).toString();
    return JSON.parse(headersRaw);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
    return null;
  }
};

/**
 * @param {import('../types').WebpackUserscriptPluginOptions['headers']} headersFromOptions
 * @returns {import('../types').UserscriptMetadata}
 */
const LoadHeaders = (headersFromOptions) => {
  if (!headersFromOptions) throw new Error('Headers must be string or UserscriptMetadata');

  const metadata = typeof headersFromOptions === 'string' ? ReadJSON(headersFromOptions) : headersFromOptions;
  if (!metadata || typeof metadata !== 'object') throw new Error('Metadata/Headers must be an object');

  if (!metadata.name) metadata.name = process.env.npm_package_name;
  if (!metadata.version) metadata.version = process.env.npm_package_version;

  return metadata;
};

module.exports = LoadHeaders;
