/**
 * @param {{ name: string, value: string | string[], max?: number, pretty?: boolean }} params
 * @returns {string}
 */
const BuildLine = ({ name, value, max, pretty }) =>
  Array.isArray(value)
    ? value.map((subvalue) => BuildLine({ name, value: subvalue, max, pretty })).join('\n')
    : pretty && max
    ? `// @${name.padEnd(max + 1, ' ')}${value}`
    : `// @${name} ${value}`;

/**
 * @param {import('../types').UserscriptMetadata} meta
 * @param {import('../types').WebpackUserscriptPluginOptions['pretty']} [pretty]
 * @returns {string}
 */
const StringifyMetadata = (meta, pretty = true) => {
  if (typeof meta !== 'object') throw new Error('Metadata must be an object');

  const fieldNameMaxLength = Object.keys(meta)
    .map((fieldName) => fieldName.length)
    .reduce((previous, current) => (previous > current ? previous : current));

  const body = Object.keys(meta)
    .map((fieldName) =>
      BuildLine({
        name: fieldName,
        value: meta[fieldName],
        max: fieldNameMaxLength,
        pretty,
      })
    )
    .join('\n');

  return `// ==UserScript==\n${body}\n// ==/UserScript==\n`;
};

module.exports = StringifyMetadata;
