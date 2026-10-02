import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🛡️  [SUBSEA-WIRE STANDING RULES GUARD] Running pre-build validation...');

// 1. DATASET INTEGRITY (Rule 1)
const dataPath = path.join(rootDir, 'data', 'cables.json');
if (!fs.existsSync(dataPath)) {
  console.error('❌ FATAL [Rule 1]: data/cables.json missing!');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 2. RECEIPT ASSERTIONS (Rule 4 & 5)
let totalCables = 0;
for (const c of data.cables) {
  totalCables++;
  if (!c.source_url || !c.source_url.startsWith('http')) {
    console.error(`❌ [Rule 4] Cable ${c.name} lacks authoritative source_url!`);
    process.exit(1);
  }
  if (!c.retrieved_at) {
    console.error(`❌ [Rule 4] Cable ${c.name} lacks retrieved_at timestamp!`);
    process.exit(1);
  }
}

let totalIncidents = 0;
for (const inc of data.incidents) {
  totalIncidents++;
  if (!inc.source_url || !inc.source_url.startsWith('http')) {
    console.error(`❌ [Rule 4] Incident ${inc.id} lacks authoritative source_url!`);
    process.exit(1);
  }
}

let totalVessels = 0;
for (const v of data.repair_fleet) {
  totalVessels++;
  if (!v.source_url || !v.source_url.startsWith('http')) {
    console.error(`❌ [Rule 4] Vessel ${v.vessel_name} lacks authoritative source_url!`);
    process.exit(1);
  }
}

console.log(`  ✓ Receipts Verified: ${totalCables} cables, ${totalIncidents} incidents, ${totalVessels} repair vessels with primary receipts.`);

// 3. BANNED WORDS AUDIT (Rule 9 & 11)
const BANNED_WORDS = [
  'verified', 'certified', '100%', 'zero', 'complete', 'exhaustive', 'audited', 'parity', 'accurate'
];

let bannedCount = 0;

function checkFile(fullPath) {
  const code = fs.readFileSync(fullPath, 'utf8');
  for (const w of BANNED_WORDS) {
    const regex = new RegExp(`\\b${w}\\b`, 'i');
    if (regex.test(code)) {
      console.error(`❌ [Rule 9/11] Banned word "${w}" found in: ${path.relative(rootDir, fullPath)}`);
      bannedCount++;
    }
  }
}

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
        scanDir(fullPath);
      }
    } else if (/\.(tsx|ts|jsx|js|html)$/.test(entry.name)) {
      if (fullPath.includes('scripts/verify-compliance') || fullPath.includes('scripts/verify-live-site')) continue;
      checkFile(fullPath);
    }
  }
}

scanDir(path.join(rootDir, 'src'));
checkFile(path.join(rootDir, 'index.html'));

if (bannedCount > 0) {
  console.error(`❌ [Rule 9/11 FAILED] ${bannedCount} banned marketing words detected! Replace with computed counts.`);
  process.exit(1);
}
console.log('  ✓ Rule 9 Banned Words: Zero unearned marketing claims in UI text.');

console.log('🎉 [STANDING RULES AUDIT PASSED] Subsea-Wire data layer compliant.');
process.exit(0);
