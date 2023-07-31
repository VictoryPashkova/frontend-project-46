import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getNoramalizedPath = (filename) => path.join(__dirname, '..', filename);
const getFileData = (filepath) => fs.readFileSync(filepath, 'utf-8');
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
