import os
import re
import glob

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Skip files that already use ScenarioNav.goNext
    # But if it's already fixed, we don't want to double fix.
    if "ScenarioNav.goNext" in content and "ScenarioNav.goPrev" in content:
        # Check if there are STILL unfixed ones
        if "location.hash =" not in content and "goTo(" not in content:
             return False

    original = content
    
    # Replacement function to wrap any navigation line with ScenarioNav check
    def nav_wrap(match):
        indent = match.group(1)
        original_line = match.group(2).strip()
        
        # Decide if it's Next or Prev
        # Default to Next unless "prev" is in the line
        nav_type = "goPrev" if "prev" in original_line.lower() else "goNext"
        
        # For branch targets, we'll log the target
        log_snippet = ""
        if "branchTargets" in original_line:
            target_match = re.search(r'branchTargets\.(\w+)', original_line)
            if target_match:
                log_snippet = f"ScenarioNav.log('BRANCH_SELECT', {{ branch: '{target_match.group(1)}' }}); "

        return f"{indent}if (window.ScenarioNav) {{\n{indent}  {log_snippet}ScenarioNav.{nav_type}();\n{indent}}} else {{\n{indent}  {original_line}\n{indent}}}"

    # 1. Matches: goTo(any_target);
    content = re.sub(r'^(\s*)(goTo\(.*?\);)', nav_wrap, content, flags=re.MULTILINE)
    
    # 2. Matches: location.hash = "#/XXXX";
    content = re.sub(r'^(\s*)(location\.hash\s*=\s*["\']#/\d+["\'];)', nav_wrap, content, flags=re.MULTILINE)

    # 3. Matches: setTimeout(() => goTo(...), 200);
    content = re.sub(r'^(\s*)(setTimeout\(\(\)\s*=>\s*goTo\(.*?\),\s*\d+\);)', nav_wrap, content, flags=re.MULTILINE)
    
    # 4. Matches: setTimeout(() => { goTo(...); }, 200);
    content = re.sub(r'^(\s*)(setTimeout\(\(\)\s*=>\s*\{\s*goTo\(.*?\);\s*\}, \d+\);)', nav_wrap, content, flags=re.MULTILINE)

    # 5. Matches: location.href = "XXXX.html?...";
    content = re.sub(r'^(\s*)(location\.href\s*=\s*.*?(\d{4}|integrated_flow|scenario).*?;)', nav_wrap, content, flags=re.MULTILINE)

    # 6. Matches: _sc-next-btn.click()
    def next_btn_repl(match):
        indent = match.group(1)
        original_line = match.group(2).strip()
        return f"{indent}if (window.ScenarioNav) {{\n{indent}  ScenarioNav.goNext();\n{indent}}} else {{\n{indent}  {original_line}\n{indent}}}"
    
    content = re.sub(r'^(\s*)(.*?_sc-next-btn.*?\.click\(\);)', next_btn_repl, content, flags=re.MULTILINE)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

if __name__ == "__main__":
    root = r"e:\Google Drive\VIBE_class\card_mockup"
    html_files = glob.glob(os.path.join(root, "[0-9][0-9][0-9][0-9]*.html"), recursive=False)
    html_files += glob.glob(os.path.join(root, "[0-9][0-9][0-9][0-9]*.HTML"), recursive=False)
    
    count = 0
    for f in html_files:
        if fix_file(f):
            print(f"Fixed: {os.path.basename(f)}")
            count += 1
    print(f"Total files fixed: {count}")
