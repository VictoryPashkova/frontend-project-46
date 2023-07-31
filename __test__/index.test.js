/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const getResult = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf8');

test('genDiff', () => {
  const stylishResult = 'resultStylish.txt';
  const plainResult = 'resultPlain.txt';
  const jsonResult = 'resultJson.txt';

  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(getResult(stylishResult));
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(getResult(stylishResult));
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(getResult(plainResult));
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'plain')).toEqual(getResult(plainResult));
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toEqual(getResult(jsonResult));
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'json')).toEqual(getResult(jsonResult));
});
