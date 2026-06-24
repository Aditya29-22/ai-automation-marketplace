const fs = require('fs');

const dts = fs.readFileSync('node_modules/@animateicons/react/dist/lucide.d.ts', 'utf8');
const exportsMatches = [...dts.matchAll(/([A-Z][a-zA-Z0-9]+)Icon\b/g)];
const animatedIcons = Array.from(new Set(exportsMatches.map(m => m[1])));

let fileContent = `import React, { useEffect, useRef } from 'react';\n`;
fileContent += `import * as AnimatedIcons from '@animateicons/react/lucide';\n\n`;

fileContent += `function withAutoAnimate(IconComponent: any) {
  return React.forwardRef((props: any, ref) => {
    const localRef = useRef<any>(null);
    useEffect(() => {
      if (!localRef.current) return;
      const animate = () => {
        localRef.current?.startAnimation?.();
      };
      // Delay initial trigger slightly to ensure DOM is ready
      setTimeout(animate, 50);
      const interval = setInterval(animate, 3000); 
      return () => clearInterval(interval);
    }, []);

    return <IconComponent {...props} ref={(node: any) => {
      localRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as any).current = node;
    }} />;
  });
}\n\n`;

for (const icon of animatedIcons) {
  fileContent += `export const ${icon}Icon = withAutoAnimate(AnimatedIcons.${icon}Icon);\n`;
}

fs.writeFileSync('src/lib/icons.tsx', fileContent, 'utf8');
console.log('Generated src/lib/icons.tsx');
