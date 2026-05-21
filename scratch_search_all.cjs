const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  if (dir.includes('node_modules') || dir.includes('.git') || dir.includes('dist')) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      searchDir(filePath);
    } else {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.toLowerCase().includes('thursday') || line.toLowerCase().includes('\'thu\'') || line.toLowerCase().includes('"thu"')) {
          console.log(`Found in ${filePath}:${index + 1}: ${line.trim()}`);
        }
      });
    }
  }
}

searchDir('.');
console.log('Search completed.');
