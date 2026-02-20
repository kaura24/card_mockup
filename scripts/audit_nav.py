import os
import re
import glob

def audit_nav(root_dir):
    html_files = glob.glob(os.path.join(root_dir, "[0-9][0-9][0-9][0-9]*.html"), recursive=False)
    html_files += glob.glob(os.path.join(root_dir, "[0-9][0-9][0-9][0-9]*.HTML"), recursive=False)
    
    results = []
    
    for f in html_files:
        with open(f, 'r', encoding='utf-8', errors='ignore') as file:
            content = file.read()
            
            nav_patterns = []
            if "location.hash =" in content: nav_patterns.append("location.hash")
            if "location.href =" in content: nav_patterns.append("location.href")
            if "window.location =" in content: nav_patterns.append("window.location")
            if "_sc-next-btn" in content and "ScenarioNav.goNext" not in content:
                nav_patterns.append("raw_next_btn")
            
            if nav_patterns:
                results.append(f"{os.path.basename(f)}: {', '.join(nav_patterns)}")
                
    return results

if __name__ == "__main__":
    root = r"e:\Google Drive\VIBE_class\card_mockup"
    audit_results = audit_nav(root)
    for res in audit_results:
        print(res)
