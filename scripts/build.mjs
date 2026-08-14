// Build script - copies public files to dist
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../public');
const dest = path.resolve(__dirname, '../dist');

// Ensure destination exists
if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
}

// Copy all files
function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(src, dest);
console.log(`Built static assets to ${dest}`);
