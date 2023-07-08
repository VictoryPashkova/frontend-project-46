import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const getNoramalizedPath = (filePath) => path.resolve(process.cwd(), filePath);

const getFileData = (filePath) => fs.readFileSync(getNoramalizedPath(filePath));
const getFileExtension = (filePath) => path.extname(filePath);

const getParsedFileData = (filePath) => {
  if (getFileExtension(filePath) === '.json') {
    return JSON.parse(getFileData(filePath));
  }
  return 'file extension error';
};

const genDiff = (filepath1, filepath2) => {
  const fileData1 = { ...getParsedFileData(filepath1.toString()) };
  const fileData2 = { ...getParsedFileData(filepath2.toString()) };

  const keys = _.sortBy(Object.entries(fileData1).concat(Object.entries(fileData2)));

  const statuses = keys.map(([key, value]) => {
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

  const makeResultString = statuses.map((node) => {
    if (node.status === 'added') {
      return `  + ${node.key}: ${node.value}`;
    } if (node.status === 'deleted') {
      return `  - ${node.key}: ${node.value}`;
    } if (node.status === 'changed') {
      return `  - ${node.key}: ${node.oldValue} \n  + ${node.key}: ${node.newValue}`;
    }
    return `    ${node.key}: ${node.value}`;
  });
  const makeUniq = _.uniq(makeResultString);
  const result = `{\n${makeUniq.join('\n')}\n}`;

  return result;
};

export default genDiff;
