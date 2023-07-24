import _ from 'lodash';

const makeSpace = (level) => {
  const space = '  ';
  return space.repeat(level);
};

const stylish = (comperedData) => {
  const iter = (node, level) => {
    if (node.status === 'nested') {
      const nestedLines = stylish(node.children, level + 1);
      return [`${node.key} {`, ...nestedLines, `${makeSpace(level)} }`];
    } if (node.status === 'added') {
      return `${makeSpace(level)}+ ${node.key}: ${node.value}`;
    } if (node.status === 'deleted') {
      return `${makeSpace(level)}- ${node.key}: ${node.value}`;
    } if (node.status === 'changed') {
      return `${makeSpace(level)}- ${node.key}: ${node.oldValue} \n  + ${node.key}: ${node.newValue}`;
    } return `${makeSpace(level)}${node.key}: ${node.value}`;
  };
  return comperedData.flatMap((node) => iter(node, 0));
};

export default stylish;
