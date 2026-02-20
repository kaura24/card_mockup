import re

with open('0003_r.HTML', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

patterns = [
    ('const SCREEN_ID', r'const\s+SCREEN_ID\s*=\s*["\'](\w+)["\']'),
    ('var SCREEN_ID',   r'var\s+SCREEN_ID\s*=\s*["\'](\w+)["\']'),
    ('SCREEN_ID:',      r'screen_id["\']?\s*:\s*["\'](\w+)["\']'),
]

found = False
for label, p in patterns:
    m = re.search(p, content)
    if m:
        print(f'[{label}] Found: {m.group(1)}')
        found = True

if not found:
    print('No SCREEN_ID found in 0003_r.HTML')
    # Show script section start
    idx = content.find('<script')
    if idx >= 0:
        print('\nFirst 600 chars of <script> section:')
        print(content[idx:idx+600])
    else:
        print('No <script> tag found at all')
