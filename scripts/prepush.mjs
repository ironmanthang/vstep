import { spawn } from 'node:child_process';

const runCommand = (command, args, label) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    child.on('error', (err) => {
      console.error(`❌ [${label}] Error:`, err.message);
      reject(err);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        console.error(`❌ [${label}] Failed with exit code ${code}.`);
        reject(new Error(`Process ${label} exited with code ${code}`));
      }
    });
  });
};

async function runPrepush() {
  console.log('🚀 Running VSTEP Pre-Push Verification Pipeline...\n');
  const startTime = Date.now();

  try {
    // Phase 1: Run non-dependent checks in parallel
    console.log('--- Phase 1: Parallel Checks (Typecheck, Oxlint, Vitest) ---');
    await Promise.all([
      runCommand('pnpm', ['typecheck'], 'Typecheck'),
      runCommand('pnpm', ['lint'], 'Oxlint Check'),
      runCommand('pnpm', ['test'], 'Vitest Tests'),
    ]);

    // Phase 2: Run production build sequentially once validation checks pass
    console.log('\n--- Phase 2: Production Build Smoke Test ---');
    await runCommand('pnpm', ['build'], 'Production Build');

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n🎉 All pre-push checks passed cleanly in ${duration}s! Ready to push.\n`);
    process.exit(0);
  } catch {
    console.error('\n💥 Pre-push verification failed! Please fix the errors above before pushing.\n');
    process.exit(1);
  }
}

runPrepush();
