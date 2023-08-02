import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getResult = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf8');

const testingFormatters = [
  ['Stylish'],
  ['Plain'],
  ['Json'],
];

const testingFileFormats = [
  ['__fixtures__/file1.json', '__fixtures__/file2.json'],
  ['__fixtures__/file1.yaml', '__fixtures__/file2.yaml'],
];

describe.each(testingFormatters)('%s formater', (format) => {
  test.each(testingFileFormats)('%s', (file1, file2) => {
    expect(genDiff(file1, file2, format)).toEqual(getResult(`result${format}.txt`));
  });
});
