/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import getParsedFileData from './parsers.js';
import buildTree from './buildTree.js';
import chooseFormat from './formater/index.js';

const getFileData = (filePath) => fs.readFileSync(filePath).toString();
const getFileExtension = (filePath) => path.extname(filePath).toString();

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fileData1 = { ...getParsedFileData(getFileData(filepath1), getFileExtension(filepath2)) };
  const fileData2 = { ...getParsedFileData(getFileData(filepath2), getFileExtension(filepath1)) };

  const compared2Datas = buildTree(fileData1, fileData2);
  const result = chooseFormat(compared2Datas, format);
  return result;
};

export default genDiff;
export { getFileExtension, getFileData };
