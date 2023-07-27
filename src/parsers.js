import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const getNoramalizedPath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);
const getFileData = (filepath) => fs.readFileSync(filepath).toString();
const getFileExtension = (filepath) => path.extname(filepath).toString();

const getParsedFileData = (filepath) => {
  const fileData = getFileData(getNoramalizedPath(filepath));
  const fileFormat = getFileExtension(filepath);
  if (fileFormat === '.json') {
    return JSON.parse(fileData);
  } if (fileFormat === '.yaml' || fileFormat === '.yml') {
    return yaml.load(fileData);
  }
  return `Unknowen format ${fileFormat}`;
};

export default getParsedFileData;
