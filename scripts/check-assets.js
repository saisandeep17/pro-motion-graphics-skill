#!/usr/bin/env node

/**
 * check-assets (Pro Motion Graphics V2)
 *
 * Scans project configurations and source files to verify that all
 * referenced assets (logos, images, video clips, audio) exist, have
 * valid extensions, and are non-empty.
 */

const fs = require('fs');
const path = require('path');
const { logPass, logFail, logWarn, logInfo, fileExists, dirExists } = require('./lib/utils');

const targetDir = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();

console.log(`\n--- Checking Assets in: ${targetDir} ---`);

let errors = 0;
let warnings = 0;

const ALLOWED_EXTENSIONS = new Set([
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.mp4',
  '.webm',
  '.mov',
  '.mp3',
  '.wav',
  '.aac',
  '.m4a',
  '.woff2',
  '.woff',
  '.ttf',
  '.otf',
]);

// 1. Locate public / asset directories
const possibleAssetDirs = ['public', 'assets', 'static', 'public/assets'].map((d) =>
  path.join(targetDir, d)
);
const assetDirs = possibleAssetDirs.filter((d) => dirExists(d));

if (assetDirs.length === 0) {
  logWarn('No standard asset directory (public/, assets/, static/) found.');
  warnings++;
} else {
  assetDirs.forEach((d) => logInfo(`Found asset directory: ${path.relative(targetDir, d)}`));
}

// 2. Scan source files for asset references (staticFile('...'), src='...', href='...')
function findSourceFiles(dir, list = []) {
  if (!dirExists(dir)) return list;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', 'dist', '.git'].includes(entry.name)) {
        findSourceFiles(full, list);
      }
    } else if (/\.(tsx?|jsx?|html|css)$/.test(entry.name)) {
      list.push(full);
    }
  }
  return list;
}

const sources = findSourceFiles(targetDir);
const referencedAssets = new Set();

// Regular expressions to extract asset paths
const staticFileRegex = /staticFile\(\s*['"]([^'"]+)['"]\s*\)/g;
const srcRegex = /(?:src|href|url)\s*[:=(]\s*['"]([^'"]+\.(?:svg|png|jpe?g|webp|mp4|webm|mov|mp3|wav|woff2?|ttf))['"]/gi;

sources.forEach((srcFile) => {
  const content = fs.readFileSync(srcFile, 'utf8');

  let match;
  while ((match = staticFileRegex.exec(content)) !== null) {
    referencedAssets.add(match[1]);
  }
  while ((match = srcRegex.exec(content)) !== null) {
    // Exclude external web links
    if (!match[1].startsWith('http://') && !match[1].startsWith('https://')) {
      referencedAssets.add(match[1]);
    }
  }
});

logInfo(`Discovered ${referencedAssets.size} unique referenced asset(s).`);

// 3. Verify each referenced asset exists and is valid
referencedAssets.forEach((assetPath) => {
  const cleanPath = assetPath.replace(/^\/+/, '');
  const ext = path.extname(cleanPath).toLowerCase();

  // Validate extension
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    logWarn(`Uncommon or unsupported media format: ${cleanPath} (${ext})`);
    warnings++;
  }

  // Look for file in candidate locations
  const candidates = [
    path.join(targetDir, cleanPath),
    ...assetDirs.map((ad) => path.join(ad, cleanPath)),
  ];

  const found = candidates.find((c) => fileExists(c));

  if (found) {
    const stats = fs.statSync(found);
    if (stats.size === 0) {
      logFail(`Asset file is empty (0 bytes): ${cleanPath}`);
      errors++;
    } else {
      logPass(`Asset verified: ${cleanPath} (${(stats.size / 1024).toFixed(1)} KB)`);
    }
  } else {
    logFail(`Missing referenced asset: "${cleanPath}" not found in project or public/`);
    errors++;
  }
});

// Summary
console.log(`\n--- Asset Check Result ---`);
if (errors === 0) {
  logPass(`All assets are present and valid! (${warnings} warnings)`);
  process.exit(0);
} else {
  logFail(`Asset verification failed with ${errors} missing or broken asset(s).`);
  process.exit(1);
}
