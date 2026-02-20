"""
inject_common_css.py
Adds <link rel="stylesheet" href="css/common.css" /> to every HTML
screen file that already references css/kb-theme.css but does NOT
yet reference css/common.css.
"""
import os, glob, re

root = r'e:\Google Drive\VIBE_class\card_mockup'
files = glob.glob(os.path.join(root, '[0-9][0-9][0-9][0-9]*.html'))
files += glob.glob(os.path.join(root, '[0-9][0-9][0-9][0-9]*.HTML'))

THEME_LINK = 'kb-theme.css'
COMMON_LINK = 'common.css'
INSERT = '  <link rel="stylesheet" href="css/common.css" />\n'

patched = 0
for f in sorted(files):
    with open(f, 'r', encoding='utf-8', errors='ignore') as fh:
        content = fh.read()

    if THEME_LINK not in content:
        continue          # no theme link – skip
    if COMMON_LINK in content:
        continue          # already has common.css – skip

    # Insert common.css right after kb-theme.css link
    new_content = content.replace(
        '<link rel="stylesheet" href="css/kb-theme.css" />',
        '<link rel="stylesheet" href="css/kb-theme.css" />\n' + INSERT.rstrip('\n'),
        1   # only first occurrence
    )
    if new_content == content:
        # try alternate quote style / no trailing slash
        new_content = re.sub(
            r'(<link[^>]*kb-theme\.css[^>]*>)',
            r'\1\n' + INSERT.rstrip('\n'),
            content, count=1
        )

    if new_content != content:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(new_content)
        print(f'Patched: {os.path.basename(f)}')
        patched += 1
    else:
        print(f'SKIP (no match): {os.path.basename(f)}')

print(f'\nTotal patched: {patched}')
