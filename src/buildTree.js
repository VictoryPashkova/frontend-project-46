import _ from 'lodash';

const buildTree = (fileData1, fileData2) => {
  const keys = _.sortBy(_.uniq(Object.entries(fileData2).concat(Object.entries(fileData1))));

  const statuses = keys.map(([key, value]) => {
    if (_.isObject(fileData1[key]) && _.isObject(fileData2[key]) && !Array.isArray(fileData1[key]) && !Array.isArray(fileData2[key])) {
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
        status: 'deleted',
      };
    } if (fileData1[key] !== fileData2[key]) {
      return {
        key,
        oldValue: fileData1[key],
        newValue: fileData2[key],
        status: 'changed',
      };
    }
    return {
      key,
      value,
      status: 'unchanged',
    };
  });
  return (statuses);
};

export default buildTree;
