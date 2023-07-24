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
  const result = entries.map(([key, value]) => `${makeSpace(level + 4)}${key}: ${stringify(value, level + 2)}`);
  const format = ['{', ...result, `  ${makeSpace(level + 1)}}`].join('\n');

  return format;
};

const stylish = (comperedData) => {
  const line = ({
    key,
    children,
    value,
    oldValue,
    newValue,
    status,
  }, level) => {
    if (status === 'nested') {
      const nestedLines = stylish(_.sortBy(children), level + 1);
      return [`${makeSpace(level)}${key}: {`, ...nestedLines, `${makeSpace(level)}}`];
    } if (status === 'added') {
      return `${makeSpace(level)}  + ${key}: ${stringify(value, level)}`;
    } if (status === 'deleted') {
      return `${makeSpace(level)}  - ${key}: ${stringify(value, level)}`;
    } if (status === 'changed') {
      return `${makeSpace(level)}  - ${key}: ${stringify(oldValue, level)}\n${makeSpace(level)}  + ${key}: ${stringify(newValue, level)}`;
    } if (status === 'unchanged') {
      return `${makeSpace(level + 2)}${key}: ${stringify(value, level)}`;
    }
  };
  return comperedData.flatMap((node) => line(node, 2));
};

export default stylish;
