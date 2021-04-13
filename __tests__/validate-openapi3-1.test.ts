import { execSync } from 'child_process'
const testFolder = '__tests__/test-openapi-3-1';
const fs = require('fs');
import { join } from 'path';

it('test lint command for all files', () => {
  fs.readdirSync(testFolder).forEach((file: string) => {
    const stdout = execSync(`npx ts-node packages/cli/src/index.ts lint ${join(testFolder, file)} --format json`);
    const result = JSON.parse(stdout.toString())
    expect(result.totals.errors).toEqual(0);
  });

});
