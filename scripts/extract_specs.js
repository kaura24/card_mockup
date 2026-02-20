const fs = require('fs');
const path = require('path');

const HTML_DIR = '.';
const OUTPUT_DIR = 'docs/specs';

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = fs.readdirSync(HTML_DIR);
console.log(`Scanning ${files.length} files...`);

let successCount = 0;

files.forEach(file => {
    if (!file.match(/^\d{4}_r\.html$/i)) return;

    try {
        const content = fs.readFileSync(path.join(HTML_DIR, file), 'utf8');
        const screenIdMatch = file.match(/^(\d+)/);
        if (!screenIdMatch) return;
        const screenId = screenIdMatch[1];

        // Extract internal SCREEN_ID, SCREEN_NAME, CHANNEL
        const idMatch = content.match(/(?:const|var|let)\s+SCREEN_ID\s*=\s*(["'])(.*?)\1/);
        const nameMatch = content.match(/(?:const|var|let)\s+SCREEN_NAME\s*=\s*(["'])(.*?)\1/);
        const channelMatch = content.match(/(?:const|var|let)\s+CHANNEL\s*=\s*(["'])(.*?)\1/);

        const internalId = idMatch ? idMatch[2] : screenId;
        const internalName = nameMatch ? nameMatch[2] : "Unknown";
        const internalChannel = channelMatch ? channelMatch[2] : "PC"; // Default to PC if not found

        // Find REQ_SPEC
        const startMarker = 'const REQ_SPEC =';
        const startIndex = content.indexOf(startMarker);

        if (startIndex !== -1) {
            // Find opening brace
            let braceStart = content.indexOf('{', startIndex);
            if (braceStart !== -1) {
                // Find matching closing brace
                let braceCount = 1;
                let endIndex = braceStart + 1;
                while (braceCount > 0 && endIndex < content.length) {
                    if (content[endIndex] === '{') braceCount++;
                    else if (content[endIndex] === '}') braceCount--;
                    endIndex++;
                }

                if (braceCount === 0) {
                    const objectStr = content.substr(braceStart, endIndex - braceStart + 1);

                    // Create context
                    const code = `
                        const SCREEN_ID = "${internalId}";
                        const SCREEN_NAME = "${internalName}";
                        const CHANNEL = "${internalChannel}";
                        return ${objectStr};
                    `;

                    try {
                        const getSpec = new Function(code);
                        const spec = getSpec();

                        fs.writeFileSync(
                            path.join(OUTPUT_DIR, `${screenId}.json`),
                            JSON.stringify(spec, null, 2),
                            'utf8'
                        );
                        console.log(`✅ Extracted ${screenId}`);
                        successCount++;
                    } catch (e) {
                        console.error(`❌ Eval Error ${screenId}: ${e.message}`);
                    }
                }
            }
        }
    } catch (e) {
        console.error(`File Error ${file}: ${e.message}`);
    }
});

console.log(`Done. ${successCount} specs extracted.`);
