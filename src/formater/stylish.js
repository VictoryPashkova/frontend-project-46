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

const stylish = (data, level = 1) => {
  const lines = data.map(({ status, key, value, oldValue, newValue, children }) => {
    switch (status) {
      case 'added':
        return `${makeIndent(level)}+ ${key}: ${stringify(value, level)}`;
      case 'deleted':
        return `${makeIndent(level)}- ${key}: ${stringify(value, level)}`;
      case 'changed':
        return `${makeIndent(level)}- ${key}: ${stringify(oldValue, level)}\n${makeIndent(level)}+ ${key}: ${stringify(newValue, level)}`;
      case 'unchanged':
        return `${makeIndent(level)}${doubleIndent}${key}: ${stringify(value, 1)}`;
      case 'nested':
        return `${makeIndent(level)}${doubleIndent}${key}: ${stylish(children, level + 1)}`;
      default:
        return `Error: unknowen status ${status}`;
    }
  });

  const result = _.uniq(lines);
  return `{\n${result.join('\n')}\n${makeIndent(level).slice(2)}}`;
};

export default stylish;
