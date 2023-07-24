import _ from 'lodash';

const makeSpace = (level) => {
  const space = '  ';
  return space.repeat(level);
};

const stringify = (data, level) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => `${makeSpace(level)}  ${key}: ${stringify(value, level + 1)}`);
  const format = ['{', ...result, `${makeSpace(level + 1)}}`].join('\n');

  return format;
};

const lines = (comperedData) => {
  const iter = ({
    key,
    children,
    value,
    oldValue,
    newValue,
    status,
  }, level) => {
    switch (status) {
      case 'nested':
        const nestedLines = lines(_.sortBy(children), level + 1);
        return [`${makeSpace(level)}${key}: {`, ...nestedLines, `${makeSpace(level)}}`];
      case 'added':
        return `${makeSpace(level)}+ ${key}: ${stringify(value, level)}`;
      case 'deleted':
        return `${makeSpace(level)}- ${key}: ${stringify(value, level)}`;
      case 'changed':
        return `${makeSpace(level)}- ${key}: ${stringify(oldValue, level)}\n${makeSpace(level)}+ ${key}: ${stringify(newValue, level)}`;
      case 'unchanged':
        return `${makeSpace(level + 2)}${key}: ${stringify(value, level + 1)}`;
      default:
        return 'Error';
    }
  };
  return comperedData.flatMap((node) => iter(node, 2));
};

export default lines;
