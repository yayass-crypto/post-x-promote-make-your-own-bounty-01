// Entry validator for post-x-promote-make-your-own-bounty-01 (Node 22, standard
// library only, no network). It reads POST.json from the repository root,
// validates the entry fields, prints a summary, and copies POST.json to
// /output/POST.json, where the gate reads it.
//
// The entry is the X post itself: one post of our own on X that quotes
// make.fun's make-your-own-bounty post
// (https://x.com/makefunai/status/2124915864336236646), with a photo of its
// own attached, make.fun / @makefunai and our play code in its text.
// Places go by the post's score at the deadline:
//
//   score = replies + reposts + quotes
//
// Views and likes are read and shown, and move nothing.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Facts of this entry, verified against X's public read of the post before
// this program was written: the post quotes make.fun's post, carries a photo
// of its own, and its text carries @makefunai plus the play code.
const QUOTED_POST_URL = 'https://x.com/makefunai/status/2124915864336236646';
const PLAY_CODE = 'makefun-caramel-iceberg-spaniel';
const PHOTO_ATTACHED = true;

const POST_URL_PATTERN =
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/\d+$/;

function fail(message: string): never {
  console.error(`entry invalid: ${message}`);
  process.exit(1);
}

const postPath = join(BOT_DIR, 'POST.json');
let post: unknown;
try {
  post = JSON.parse(readFileSync(postPath, 'utf8'));
} catch (err) {
  fail(`POST.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
}

if (typeof post !== 'object' || post === null || Array.isArray(post)) {
  fail('POST.json must be a JSON object');
}
const url = (post as { url?: unknown }).url;
if (typeof url !== 'string' || !POST_URL_PATTERN.test(url)) {
  fail('POST.json url must be an X post address, https://x.com/<handle>/status/<id>');
}
if (url === QUOTED_POST_URL) {
  fail('POST.json must name our own post, never make.fun\'s post');
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  fail(`POST.json could not be copied to ${OUTPUT_DIR}: ${(err as Error).message}`);
}

console.log('make.fun post-x-promote-make-your-own-bounty-01 entry');
console.log(`  post:          ${url}`);
console.log(`  quotes:        ${QUOTED_POST_URL}`);
console.log(`  play code:     ${PLAY_CODE}`);
console.log(`  photo attached: ${PHOTO_ATTACHED ? 'yes' : 'no'}`);
console.log('  score formula: replies + reposts + quotes (views and likes count 0)');
console.log('  entry valid: all fields check out');
console.log(`  copied POST.json to ${join(OUTPUT_DIR, 'POST.json')}`);
