/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getNoramalizedPath = (filepath) => path.resolve(process.cwd(), filepath);
const getResult = (filepath) => fs.readFileSync(getNoramalizedPath(filepath), 'utf8');

test('genDiff', () => {
  const stylishResult = '__fixtures__/resultStylish.txt';
  const plainResult = '__fixtures__/resultPlain.txt';
  const jsonResult = '__fixtures__/resultJson.txt';

  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(getResult(stylishResult));
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(getResult(stylishResult));
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(getResult(plainResult));
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'plain')).toEqual(getResult(plainResult));
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toEqual(getResult(jsonResult));
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'json')).toEqual(getResult(jsonResult));
});
