import _ from 'lodash';

const doubleSpace = '  ';
const makeSpace = (level) => {
  const replacer = ' ';
  const spacesCount = 4;
  return replacer.repeat((level * spacesCount) - 2);
};

const stringify = (data, level) => {
  if (!_.isPlainObject(data)) {
    return `${data}`;
  }
  const keys = Object.entries(data);
  const result = keys.map(([key, value]) => `${makeSpace(level + 1)}${doubleSpace}${key}: ${stringify(value, level + 1)}`);
  const format = `{\n${result.join('\n')}\n${makeSpace(level)}${doubleSpace}}`;
  return format;
};

const stylish = (data, level = 1) => {
  const lines = data.map(({ status, key, value, oldValue, newValue, children }) => {
    switch (status) {
      case 'added':
        return `${makeSpace(level)}+ ${key}: ${stringify(value, level)}`;
      case 'deleted':
        return `${makeSpace(level)}- ${key}: ${stringify(value, level)}`;
      case 'changed':
        return `${makeSpace(level)}- ${key}: ${stringify(oldValue, level)}\n${makeSpace(level)}+ ${key}: ${stringify(newValue, level)}`;
      case 'unchanged':
        return `${makeSpace(level)}${doubleSpace}${key}: ${stringify(value, 1)}`;
      case 'nested':
        return `${makeSpace(level)}${doubleSpace}${key}: ${stylish(children, level + 1)}`;
      default:
        return 'Error';
    }
  });

  const result = _.uniq(lines);
  return `{\n${result.join('\n')}\n${makeSpace(level).slice(2)}}`;
};

export default stylish;
