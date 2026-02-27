#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ENABLE_CHECK = false; // Set to false to disable file size checking
const MAX_SIZE_KB = 1400;
const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024;

if (!ENABLE_CHECK) {
  console.log('⚠️  File size check disabled');
  process.exit(0);
}

function checkDirectory(dir, largeFiles = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file)) {
        checkDirectory(filePath, largeFiles);
      }
    } else {
      if (stat.size > MAX_SIZE_BYTES) {
        largeFiles.push({
          path: filePath,
          size: (stat.size / 1024).toFixed(2)
        });
      }
    }
  });

  return largeFiles;
}

const largeFiles = checkDirectory(process.cwd());

if (largeFiles.length > 0) {
  console.error(`\n❌ Found ${largeFiles.length} file(s) larger than ${MAX_SIZE_KB}KB:\n`);
  largeFiles.forEach(file => {
    console.error(`  ${file.path} (${file.size}KB)`);
  });
  console.error(`\n⚠️  Deployment blocked. Please compress or remove large files.\n`);
  process.exit(1);
}

console.log(`✅ All files are under ${MAX_SIZE_KB}KB`);
process.exit(0);
