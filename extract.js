const fs = require('fs');
const dir = 'e:/Google Drive/VIBE_class/card_mockup';
const files = fs.readdirSync(dir).filter(f => /^00\d{2}(?:_r)?\.html$/i.test(f)).sort();

let md = '## 3. 전체 화면 분류 및 수집 데이터 매핑\n\n';
md += '| 화면번호 | 화면명 | 화면 성격(입력/안내/확인) | 수집되는 데이터 정보 (Action/Purpose) |\n';
md += '| :--- | :--- | :--- | :--- |\n';

for (const f of files) {
    try {
        const content = fs.readFileSync(dir + '/' + f, 'utf8');
        const nameMatch = content.match(/SCREEN_NAME\s*=\s*(["'])(.*?)\1/);
        const actionMatch = content.match(/action:\s*(["'])(.*?)\1/);
        const purposeMatch = content.match(/purpose:\s*(["'])(.*?)\1/);

        let title = '알수없음';
        if (nameMatch) {
            title = nameMatch[2];
        } else {
            const titleMatch = content.match(/<title>(.*?)<\/title>/);
            if (titleMatch) title = titleMatch[1].replace('KB국민카드 | ', '').replace(/\(\d{4}\)/, '').trim();
        }

        let action = actionMatch ? actionMatch[2] : '';
        let purpose = purposeMatch ? purposeMatch[2] : '';

        let category = '입력(Input)'; // Default assumption for the flow
        if (action.includes('조회')) category = '확인(Confirmation)';
        if (title.includes('확인용')) category = '확인(Confirmation)';
        if (title.includes('완료') || title.includes('결과')) category = '확인(Confirmation)';
        if (title.includes('유의') || title.includes('안내') || title.includes('포인트')) category = '안내(Notice)';

        // Manual mapping from user feedback
        if (f.startsWith('0025') || f.startsWith('0026')) category = '입력(Input)';
        if (f.startsWith('0030') || f.startsWith('0031')) category = '확인(Confirmation)';

        let info = (action ? `[${action}] ` : '') + (purpose ? purpose : '');
        if (!info || info === ' ') info = '단순 안내 및 화면 이동';

        // Clean up text
        title = title.replace(/\|/g, '\\|');
        info = info.replace(/\|/g, '\\|').replace(/\n/g, ' ');

        md += `| ${f.split('_')[0]} | ${title} | **${category}** | ${info} |\n`;
    } catch (e) {
        console.error(e);
    }
}

fs.writeFileSync('C:/Users/KBCARD/.gemini/antigravity/brain/29b71cda-8639-4d41-b7cd-42e696e64204/screen_catalog.md', md);
console.log('Complete');
