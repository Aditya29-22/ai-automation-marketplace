const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Calculate relative path to lib/icons
      const depth = fullPath.split(path.sep).length - 2; // src/components/File.tsx -> depth 1
      const relativePath = depth === 0 ? './lib/icons' : '../'.repeat(depth) + 'lib/icons';
      
      const animateImportRegex = /import\s+\{([^}]+)\}\s+from\s+['"]@animateicons\/react\/lucide['"];?/g;
      
      let modified = false;
      content = content.replace(animateImportRegex, (match, importsStr) => {
        modified = true;
        return `import { ${importsStr} } from '${relativePath}';`;
      });
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir('src');
