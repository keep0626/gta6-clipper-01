// gta6-clipper-01 entry: the program's only job is to hand VIDEO.json to the
// grader. The video itself is the entry — a 20-second vertical Short cut from
// Rockstar's official GTA VI launch trailer on TikTok (@rockstargames): a
// stunt plane trailing red smoke with a man standing on its wing over a
// crowded Vice City beach, followed by make.fun's pitch on screen. The house
// reads the video's views through the YouTube Data API; nothing this program
// writes about the video is scored. The file is copied byte for byte, so the
// grader's two runs always write the same bytes.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const videoJsonPath = join(BOT_DIR, 'VIDEO.json');
const raw = readFileSync(videoJsonPath, 'utf8');
const parsed: unknown = JSON.parse(raw);
if (
  typeof parsed !== 'object' ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== 'string'
) {
  console.error('VIDEO.json must be a JSON object with a string "url" field.');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'VIDEO.json'), raw);
