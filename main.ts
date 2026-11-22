// Entry program for the gta6-meme-x-01 make.fun bounty ("WASTED" meme).
//
// The entry itself is a post on X; this repository just hands in its address.
// This program validates the two payload files sitting next to it — POST.json
// (the post's address) and entry.png (the meme picture) — and then copies both
// of them, byte for byte, into the output directory the runner points at with
// MAKEFUN_OUTPUT_DIR (default /output). No network, no clock, nothing else.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The address the starter ships with; it names no real post and must never
// be handed in as if it did.
const PLACEHOLDER_URL = "https://x.com/<handle>/status/<id>";

// An X status address: x.com, a handle of letters/digits/underscores, the
// literal word "status", and a digits-only post id.
const STATUS_URL = /^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/[0-9]+$/;

function fail(message: string): never {
  throw new Error(`gta6-meme-x-01 entry: ${message}`);
}

function readPostUrl(): string {
  const raw = readFileSync(join(repoDir, "POST.json"), "utf8");
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    fail("POST.json is not valid JSON");
  }
  if (typeof parsed !== "object" || parsed === null) {
    fail("POST.json must be a JSON object like {\"url\": \"...\"}");
  }
  const url = (parsed as { url?: unknown }).url;
  if (typeof url !== "string" || url.length === 0) {
    fail("POST.json must carry a string \"url\"");
  }
  if (url === PLACEHOLDER_URL || !STATUS_URL.test(url)) {
    fail(`POST.json url is not a real x.com status address: ${url}`);
  }
  return url;
}

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function checkPng(): void {
  const bytes = readFileSync(join(repoDir, "entry.png"));
  if (bytes.length < PNG_SIGNATURE.length) {
    fail("entry.png is too small to be a PNG file");
  }
  for (let i = 0; i < PNG_SIGNATURE.length; i += 1) {
    if (bytes[i] !== PNG_SIGNATURE[i]) {
      fail("entry.png does not start with the PNG signature bytes");
    }
  }
}

readPostUrl();
checkPng();

mkdirSync(outDir, { recursive: true });
copyFileSync(join(repoDir, "POST.json"), join(outDir, "POST.json"));
copyFileSync(join(repoDir, "entry.png"), join(outDir, "entry.png"));

// Read both copies back and compare them with the sources, so a short or
// corrupted write can never be handed in silently.
function verifyCopy(name: string): void {
  const source = readFileSync(join(repoDir, name));
  const handed = readFileSync(join(outDir, name));
  if (!source.equals(handed)) {
    fail(`${name} changed while being copied to the output directory`);
  }
}

verifyCopy("POST.json");
verifyCopy("entry.png");
