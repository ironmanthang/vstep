import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const groups = [
  'src/features/listening/data/drills/hcmue/part1/hcmuePart1_01.ts',
  'src/features/listening/data/drills/hcmue/part1/hcmuePart1_02.ts',
  'src/features/listening/data/drills/hcmue/part1/hcmuePart1_03.ts',
  'src/features/listening/data/drills/hcmue/part1/hcmuePart1_04.ts',
  'src/features/listening/data/drills/hcmue/part1/hcmuePart1_05.ts',
  'src/features/listening/data/drills/hcmue/part2/hcmuePart2_01.ts',
  'src/features/listening/data/drills/hcmue/part2/hcmuePart2_02.ts',
  'src/features/listening/data/drills/hcmue/part2/hcmuePart2_03.ts',
  'src/features/listening/data/drills/hcmue/part2/hcmuePart2_04.ts',
  'src/features/listening/data/drills/hcmue/part2/hcmuePart2_05.ts',
  'src/features/listening/data/drills/hcmue/part3/hcmuePart3_01.ts',
  'src/features/listening/data/drills/hcmue/part3/hcmuePart3_02.ts',
  'src/features/listening/data/drills/hcmue/part3/hcmuePart3_03.ts',
  'src/features/listening/data/drills/hcmue/part3/hcmuePart3_04.ts',
  'src/features/listening/data/drills/hcmue/part3/hcmuePart3_05.ts',
  'src/features/listening/data/mockTests/mockTest01.ts',
  'src/features/listening/data/mockTests/mockTest02.ts',
  'src/features/listening/data/mockTests/mockTest03.ts',
  'src/features/listening/data/mockTests/mockTest04.ts',
  'src/features/listening/data/mockTests/mockTest05.ts',
  'src/features/listening/data/mockTests/mockTest06.ts',
  'src/features/listening/data/mockTests/mockTest07.ts'
];

async function run() {
  const result = [];
  for (const relPath of groups) {
    const absPath = path.resolve(process.cwd(), relPath);
    const mod = await import(pathToFileURL(absPath).href);
    const test = Object.values(mod).find(v => v && typeof v === 'object' && v.audio_url && v.transcript);
    if (!test) {
      console.error('Failed to parse:', relPath);
      continue;
    }
    result.push({
      relPath,
      id: test.id,
      title: test.title,
      part: test.part,
      audio_url: test.audio_url,
      duration_seconds: test.duration_seconds,
      transcript: test.transcript.map(t => ({
        start_ms: t.start_ms,
        end_ms: t.end_ms,
        text_en: t.text_en,
        is_clue_for_question: t.is_clue_for_question || ''
      })),
      questions: (test.questions || []).map(q => ({
        id: q.id,
        question_text: q.question_text,
        options: q.options,
        correct_key: q.correct_key
      }))
    });
  }
  fs.writeFileSync('scripts/all_listening_data.json', JSON.stringify(result, null, 2), 'utf-8');
  console.log(`Exported ${result.length} listening tests to scripts/all_listening_data.json`);
}

run().catch(console.error);
