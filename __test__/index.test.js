/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const readResultJson = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/resultjson.txt'),
  'utf-8',
);

const readResultYaml = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/resultyaml.txt'),
  'utf-8',
);

test('genDiff', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(readResultJson);
});
