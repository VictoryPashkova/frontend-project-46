/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import getParsedFileData from './parsers.js';
import buildTree from './buildTree.js';
import chooseFormat from './formater/index.js';

const getNoramalizedPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileData = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getFileExtension = (filepath) => path.extname(filepath).toString();

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fileData1 = getFileData(getNoramalizedPath(filepath1));
  const fileData2 = getFileData(getNoramalizedPath(filepath2));
  const file1Format = getFileExtension(filepath1).slice(1);
  const file2Format = getFileExtension(filepath2).slice(1);
  const parsedData1 = getParsedFileData(fileData1, file1Format);
  const parsedData2 = getParsedFileData(fileData2, file2Format);

  const compared2Datas = buildTree(parsedData1, parsedData2);
  const result = chooseFormat(compared2Datas, format);
  return result;
};

export default genDiff;
