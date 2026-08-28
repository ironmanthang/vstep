import fs from 'node:fs';
import path from 'node:path';
import postgres from 'postgres';

// Simple .env parser to load DIRECT_URL / DATABASE_URL if not already in process.env
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

async function runMigration() {
  loadEnv();

  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    console.error('❌ Migration Error: DIRECT_URL or DATABASE_URL not found.');
    console.error('👉 Please set DIRECT_URL in your .env file or environment variables.');
    console.error('   Example: DIRECT_URL="postgresql://postgres:[PASSWORD]@db.zglfrtbsogqvkgbqoiqu.supabase.co:5432/postgres"');
    process.exit(1);
  }

  const schemaPath = path.resolve(process.cwd(), 'supabase', 'schema.sql');
  if (!fs.existsSync(schemaPath)) {
    console.error(`❌ Migration Error: Schema file not found at ${schemaPath}`);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(schemaPath, 'utf8');
  console.log('🚀 Connecting to Supabase PostgreSQL database...');

  const sql = postgres(connectionString, {
    max: 1,
    ssl: 'require',
    connect_timeout: 15,
  });

  const startTime = Date.now();

  try {
    console.log('📦 Applying schema migration (supabase/schema.sql)...');
    await sql.begin(async (tx) => {
      await tx.unsafe(sqlContent);
    });

    // Verify created tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND table_name IN ('user_profiles', 'user_study_logs', 'user_mock_test_results', 'user_flashcard_reviews', 'user_daily_stats')
      ORDER BY table_name;
    `;

    const verifiedTableNames = tables.map(t => t.table_name);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log(`\n🎉 Migration applied successfully in ${duration}s!`);
    console.log(`✅ Verified public tables: ${verifiedTableNames.join(', ')}`);

    await sql.end();
    process.exit(0);
  } catch (err) {
    console.error('\n💥 Migration execution failed:');
    console.error(err instanceof Error ? err.message : err);
    await sql.end({ timeout: 2 }).catch(() => {});
    process.exit(1);
  }
}

runMigration();
