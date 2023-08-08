import fs from 'fs';
import path from 'path';
import getParsedFileData from './parsers.js';
import buildTree from './buildTree.js';
import chooseFormat from './formater/index.js';

const getNoramalizedPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFileData = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getFileExtension = (filepath) => path.extname(filepath).toString();

const getFileData = (filepath) => {
  const fileData = readFileData(getNoramalizedPath(filepath));
  const fileFormat = getFileExtension(filepath).slice(1);
  return getParsedFileData(fileData, fileFormat);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fileData1 = getFileData(filepath1);
  const fileData2 = getFileData(filepath2);

  const compared2Datas = buildTree(fileData1, fileData2);
  const result = chooseFormat(compared2Datas, format);
  return result;
};

export default genDiff;
