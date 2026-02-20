import os
import re

folder = "."
html_files = [f for f in os.listdir(folder) if f.lower().endswith('.html')]

fixed_count = 0

for filename in html_files:
    match = re.match(r'^(\d+)', filename)
    if not match:
        continue
    
    screen_id = match.group(1)
    filepath = os.path.join(folder, filename)
    
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Check if constant already exists at top level or in some common form
    if f'const SCREEN_ID = "{screen_id}"' in content or f"const SCREEN_ID = '{screen_id}'" in content:
        continue
        
    # Heuristic: Insert after first <script> tag if not present
    script_match = re.search(r'<script>', content, re.IGNORECASE)
    if script_match:
        pos = script_match.end()
        # Insertion string
        insertion = f'\n    const SCREEN_ID = "{screen_id}";'
        new_content = content[:pos] + insertion + content[pos:]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {filename}")
        fixed_count += 1

print(f"Total files fixed: {fixed_count}")
