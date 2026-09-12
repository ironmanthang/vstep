import fs from 'fs';
import path from 'path';

const rawDataPath = 'scripts/ulis_writing_full_raw.json';
const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf-8'));

const outDir = 'src/features/writing/data/mockTests';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const indexExports = [];
const allTestsMap = [];

for (let i = 1; i <= 7; i++) {
  const testData = rawData[i] || rawData[String(i)];
  if (!testData) {
    console.error(`Missing test ${i}`);
    continue;
  }

  const numStr = String(i).padStart(2, '0');
  const constName = `ULIS_WRITING_TEST_${numStr}`;
  const fileName = `ulisWritingTest${numStr}.ts`;
  const filePath = path.join(outDir, fileName);

  const t1 = testData.task1;
  const t2 = testData.task2;

  // Clean band to standard 'B1' | 'B2' | 'C1'
  const cleanBand = (b) => {
    if (!b) return 'B1';
    if (b.includes('B1')) return 'B1';
    if (b.includes('B2')) return 'B2';
    if (b.includes('C1')) return 'C1';
    return 'B1';
  };

  t1.sample_response.band = cleanBand(t1.sample_response.band);
  t2.sample_response.band = cleanBand(t2.sample_response.band);

  const fileContent = `import type { WritingPrompt } from '../../../../types/schemas';

/**
 * Authentic ULIS VSTEP Writing Test ${numStr}
 * Sourced from "7 Vstep Tests B1-B2-C1 Full Key" (ULIS - ĐHQGHN, 2019)
 */

export const ${constName}_TASK1: WritingPrompt = ${JSON.stringify(t1, null, 2)};

export const ${constName}_TASK2: WritingPrompt = ${JSON.stringify(t2, null, 2)};

export const ${constName} = {
  id: 'ulis_writing_test_${numStr}',
  test_number: ${i},
  title: 'ULIS Authentic VSTEP Writing Test ${numStr}',
  institution: 'ULIS - ĐHQGHN',
  total_duration_minutes: 60,
  task1: ${constName}_TASK1,
  task2: ${constName}_TASK2,
};
`;

  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`Generated ${filePath}`);

  indexExports.push(`export { ${constName}, ${constName}_TASK1, ${constName}_TASK2 } from './ulisWritingTest${numStr}';`);
  allTestsMap.push(`  ${constName},`);
}

const indexContent = `${indexExports.join('\n')}

export const ALL_ULIS_WRITING_TESTS = [
${allTestsMap.join('\n')}
];

export const ULIS_WRITING_TESTS_MAP = Object.fromEntries(
  ALL_ULIS_WRITING_TESTS.map((t) => [t.id, t])
);
`;

fs.writeFileSync(path.join(outDir, 'index.ts'), indexContent, 'utf-8');
console.log(`Generated ${path.join(outDir, 'index.ts')}`);
