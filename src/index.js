/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import getParsedFileData from './parsers.js';
import buildTree from './buildTree.js';
import chooseFormat from './formater/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fileData1 = getParsedFileData(filepath1);
  const fileData2 = getParsedFileData(filepath2);

  const compared2Datas = buildTree(fileData1, fileData2);
  const result = chooseFormat(compared2Datas, format);
  return result;
};

export default genDiff;

