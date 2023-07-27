import _ from 'lodash';

const buildTree = (fileData1, fileData2) => {
  const commonKeys = _.sortBy(_.uniq(Object.entries(fileData2).concat(Object.entries(fileData1))));

  const comparisonTree = commonKeys.map(([key, value]) => {
    if (_.isPlainObject(fileData1[key]) && _.isPlainObject(fileData2[key])) {
      return {
        key,
        children: buildTree(fileData1[key], fileData2[key]),
        status: 'nested',
      };
    }
    if (!_.has(fileData1, key)) {
      return {
        key,
        value,
        status: 'added',
      };
    } if (!_.has(fileData2, key)) {
      return {
        key,
        value,
        status: 'removed',
      };
    } if (fileData1[key] !== fileData2[key]) {
      return {
        key,
        oldValue: fileData1[key],
        newValue: fileData2[key],
        status: 'updated',
      };
    }
    return {
      key,
      value,
      status: 'unchanged',
    };
  });
  return comparisonTree;
};

export default buildTree;
