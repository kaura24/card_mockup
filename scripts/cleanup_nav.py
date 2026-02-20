import os
import re
import glob

def cleanup_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    original = content
    
    # Simple cleanup for nested ScenarioNav blocks
    # Looking for:
    # if (window.ScenarioNav) {
    #   ScenarioNav.goNext();
    # } else {
    #   if (window.ScenarioNav) {
    #     ScenarioNav.goNext();
    #   } else {
    #     ...
    #   }
    # }
    
    # The pattern is: if (window.ScenarioNav) { ScenarioNav.goNext(); } else { if (window.ScenarioNav) { ScenarioNav.goNext(); } else {
    # We want to replace the outer-most one's else content for ScenarioNav block if it exists
    
    # Actually, a simpler way is to find the LAST if (window.ScenarioNav) in a chain and keep it
    # Or just deduplicate
    
    # Regex to find the redundant pattern
    pattern = r'if \(window\.ScenarioNav\) \{\s+ScenarioNav\.goNext\(\);\s+\} else \{\s+if \(window\.ScenarioNav\) \{\s+(ScenarioNav\.goNext\(\);|ScenarioNav\.log\(.*?\);\s+ScenarioNav\.goNext\(\);)\s+\} else \{'
    
    # We can use a loop to flatten it
    while True:
        new_content = re.sub(pattern, r'if (window.ScenarioNav) {\n\1\n      } else {', content, flags=re.DOTALL)
        if new_content == content:
            break
        content = new_content

    # Specifically for 0010 style mess:
    nested_mess = re.compile(r'if \(window\.ScenarioNav\) \{\s*ScenarioNav\.log\(\'NEXT_CLICK\', \{ msg: \'.*?\' \}\);\s*ScenarioNav\.goNext\(\);\s*\} else \{\s*if \(window\.ScenarioNav\) \{\s*ScenarioNav\.goNext\(\);\s*\} else \{\s*if \(window\.ScenarioNav\) \{\s*ScenarioNav\.goNext\(\);\s*\} else \{', re.DOTALL)
    
    def mess_repl(match):
        # Keep the first log part if it exists
        inner = re.search(r"ScenarioNav\.log\('.*?'\);", match.group(0))
        log_part = f"\n            {inner.group(0)}" if inner else ""
        return f"if (window.ScenarioNav) {{{log_part}\n            ScenarioNav.goNext();\n          }} else {{"

    content = re.sub(nested_mess, mess_repl, content)

    # General cleanup for double nested if (window.ScenarioNav)
    content = re.sub(r'if \(window\.ScenarioNav\) \{\s+ScenarioNav\.goNext\(\);\s+\} else \{\s+if \(window\.ScenarioNav\) \{\s+ScenarioNav\.goNext\(\);\s+\} else \{', 
                     r'if (window.ScenarioNav) {\n          ScenarioNav.goNext();\n        } else {', content)

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
        if cleanup_file(f):
            print(f"Cleaned: {os.path.basename(f)}")
            count += 1
    print(f"Total files cleaned: {count}")
