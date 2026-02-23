const fs = require('fs');
const path = require('path');

const HTML_DIR = '.';
const OUTPUT_DIR = 'docs/specs';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = fs.readdirSync(HTML_DIR).filter(f => f.toLowerCase().endsWith('.html'));

let count = 0;
let errors = 0;

for (const filename of files) {
  const match = filename.match(/^(\d+)/);
  if (!match) continue;
  const screenId = match[1];

  try {
    const content = fs.readFileSync(path.join(HTML_DIR, filename), 'utf-8');
    
    // Look for REQ_SPEC
    const reqMatch = content.match(/(?:const|var|let)\s+REQ_SPEC\s*=\s*(\{[\s\S]*?\});/);
    if (reqMatch) {
      let jsObjString = reqMatch[1];
      
      // We can use a simple Function to evaluate the JS object string
      // This is safe here because we are just running it locally on trusted files
      let parsedData;
      try {
        parsedData = new Function('return ' + jsObjString)();
        
        fs.writeFileSync(
          path.join(OUTPUT_DIR, `${screenId}.json`),
          JSON.stringify(parsedData, null, 2),
          'utf-8'
        );
        count++;
      } catch (e) {
        console.error(`Error parsing JS object in ${filename}:`, e.message);
        errors++;
      }
    }
  } catch (err) {
    console.error(`Error processing ${filename}:`, err.message);
  }
}

console.log(`Successfully extracted ${count} specs to docs/specs/`);
if (errors > 0) {
  console.log(`Failed to extract ${errors} specs.`);
}
