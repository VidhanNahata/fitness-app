const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      searchDir(filePath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
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

searchDir('src');
console.log('Search completed.');
