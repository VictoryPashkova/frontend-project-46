import fs from 'fs';
import path from 'path';
import genDiff from '/Users/v.paskova/Desktop/frontend-project-46/src/index.js';

const readResultJson = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/resultjson.txt'),
'utf-8',
);

test('genDiff', () => {
  expect(genDiff('/Users/v.paskova/Desktop/frontend-project-46/__fixtures__/file1.json', '/Users/v.paskova/Desktop/frontend-project-46/__fixtures__/file2.json')).toEqual(readResultJson);
});
