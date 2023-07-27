/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const readResultStylish = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/resultStylish.txt'),
  'utf-8',
);

const readResultPlain = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/resultPlain.txt'),
  'utf-8',
);

test('genDiff', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(readResultStylish);
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(readResultStylish);
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(readResultPlain);
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'plain')).toEqual(readResultPlain);
});
