/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const readResult = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/result.txt'),
  'utf-8',
);

test('genDiff', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(readResult);
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(readResult);
});
