const fs = require('fs');
const path = require('path');
const dir = 'e:/Google Drive/VIBE_class/card_mockup';

const files = fs.readdirSync(dir).filter(f => f.match(/^\d{4}.*r\.html$/i));
let count = 0;

for (const f of files) {
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Use a simpler approach to clear values
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.includes('<input') && 
           (line.includes('type="text"') || line.includes('type="tel"') || line.includes('type="number"') || line.includes('type="email"')) &&
           line.includes('value="') && 
           !line.includes('readonly') && 
           !line.includes('disabled')) {
            
            // Replace `value="something"` with `value=""`
            let newVal = line.replace(/value="[^"]*"/g, 'value=""');
            if (line !== newVal) {
                lines[i] = newVal;
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        count++;
        console.log('Cleared values in:', f);
    }
}
console.log('Total files modified:', count);
