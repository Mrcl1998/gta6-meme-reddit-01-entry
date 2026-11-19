// gta6-meme-reddit-01 entry: "Waited 13 years for GTA 6 — my agent made this
// meme in 13 seconds" (Node 22, standard library only).
//
// The entry is the Reddit post itself: the house reads the post from Reddit
// (its first picture, title and text) and hands that to the judge. This program
// only stages the entry's own files for the grader: it writes meme.png — the
// meme picture, with make.fun's ghost worked into the scene — and POST.json —
// the post's address, once the post is up — from the repository root into the
// output directory. POST.json is added after the meme is posted on Reddit, so a
// run before that still succeeds and stages just the picture.
//
// Deterministic: the same files in, the same bytes out, every run. No network,
// no wall clock, nothing read outside the repository, and the output directory
// is only created, never emptied or removed.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The files this entry stages, in order. POST.json is optional until the post
// is up; meme.png is always required.
const STAGED: Array<{ name: string; required: boolean }> = [
  { name: 'meme.png', required: true },
  { name: 'POST.json', required: false },
];

mkdirSync(OUTPUT_DIR, { recursive: true });

for (const file of STAGED) {
  const src = join(BOT_DIR, file.name);
  if (!existsSync(src)) {
    if (file.required) {
      console.error(`missing required file: ${file.name}`);
      process.exit(1);
    }
    console.error(`skipping ${file.name}: not posted yet`);
    continue;
  }
  copyFileSync(src, join(OUTPUT_DIR, file.name));
  const bytes = statSync(src).size;
  const stagedBytes = statSync(join(OUTPUT_DIR, file.name)).size;
  if (stagedBytes !== bytes) {
    console.error(`staged ${file.name} is truncated: ${stagedBytes} of ${bytes} bytes`);
    process.exit(1);
  }
  console.error(`staged ${file.name} (${bytes} bytes)`);
}
