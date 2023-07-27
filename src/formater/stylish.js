import _ from 'lodash';

const doubleIndent = '  ';
const makeIndent = (level) => {
  const replacer = ' ';
  const indentCount = 4;
  return replacer.repeat((level * indentCount) - 2);
};

const stringify = (data, level) => {
  if (!_.isPlainObject(data)) {
    return `${data}`;
  }
  const keys = Object.entries(data);
  const result = keys.map(([key, value]) => `${makeIndent(level + 1)}${doubleIndent}${key}: ${stringify(value, level + 1)}`);
  const format = `{\n${result.join('\n')}\n${makeIndent(level)}${doubleIndent}}`;
  return format;
};

const sign = {
  added: '+ ', removed: '- ', updated: { from: '- ', to: '+ ' }, unchanged: doubleIndent, nested: doubleIndent,
};

const makeStylishFormat = (data, level = 1) => {
  const lines = data.map(({
    status, key, value, oldValue, newValue, children,
  }) => {
    switch (status) {
      case 'added':
        return `${makeIndent(level)}${sign.added}${key}: ${stringify(value, level)}`;
      case 'removed':
        return `${makeIndent(level)}${sign.removed}${key}: ${stringify(value, level)}`;
      case 'updated':
        return `${makeIndent(level)}${sign.updated.from}${key}: ${stringify(oldValue, level)}\n${makeIndent(level)}${sign.updated.to}${key}: ${stringify(newValue, level)}`;
      case 'unchanged':
        return `${makeIndent(level)}${sign.unchanged}${key}: ${stringify(value, 1)}`;
      case 'nested':
        return `${makeIndent(level)}${sign.nested}${key}: ${makeStylishFormat(children, level + 1)}`;
      default:
        return `Error: unknowen status ${status}`;
    }
  });

  return `{\n${lines.join('\n')}\n${makeIndent(level).slice(2)}}`;
};

export default makeStylishFormat;
