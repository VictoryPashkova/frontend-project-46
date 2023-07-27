import _ from 'lodash';

const returnComplexValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const makePlainFormat = (tree) => {
  const iter = (data, path = [data.key]) => {
    const lines = data.flatMap(({
      key, value, oldValue, newValue, children, status,
    }) => {
      switch (status) {
        case 'added':
          return `Property '${[...path, key].join('.')}' was ${status} with value: ${returnComplexValue(value)}`;
        case 'updated':
          return `Property '${[...path, key].join('.')}' was ${status}. From ${returnComplexValue(oldValue)} to ${returnComplexValue(newValue)}`;
        case 'removed':
          return `Property '${[...path, key].join('.')}' was ${status}`;
        case 'unchanged':
          return [];
        case 'nested':
          return iter(children, [...path, key]);
        default:
          return [];
      }
    });
    return lines.join('\n');
  };
  return iter(tree, []);
};

export default makePlainFormat;
