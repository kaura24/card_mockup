import os
import re
import json
import glob

# Configuration
HTML_DIR = "."
OUTPUT_DIR = "docs/specs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def extract_json_spec():
    html_files = sorted(glob.glob(os.path.join(HTML_DIR, "*_r.html")) + glob.glob(os.path.join(HTML_DIR, "*_r.HTML")))
    
    print(f"Found {len(html_files)} HTML files.")
    
    count = 0
    for filepath in html_files:
        filename = os.path.basename(filepath)
        
        # Extract Screen ID
        m = re.match(r'^(\d+)', filename)
        if not m:
            continue
        screen_id = m.group(1)
        
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
        except Exception as e:
            print(f"Error reading {filename}: {e}")
            continue

        # Extract REQ_SPEC object string
        # Pattern matches: const REQ_SPEC = { ... };
        # We need to capture the content inside { ... } carefully
        # Simple regex might fail with nested braces, but let's try a robust one or simple assumption
        # Assumption: REQ_SPEC is defined as `const REQ_SPEC = { ... };` and ends with `};`
        
        req_match = re.search(r'(?:const|var|let)\s+REQ_SPEC\s*=\s*(\{[\s\S]*?\});', content)
        
        if req_match:
            json_str = req_match.group(1)
            
            # Convert JS object literal to JSON
            # 1. Quote keys (key: -> "key":)
            # 2. Convert single quotes to double quotes (if any)
            # 3. Handle comments (remove // and /* */)
            
            # Remove comments
            json_str = re.sub(r'//.*', '', json_str)
            json_str = re.sub(r'/\*[\s\S]*?\*/', '', json_str)
            
            # Quote keys:  domain: "..."  ->  "domain": "..."
            # Look for keys that are not in quotes
            json_str = re.sub(r'([{,]\s*)([a-zA-Z0-9_]+)\s*:', r'\1"\2":', json_str)
            
            # Fix trailing commas (not allowed in JSON)
            json_str = re.sub(r',\s*([}\]])', r'\1', json_str)
            
            try:
                # Try parsing as JSON
                data = json.loads(json_str)
                
                # Save to file
                out_path = os.path.join(OUTPUT_DIR, f"{screen_id}.json")
                with open(out_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                
                print(f"Extracted spec for {screen_id}")
                count += 1
                
            except json.JSONDecodeError as e:
                print(f"Failed to parse JSON for {screen_id}: {e}")
                # print(json_str[:200]) # Debug
        else:
            # print(f"No REQ_SPEC found in {filename}")
            pass

    print(f"Successfully extracted {count} specs.")

if __name__ == "__main__":
    extract_json_spec()
