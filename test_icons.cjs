async function run() {
  const mod = await import('./src/lib/icons.tsx');
  for (const [key, value] of Object.entries(mod)) {
    if (value === undefined || value === null) {
      console.log('UNDEFINED EXPORT:', key);
    }
  }
  console.log('Done checking exports');
}
run();
