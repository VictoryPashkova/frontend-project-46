import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe.each([['stylish'], ['plain'], ['json']])('%s formatter', (formatter) => {
  const filepathOfExpected = getFixturePath(`result${formatter}.txt`);
  const expected = fs.readFileSync(filepathOfExpected, 'utf-8');

  test.each([['json'], ['yaml']])('%s files', (extension) => {
    const filepath1 = getFixturePath(`file1.${extension}`);
    const filepath2 = getFixturePath(`file2.${extension}`);

    const result = genDiff(filepath1, filepath2, formatter);

    expect(result).toBe(expected);
  });
});
