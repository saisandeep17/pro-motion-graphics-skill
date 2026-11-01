#!/usr/bin/env node

/**
 * inspect-output (Pro Motion Graphics V2)
 *
 * Validates rendered video output files (existence, non-zero size, container headers).
 * When ffprobe is installed, inspects exact resolution, framerate, duration,
 * codecs, and audio streams.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { logPass, logFail, logWarn, logInfo, fileExists } = require('./lib/utils');

const args = process.argv.slice(2);
let videoFile = null;
let expectedWidth = null;
let expectedHeight = null;
let expectedFps = null;
let requireAudio = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--width' && args[i + 1]) expectedWidth = parseInt(args[++i], 10);
  else if (args[i] === '--height' && args[i + 1]) expectedHeight = parseInt(args[++i], 10);
  else if (args[i] === '--fps' && args[i + 1]) expectedFps = parseFloat(args[++i]);
  else if (args[i] === '--require-audio') requireAudio = true;
  else if (!videoFile && !args[i].startsWith('--')) videoFile = args[i];
}

videoFile = videoFile ? path.resolve(videoFile) : path.resolve('out/video.mp4');

console.log(`\n--- Inspecting Video Output: ${videoFile} ---`);

let errors = 0;
let warnings = 0;

// 1. File existence check
if (!fileExists(videoFile)) {
  logFail(`Video output file does not exist: ${videoFile}`);
  process.exit(1);
}

// 2. File size check
const stats = fs.statSync(videoFile);
const sizeInMB = stats.size / (1024 * 1024);

if (stats.size === 0) {
  logFail('Video output file is completely empty (0 bytes).');
  process.exit(1);
} else if (sizeInMB < 0.05) {
  logWarn(`Video file size is suspiciously small (${(stats.size / 1024).toFixed(1)} KB). Possible truncated render.`);
  warnings++;
} else {
  logPass(`File exists and is non-empty (${sizeInMB.toFixed(2)} MB).`);
}

// 3. Container Magic Header Check (MP4 / WebM / QuickTime)
try {
  const fd = fs.openSync(videoFile, 'r');
  const buffer = Buffer.alloc(16);
  fs.readSync(fd, buffer, 0, 16, 0);
  fs.closeSync(fd);

  const headerStr = buffer.toString('binary');
  const isMp4 = headerStr.includes('ftyp') || headerStr.includes('isom') || headerStr.includes('mp42');
  const isWebM = buffer[0] === 0x1a && buffer[1] === 0x45 && buffer[2] === 0xdf && buffer[3] === 0xa3;
  const isQuickTime = headerStr.includes('moov') || headerStr.includes('wide') || headerStr.includes('mdat');

  if (isMp4 || isWebM || isQuickTime) {
    logPass(`Valid media container signature detected (${isMp4 ? 'MP4' : isWebM ? 'WebM' : 'QuickTime'}).`);
  } else {
    logWarn('Unrecognized video container signature. File may be unfinalized.');
    warnings++;
  }
} catch (err) {
  logWarn(`Unable to inspect container header bytes: ${err.message}`);
  warnings++;
}

// 4. Deep Inspection with ffprobe (if available)
let hasFfprobe = false;
try {
  execSync('ffprobe -version', { stdio: 'ignore' });
  hasFfprobe = true;
} catch {
  hasFfprobe = false;
}

if (!hasFfprobe) {
  logWarn('ffprobe is not installed or not in PATH.');
  logWarn('Skipping deep stream inspection (resolution, framerate, duration, audio track).');
  console.log(`\n--- Inspection Result ---`);
  if (errors === 0) {
    console.log(`✔ Basic file checks PASSED with ${warnings} warning(s).`);
    console.log(`Note: Install ffprobe/ffmpeg to enable deep stream validation.`);
    process.exit(0);
  } else {
    logFail(`Inspection failed with ${errors} error(s).`);
    process.exit(1);
  }
}

// ffprobe is available: run deep inspection
try {
  const cmd = `ffprobe -v quiet -print_format json -show_format -show_streams "${videoFile}"`;
  const probeOutput = JSON.parse(execSync(cmd, { encoding: 'utf8' }));

  const videoStream = probeOutput.streams.find((s) => s.codec_type === 'video');
  const audioStream = probeOutput.streams.find((s) => s.codec_type === 'audio');

  if (!videoStream) {
    logFail('No video stream found inside media container!');
    errors++;
  } else {
    const width = videoStream.width;
    const height = videoStream.height;
    const codec = videoStream.codec_name;
    const duration = parseFloat(probeOutput.format.duration || videoStream.duration || 0);

    // Frame rate calculation
    let fps = 0;
    if (videoStream.r_frame_rate) {
      const parts = videoStream.r_frame_rate.split('/');
      fps = parts.length === 2 && parseFloat(parts[1]) > 0 ? parseFloat(parts[0]) / parseFloat(parts[1]) : parseFloat(parts[0]);
    }

    logPass(`Video Stream: ${width}x${height} @ ${fps.toFixed(2)} fps | Codec: ${codec} | Duration: ${duration.toFixed(2)}s`);

    // Verify expectations
    if (expectedWidth && width !== expectedWidth) {
      logFail(`Resolution width mismatch: expected ${expectedWidth}px, got ${width}px`);
      errors++;
    }
    if (expectedHeight && height !== expectedHeight) {
      logFail(`Resolution height mismatch: expected ${expectedHeight}px, got ${height}px`);
      errors++;
    }
    if (expectedFps && Math.abs(fps - expectedFps) > 0.5) {
      logFail(`FPS mismatch: expected ~${expectedFps} fps, got ${fps.toFixed(2)} fps`);
      errors++;
    }
  }

  if (requireAudio) {
    if (!audioStream) {
      logFail('Audio stream was required (--require-audio), but no audio stream was found.');
      errors++;
    } else {
      logPass(`Audio Stream: ${audioStream.codec_name} | Channels: ${audioStream.channels} | Sample Rate: ${audioStream.sample_rate} Hz`);
    }
  } else if (audioStream) {
    logInfo(`Audio Stream present: ${audioStream.codec_name} (${audioStream.channels} ch)`);
  }
} catch (err) {
  logFail(`Failed to execute ffprobe: ${err.message}`);
  errors++;
}

// Summary
console.log(`\n--- Inspection Result ---`);
if (errors === 0) {
  logPass(`Video validation PASSED! (${warnings} warnings)`);
  process.exit(0);
} else {
  logFail(`Video validation FAILED with ${errors} error(s) and ${warnings} warning(s).`);
  process.exit(1);
}

