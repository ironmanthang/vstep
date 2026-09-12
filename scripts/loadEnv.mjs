import fs from 'node:fs';
import path from 'node:path';

/**
 * Loads .env file and guarantees that project .env variables
 * ALWAYS overwrite any pre-existing system environment variables.
 */
export function loadProjectEnv(envFile = '.env') {
  const resolvedPath = path.resolve(process.cwd(), envFile);
  if (!fs.existsSync(resolvedPath)) {
    return;
  }
  const content = fs.readFileSync(resolvedPath, 'utf-8');
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || !line.includes('=')) continue;
    const eqIdx = line.indexOf('=');
    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (key) {
      process.env[key] = val;
    }
  }
}

loadProjectEnv();
