/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getResult = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf8');

test('genDiff', () => {
  const stylishResult = 'resultStylish.txt';
  const plainResult = 'resultPlain.txt';
  const jsonResult = 'resultJson.txt';

  expect(genDiff('file1.json', 'file2.json')).toEqual(getResult(stylishResult));
  expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(getResult(stylishResult));
  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(getResult(plainResult));
  expect(genDiff('file1.yaml', 'file2.yaml', 'plain')).toEqual(getResult(plainResult));
  expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(getResult(jsonResult));
  expect(genDiff('file1.yaml', 'file2.yaml', 'json')).toEqual(getResult(jsonResult));
});
