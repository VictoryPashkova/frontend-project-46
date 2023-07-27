import _ from 'lodash';

const buildTree = (fileData1, fileData2) => {
  const keys = _.union(_.keys(fileData1), _.keys(fileData2));
  const sortedKeys = _.sortBy(keys);

  const comparisonTree = sortedKeys.map((key) => {
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
        value: fileData2[key],
        status: 'added',
      };
    } if (!_.has(fileData2, key)) {
      return {
        key,
        value: fileData1[key],
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
      value: fileData1[key],
      status: 'unchanged',
    };
  });
  return _.uniq(comparisonTree);
};

export default buildTree;
