import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFileData = (filepath) => fs.readFileSync(filepath).toString();
const getFileExtension = (filepath) => path.extname(filepath).toString();

const getParsedFileData = (filepath) => {
  const fileData = getFileData(getFixturePath(filepath));
  const fileFormat = getFileExtension(filepath);
  if (fileFormat === '.json') {
    return JSON.parse(fileData);
  } if (fileFormat === '.yaml' || fileFormat === '.yml') {
    return yaml.load(fileData);
  }
  return `Unknowen format ${fileFormat}`;
};

export default getParsedFileData;
