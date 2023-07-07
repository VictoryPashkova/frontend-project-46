import _ from 'lodash';
const fs = require('fs');
const path = require('path');

const getNoramalizedPath = (filePath) => {
  if (filePath.startsWith('.') || filePath.startsWith('..') || filePath.startsWith('//')) {
    return path.normalize(filePath);
  }
  return filePath;
};

const getFileData = (filePath) => fs.readFileSync(getNoramalizedPath(filePath), 'utf8');

const getFileExtension = (filePath) => path.extname(filePath);

const getParsedFileData = (filePath) => {
  if (getFileExtension(filePath) === '.json') {
    return JSON.parse(getFileData(filePath));
  }
  return 'file extension error';
};

const genDiff = (filepath1, filepath2) => {
  const fileData1 = { ...getParsedFileData(filepath1) };
  const fileData2 = { ...getParsedFileData(filepath2) };

  const keys = Object.entries(fileData1).concat(Object.entries(fileData2));
  const statuses = keys.map(([key, value]) => {
    if (!_.has(fileData1, key)) {
      return { key, value, status: 'added' };
    } if (!_.has(fileData2, key)) {
      return { key, value, status: 'deleted' };
    } if (fileData1[key] !== fileData2[key]) {
      return { key, value, status: 'changed' };
    }
    return { key, value, status: 'unchanged' };
  });

  const makeResultString = statuses.map((node) => {
    if (node.status === 'added') {
      return `+ ${node.key}: ${node.value}`;
    } if (node.status === 'deleted') {
      return `- ${node.key}: ${node.value}`;
    } if (node.status === 'changed') {
      return `- ${node.key}: ${node.value}`;
    }
    return `${node.key}: ${node.value}`;
  });

  return makeResultString;
};

export default genDiff;
