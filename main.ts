// WASTED — a GTA 6 launch-week meme entry for make.fun's gta6-meme-x-01.
//
// The entry itself is the X post: the meme picture (entry.png, in this
// repository) is posted from a public X account with make.fun and the
// entrant's play code in the post's text, and POST.json names that post.
// This program's whole job is to hand both files to the grader, byte for
// byte, the same way on every run:
//
//   - POST.json  -> /output/POST.json  (the post's address on X)
//   - entry.png  -> /output/entry.png  (the meme, for the record)
//
// Node 22, standard library only. No network, no clock, no files outside
// this repository, so the two runs the grader makes write identical bytes.
//
// Run it locally the way the grader does:
//
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The PNG signature every PNG file starts with. Checking it keeps a
// truncated or misnamed picture from ever reaching the grader silently.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

// POST.json must be a JSON object naming the post's address on X.
const postPath = join(BOT_DIR, "POST.json");
let post: unknown;
try {
  post = JSON.parse(readFileSync(postPath, "utf8"));
} catch (err) {
  fail(`POST.json could not be read as JSON: ${(err as Error).message}`);
}
if (typeof post !== "object" || post === null || typeof (post as { url?: unknown }).url !== "string") {
  fail("POST.json must be a JSON object with a string url");
}

// entry.png must be a real PNG before it is copied anywhere.
const memePath = join(BOT_DIR, "entry.png");
let meme: Buffer;
try {
  meme = readFileSync(memePath);
} catch (err) {
  fail(`entry.png could not be read: ${(err as Error).message}`);
}
if (!meme.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
  fail("entry.png does not start with the PNG signature");
}

copyFileSync(postPath, join(OUTPUT_DIR, "POST.json"));
copyFileSync(memePath, join(OUTPUT_DIR, "entry.png"));
