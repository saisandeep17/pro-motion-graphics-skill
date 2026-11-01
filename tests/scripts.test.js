/**
 * Integration Tests for Pro Motion Graphics Validation Scripts
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`✔ [TEST PASSED]: ${name}`);
    passed++;
  } catch (err) {
    console.error(`✖ [TEST FAILED]: ${name}`);
    console.error(`  ${err.message}`);
    failed++;
  }
}

console.log('\n========================================');
console.log('Running Validation Scripts Test Suite');
console.log('========================================\n');

// 1. Test validate-project on remotion-starter
runTest('validate-project should pass on remotion-starter', () => {
  const result = execSync(`node "${path.join(rootDir, 'scripts/validate-project.js')}" "${path.join(rootDir, 'templates/remotion-starter')}"`, {
    encoding: 'utf8',
  });
  if (!result.includes('Project structure and imports are valid')) {
    throw new Error('Expected passing output from validate-project, got: ' + result);
  }
});

// 2. Test validate-project on gsap-starter
runTest('validate-project should pass on gsap-starter', () => {
  const result = execSync(`node "${path.join(rootDir, 'scripts/validate-project.js')}" "${path.join(rootDir, 'templates/gsap-starter')}"`, {
    encoding: 'utf8',
  });
  if (!result.includes('Project structure and imports are valid')) {
    throw new Error('Expected passing output from validate-project, got: ' + result);
  }
});

// 3. Test check-assets on remotion-starter
runTest('check-assets should pass on remotion-starter', () => {
  const result = execSync(`node "${path.join(rootDir, 'scripts/check-assets.js')}" "${path.join(rootDir, 'templates/remotion-starter')}"`, {
    encoding: 'utf8',
  });
  if (!result.includes('All assets are present and valid')) {
    throw new Error('Expected passing output from check-assets, got: ' + result);
  }
});

// 4. Test validate-project failure on broken project
runTest('validate-project should fail on broken project with missing files', () => {
  const tmpDir = path.join(rootDir, '.test-tmp-broken');
  fs.mkdirSync(tmpDir, { recursive: true });
  fs.writeFileSync(path.join(tmpDir, 'package.json'), JSON.stringify({ dependencies: { remotion: '4.0.0' } }));

  let failedAsExpected = false;
  try {
    execSync(`node "${path.join(rootDir, 'scripts/validate-project.js')}" "${tmpDir}"`, {
      encoding: 'utf8',
      stdio: 'pipe',
    });
  } catch (err) {
    failedAsExpected = err.status !== 0;
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  if (!failedAsExpected) {
    throw new Error('Expected validate-project to exit with non-zero code on broken project');
  }
});

// 5. Test check-assets failure on missing asset reference
runTest('check-assets should fail when a referenced asset is missing', () => {
  const tmpDir = path.join(rootDir, '.test-tmp-missing-asset');
  fs.mkdirSync(path.join(tmpDir, 'src'), { recursive: true });
  fs.writeFileSync(
    path.join(tmpDir, 'src/test.tsx'),
    'import { staticFile } from "remotion"; const logo = staticFile("does-not-exist.png");'
  );

  let failedAsExpected = false;
  try {
    execSync(`node "${path.join(rootDir, 'scripts/check-assets.js')}" "${tmpDir}"`, {
      encoding: 'utf8',
      stdio: 'pipe',
    });
  } catch (err) {
    failedAsExpected = err.status !== 0;
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  if (!failedAsExpected) {
    throw new Error('Expected check-assets to exit with non-zero code when asset is missing');
  }
});

// 6. Test inspect-output failure on non-existent file
runTest('inspect-output should fail when video file does not exist', () => {
  let failedAsExpected = false;
  try {
    execSync(`node "${path.join(rootDir, 'scripts/inspect-output.js')}" "${path.join(rootDir, 'out/non-existent-video.mp4')}"`, {
      encoding: 'utf8',
      stdio: 'pipe',
    });
  } catch (err) {
    failedAsExpected = err.status !== 0;
  }

  if (!failedAsExpected) {
    throw new Error('Expected inspect-output to fail when video does not exist');
  }
});

// 7. Verify all internal relative markdown links resolve to existing files
runTest('all internal markdown links should resolve to existing files', () => {
  function getMdFiles(dir, list = []) {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, f.name);
      if (f.isDirectory() && !['node_modules', '.git'].includes(f.name)) {
        getMdFiles(full, list);
      } else if (f.name.endsWith('.md')) {
        list.push(full);
      }
    }
    return list;
  }

  const mdFiles = getMdFiles(rootDir);
  const linkRegex = /\[[^\]]+\]\(([^)#?]+\.md)\)/g;
  const brokenLinks = [];

  mdFiles.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const target = match[1];
      if (target.startsWith('http://') || target.startsWith('https://')) continue;
      const resolved = path.resolve(path.dirname(file), target);
      if (!fs.existsSync(resolved)) {
        brokenLinks.push({ file: path.relative(rootDir, file), target, resolved });
      }
    }
  });

  if (brokenLinks.length > 0) {
    throw new Error(
      `Found broken markdown link(s):\n` +
        brokenLinks.map((b) => `  In ${b.file}: "${b.target}" does not exist`).join('\n')
    );
  }
});

console.log('\n========================================');
console.log(`Test Suite Finished: ${passed} passed, ${failed} failed`);
console.log('========================================\n');

if (failed > 0) {
  process.exit(1);
}
