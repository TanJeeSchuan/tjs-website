#!/usr/bin/env node
// Guardrails for a build that nobody reviews before it ships.
// Runs as part of `npm run build`, so it fails locally exactly as it fails in CI.
import { readdir, stat } from 'node:fs/promises'
import { join, extname, relative } from 'node:path'

const DIST = 'dist'
const MAX_TOTAL_BYTES = 25 * 1024 * 1024
const MAX_FILE_BYTES = 10 * 1024 * 1024

const ALLOWED = new Set([
  // markup / styles / scripts
  '.html', '.css', '.js', '.mjs', '.map',
  // images
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif', '.ico',
  // fonts
  '.woff', '.woff2', '.ttf', '.otf', '.eot',
  // harmless statics people expect to work
  '.json', '.txt', '.webmanifest', '.xml',
])

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(path)))
    else if (entry.isFile()) out.push(path)
    // symlinks and anything exotic are deliberately ignored here and rejected below
    else out.push(path)
  }
  return out
}

const violations = []

let files
try {
  files = await walk(DIST)
} catch {
  console.error(`✗ ${DIST}/ does not exist — did the build run?`)
  process.exit(1)
}

if (files.length === 0) violations.push(`${DIST}/ is empty`)

let total = 0

for (const file of files) {
  const rel = relative(DIST, file)
  const info = await stat(file).catch(() => null)

  if (!info?.isFile()) {
    violations.push(`${rel} — not a regular file (symlink? device?)`)
    continue
  }

  total += info.size

  const ext = extname(file).toLowerCase()
  if (!ALLOWED.has(ext)) {
    violations.push(
      `${rel} — disallowed file type "${ext || '(no extension)'}"`
    )
  }

  if (info.size > MAX_FILE_BYTES) {
    violations.push(`${rel} — single file is ${mb(info.size)} (max ${mb(MAX_FILE_BYTES)})`)
  }
}

if (total > MAX_TOTAL_BYTES) {
  violations.push(
    `total build is ${mb(total)} (max ${mb(MAX_TOTAL_BYTES)}) — ` +
      `compress images, or host large media elsewhere`
  )
}

if (violations.length > 0) {
  console.error(`\n✗ Build rejected — ${violations.length} guardrail violation(s):\n`)
  for (const v of violations) console.error(`   • ${v}`)
  console.error(
    `\nNothing was deployed. Your site is still serving the last good build.\n` +
      `Allowed types: ${[...ALLOWED].join(' ')}\n`
  )
  process.exit(1)
}

console.log(`✓ ${files.length} files, ${mb(total)} — within guardrails`)
