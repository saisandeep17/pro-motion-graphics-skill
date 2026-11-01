#!/usr/bin/env node

/**
 * validate-project (Pro Motion Graphics V2)
 *
 * Verifies project structure, dependencies, import resolution,
 * configuration consistency, and Anti-Slop standards.
 */

const fs = require('fs');
const path = require('path');
const { logPass, logFail, logWarn, logInfo, fileExists, dirExists } = require('./lib/utils');

const targetDir = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();

console.log(`\n--- Validating Project: ${targetDir} ---`);

let errors = 0;
let warnings = 0;

if (!dirExists(targetDir)) {
  logFail(`Target directory does not exist: ${targetDir}`);
  process.exit(1);
}

// 1. Detect Engine Type
let engine = 'unknown';
const pkgPath = path.join(targetDir, 'package.json');
const indexPath = path.join(targetDir, 'index.html');

let pkg = null;
if (fileExists(pkgPath)) {
  try {
    pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (pkg.dependencies && pkg.dependencies.remotion) {
      engine = 'remotion';
    } else if ((pkg.dependencies && pkg.dependencies.gsap) || (pkg.devDependencies && pkg.devDependencies.gsap)) {
      engine = 'gsap';
    } else {
      engine = 'web';
    }
  } catch (err) {
    logFail(`Failed to parse package.json: ${err.message}`);
    errors++;
  }
} else if (fileExists(indexPath)) {
  const htmlContent = fs.readFileSync(indexPath, 'utf8');
  if (htmlContent.includes('<canvas')) {
    engine = 'canvas';
  } else {
    engine = 'web';
  }
}

logInfo(`Detected Engine: ${engine.toUpperCase()}`);

// 2. Engine-Specific File Checks
if (engine === 'remotion') {
  const requiredFiles = [
    'package.json',
    'tsconfig.json',
    'src/index.ts',
    'src/Root.tsx',
    'src/config.ts',
    'src/motion.ts',
  ];

  requiredFiles.forEach((file) => {
    const fullPath = path.join(targetDir, file);
    if (fileExists(fullPath)) {
      logPass(`Found required file: ${file}`);
    } else {
      logFail(`Missing required file: ${file}`);
      errors++;
    }
  });

  // Verify Remotion dependencies
  if (pkg && pkg.dependencies) {
    ['remotion', 'react', 'react-dom'].forEach((dep) => {
      if (pkg.dependencies[dep]) {
        logPass(`Dependency declared: ${dep}@${pkg.dependencies[dep]}`);
      } else {
        logFail(`Missing critical dependency in package.json: ${dep}`);
        errors++;
      }
    });
  }
} else if (engine === 'gsap') {
  const requiredFiles = ['package.json', 'index.html', 'src/styles.css', 'src/main.js'];
  requiredFiles.forEach((file) => {
    const fullPath = path.join(targetDir, file);
    if (fileExists(fullPath)) {
      logPass(`Found required file: ${file}`);
    } else {
      logFail(`Missing required file: ${file}`);
      errors++;
    }
  });
} else if (engine === 'canvas') {
  const requiredFiles = ['index.html'];
  requiredFiles.forEach((file) => {
    const fullPath = path.join(targetDir, file);
    if (fileExists(fullPath)) {
      logPass(`Found required file: ${file}`);
    } else {
      logFail(`Missing required file: ${file}`);
      errors++;
    }
  });
}

// 3. Scan Source Files for Broken Relative Imports and Anti-Slop Violations
function scanDirectory(dir, fileList = []) {
  if (!dirExists(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
        scanDirectory(full, fileList);
      }
    } else if (/\.(tsx?|jsx?|mjs)$/.test(entry.name)) {
      fileList.push(full);
    }
  }
  return fileList;
}

const sourceFiles = scanDirectory(path.join(targetDir, 'src'));
logInfo(`Scanned ${sourceFiles.length} source file(s) for import integrity & quality.`);

const importRegex = /(?:import|from)\s+['"](\.[^'"]+)['"]/g;

sourceFiles.forEach((srcFile) => {
  const content = fs.readFileSync(srcFile, 'utf8');
  const relPath = path.relative(targetDir, srcFile);

  // Check imports
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importTarget = match[1];
    const resolvedBase = path.resolve(path.dirname(srcFile), importTarget);

    const candidates = [
      resolvedBase,
      `${resolvedBase}.ts`,
      `${resolvedBase}.tsx`,
      `${resolvedBase}.js`,
      `${resolvedBase}.jsx`,
      path.join(resolvedBase, 'index.ts'),
      path.join(resolvedBase, 'index.tsx'),
      path.join(resolvedBase, 'index.js'),
    ];

    const exists = candidates.some((c) => fileExists(c));
    if (exists) {
      // Import resolved
    } else {
      logFail(`Unresolved import "${importTarget}" in ${relPath}`);
      errors++;
    }
  }

  // Anti-Slop Rule: Check for useStaggerSpring hook naming / loop usage
  if (content.includes('useStaggerSpring')) {
    logFail(
      `React Rules of Hooks violation in ${relPath}: "useStaggerSpring" must be renamed to a pure helper like "getStaggerSpringProgress".`
    );
    errors++;
  }

  // Anti-Slop Rule: Check for unseeded Math.random() in animation frames
  if (content.includes('Math.random()')) {
    logWarn(
      `Non-deterministic "Math.random()" detected in ${relPath}. Use seeded pseudo-randomness or frame-driven math.`
    );
    warnings++;
  }
});

// Summary
console.log(`\n--- Validation Result ---`);
if (errors === 0) {
  logPass(`Project structure and imports are valid! (${warnings} warnings)`);
  process.exit(0);
} else {
  logFail(`Validation completed with ${errors} error(s) and ${warnings} warning(s).`);
  process.exit(1);
}
