const fs = require('fs');
const path = require('path');

const dts = fs.readFileSync('node_modules/@animateicons/react/dist/lucide.d.ts', 'utf8');
const exportsMatches = [...dts.matchAll(/([A-Z][a-zA-Z0-9]+)Icon\b/g)];
// Get names like Flame, Zap, ArrowRight without the Icon suffix
const animatedIcons = new Set(exportsMatches.map(m => m[1]));

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const lucideImportRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];?/g;
      
      let modified = false;
      content = content.replace(lucideImportRegex, (match, importsStr) => {
        const icons = importsStr.split(',').map(s => s.trim()).filter(Boolean);
        const animated = [];
        const fallback = [];
        
        for (const icon of icons) {
          if (animatedIcons.has(icon)) {
            animated.push(`${icon}Icon as ${icon}`);
          } else {
            fallback.push(icon);
          }
        }
        
        if (animated.length > 0) {
          modified = true;
          let result = `import { ${animated.join(', ')} } from '@animateicons/react/lucide';\n`;
          if (fallback.length > 0) {
            result += `import { ${fallback.join(', ')} } from 'lucide-react';`;
          }
          return result;
        }
        
        return match;
      });
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir('src');
