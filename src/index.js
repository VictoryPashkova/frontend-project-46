/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParsedFileData from './parsers.js';
import stylish from './formater.js';
import buildTree from './buildTree.js';

const getNoramalizedPath = (filePath) => path.resolve(process.cwd(), filePath);

const getFileData = (filePath) => fs.readFileSync(filePath).toString();
const getFileExtension = (filePath) => path.extname(filePath).toString();

const genDiff = (filepath1, filepath2) => {
  const fileData1 = { ...getParsedFileData(getFileData(filepath1), getFileExtension(filepath2)) };
  const fileData2 = { ...getParsedFileData(getFileData(filepath2), getFileExtension(filepath1)) };

  const compared = buildTree(fileData1, fileData2);
  const resultTree = stylish(compared);
  const uniq = _.uniq(resultTree);
  const result = `{\n${uniq.join('\n')}\n}`;
  return result;
};

export default genDiff;
export { getFileExtension, getFileData };
