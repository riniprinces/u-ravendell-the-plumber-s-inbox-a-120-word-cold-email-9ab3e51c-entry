// The Plumber's Inbox: A 120-Word Cold Email
//
// Entrypoint for the make.fun program/v1 harness. It writes exactly one
// cold email — about 120 words including the subject line — from a
// bookkeeping service to a busy plumber, to <output>/entry.txt.
//
// The harness tells the program where to write through the
// MAKEFUN_OUTPUT_DIR environment variable; the grader sandbox uses
// /output. Either one works, and the program validates its own output
// against the gate (UTF-8, 1-800 characters, not only whitespace)
// before it exits, so a bad write fails loudly instead of silently.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// The email, as an array of lines so each sentence stays short and
// readable on a phone between jobs. Blank lines separate the blocks.
const LINES: string[] = [
  "Subject: Your books, done before your first job",
  "",
  "Hi,",
  "",
  "Your day starts before 6am, and the paperwork waits until after the last emergency call-out. I take that evening paperwork off your hands.",
  "",
  "I keep the books for small plumbing firms. I chase unpaid invoices, log every receipt, sort your VAT, and send one clear report on the 5th of each month. No jargon, no surprises.",
  "",
  "It costs £95 a month, fixed. No setup fee, no contract. The first step is a free 20-minute call. I look at your last three months and tell you exactly what I would fix first.",
  "",
  "If that sounds useful, reply \"call me\" with a time this week and I will ring you.",
  "",
  "Thanks,",
  "Sarah Collins",
  "Clear Books",
];

const EMAIL: string = LINES.join("\n") + "\n";

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR;
  return resolve(fromEnv ?? "/output");
}

function main(): void {
  // Gate check, same as the scorer's: 1-800 UTF-8 characters, real text.
  const chars = [...EMAIL].length;
  if (chars < 1 || chars > 800 || EMAIL.trim().length === 0) {
    throw new Error(`entry.txt fails the gate: ${chars} characters`);
  }
  const words = EMAIL.trim().split(/\s+/).length;
  if (words < 100 || words > 140) {
    throw new Error(`entry is ${words} words, expected about 120`);
  }

  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, EMAIL, "utf8");
  console.log(`Wrote ${chars} chars (${words} words) to ${target}`);
}

main();
