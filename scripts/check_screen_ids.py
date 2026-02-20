import os
import re
import sys

folder = "."
html_files = sorted([f for f in os.listdir(folder) if f.lower().endswith('.html')])

# Deduplicate case-insensitively
seen = {}
unique_files = []
for f in html_files:
    key = f.lower()
    if key not in seen:
        seen[key] = f
        unique_files.append(f)
html_files = unique_files

results = []
mismatches = []

for filename in html_files:
    filepath = os.path.join(folder, filename)
    match = re.match(r'^(\d+)', filename)
    expected_id = match.group(1) if match else "???"

    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        results.append(f"{filename:<22} {'읽기오류':<22} FAIL")
        mismatches.append((filename, expected_id, "읽기오류"))
        continue

    found_id = None
    patterns = [
        # 기존 방식: const SCREEN_ID = "0003"
        r'(?:const|var|let)\s+SCREEN_ID\s*=\s*["\'](\w+)["\']',
        # 리팩토링 방식: const META = { screenId: "0003", ... }
        r'screenId\s*:\s*["\'](\w+)["\']',
        r'screenid\s*:\s*["\'](\w+)["\']',
        # HTML meta 태그: <meta name="screen-id" content="0003">
        r'<meta\s[^>]*name=["\']screen-id["\'][^>]*content=["\'](\w+)["\']',
        r'<meta\s[^>]*content=["\'](\w+)["\'][^>]*name=["\']screen-id["\']',
        # title 태그: <title>KB국민카드 | 준비사항 (0004)</title>
        r'<title>[^<]*\((\d{4})\)[^<]*</title>',
        # 기타 패턴
        r'"screen_id"\s*:\s*"(\w+)"',
        r"'screen_id'\s*:\s*'(\w+)'",
        r'screen_id\s*:\s*["\'](\w+)["\']',
    ]
    for pattern in patterns:
        m = re.search(pattern, content, re.IGNORECASE)
        if m:
            found_id = m.group(1)
            break

    if found_id:
        found_num = re.sub(r'[^0-9]', '', found_id)
        is_match = found_num == expected_id
        status = "OK" if is_match else "MISMATCH"
        if not is_match:
            mismatches.append((filename, expected_id, found_id))
        results.append(f"{filename:<22} {found_id:<22} {status}")
    else:
        results.append(f"{filename:<22} {'ID없음':<22} CHECK")
        mismatches.append((filename, expected_id, "ID없음"))

output = "\n".join(results)
output += f"\n\n총 파일: {len(html_files)}\n"
if mismatches:
    output += f"\n불일치/확인필요 ({len(mismatches)}개):\n"
    for fname, exp, got in mismatches:
        output += f"  {fname}: 파일명={exp}, 내부ID={got}\n"
else:
    output += "모든 파일 일치!\n"

with open("screen_id_check.txt", "w", encoding="utf-8") as f:
    f.write(output)

print("Done. Results written to screen_id_check.txt")
print(f"Total: {len(html_files)}, Issues: {len(mismatches)}")
