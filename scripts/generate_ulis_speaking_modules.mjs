import fs from 'fs';
import path from 'path';

const outDir = 'src/features/speaking/data/mockTests';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const importLines = [];
const exportLines = [];
const allTestsMap = [];

for (let i = 1; i <= 7; i++) {
  const numStr = String(i).padStart(2, '0');
  const cacheFile = `scripts/ulis_speaking_test_${numStr}.json`;
  if (!fs.existsSync(cacheFile)) {
    console.error(`Missing test file ${cacheFile}`);
    continue;
  }

  const testData = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
  const constName = `ULIS_SPEAKING_TEST_${numStr}`;
  const fileName = `ulisSpeakingTest${numStr}.ts`;
  const filePath = path.join(outDir, fileName);

  const fileContent = `import type { SpeakingTest } from '../../../../types/schemas';

/**
 * Authentic ULIS VSTEP Speaking Test ${numStr}
 * Sourced from "7 Vstep Tests B1-B2-C1 Full Key" (ULIS - ĐHQGHN, 2019)
 */

export const ${constName}: SpeakingTest = ${JSON.stringify(testData, null, 2)};
`;

  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`Generated ${filePath}`);

  importLines.push(`import { ${constName} } from './ulisSpeakingTest${numStr}';`);
  exportLines.push(`  ${constName},`);
  allTestsMap.push(`  ${constName},`);
}

const indexContent = `import type { SpeakingTest } from '../../../../types/schemas';
${importLines.join('\n')}

export {
${exportLines.join('\n')}
};

export const ALL_ULIS_SPEAKING_TESTS: SpeakingTest[] = [
${allTestsMap.join('\n')}
];

export const ULIS_SPEAKING_TESTS_MAP = Object.fromEntries(
  ALL_ULIS_SPEAKING_TESTS.map((t) => [t.id, t])
);
`;

fs.writeFileSync(path.join(outDir, 'index.ts'), indexContent, 'utf-8');
console.log(`Generated ${path.join(outDir, 'index.ts')}`);
