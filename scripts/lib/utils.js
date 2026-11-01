/**
 * Pro Motion Graphics Validation Script Utilities
 */
const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

function logPass(msg) {
  console.log(`${COLORS.green}✔ PASS:${COLORS.reset} ${msg}`);
}

function logFail(msg) {
  console.error(`${COLORS.red}✖ FAIL:${COLORS.reset} ${msg}`);
}

function logWarn(msg) {
  console.warn(`${COLORS.yellow}▲ WARN:${COLORS.reset} ${msg}`);
}

function logInfo(msg) {
  console.log(`${COLORS.blue}ℹ INFO:${COLORS.reset} ${msg}`);
}

function fileExists(filePath) {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function dirExists(dirPath) {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

module.exports = {
  COLORS,
  logPass,
  logFail,
  logWarn,
  logInfo,
  fileExists,
  dirExists,
};
