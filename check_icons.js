const fs = require('fs');
const dts = fs.readFileSync('node_modules/@animateicons/react/dist/lucide.d.ts', 'utf8');
const exportsMatches = [...dts.matchAll(/([A-Z][a-zA-Z0-9]+Icon)\b/g)];
const exportedIcons = new Set(exportsMatches.map(m => m[1]));

const glob = require('glob'); // Not available? I'll just hardcode or grep the imports.
console.log('Total animated icons:', exportedIcons.size);
