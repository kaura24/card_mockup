import os
import re
import json
import glob

# For cases where our regex failed, we can use a small Python script that removes the "REQ_SPEC =" part
# and runs it through a minimalist JavaScript engine if available, or just writes a small HTML file
# and opens it to dump the JSON.
HTML_DIR = "."
OUTPUT_DIR = "docs/specs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

html_files = sorted(glob.glob(os.path.join(HTML_DIR, "*_r.html")) + glob.glob(os.path.join(HTML_DIR, "*_r.HTML")))

# We can create a single master HTML file that loads all the HTML files in iframes and extracts REQ_SPEC,
# but since executing JS locally on 70+ files is tricky without node, let's just make a script that
# uses Python's built-in web browser or just regex to aggressively extract the raw string and strip
# variables by replacing them with '"Dymamic"'

def aggressive_fallback_parse(js_str):
    # Strip comments
    js_str = re.sub(r'//.*', '', js_str)
    js_str = re.sub(r'/\*[\s\S]*?\*/', '', js_str)
    
    # 1. Replace ALL non-quoted words before a colon with quotes
    js_str = re.sub(r'([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:', r'\1"\2":', js_str)
    
    # 2. Replace all template literal `...` with "..."
    js_str = re.sub(r'`([^`]*)`', r'"\1"', js_str)

    # 3. Handle string interpolation ${...} by removing it 
    js_str = re.sub(r'\$\{([^}]+)\}', r'', js_str)

    # 4. Any value that is not a string, number, true, false, null, {}, [] gets replaced with "DYNAMIC_VAL"
    # This is extremely aggressive but ensures valid JSON.
    # We look for: ": [SOMETHING]," or ": [SOMETHING]}"
    # We'll just replace unquoted expressions with "[Dynamic]"
    
    # Replace variable expressions like META.id or DOCS.map(...)
    js_str = re.sub(r':\s*([a-zA-Z_$][a-zA-Z0-9_$.]*(\([^)]*\))?)', r': "\1"', js_str)
    # The above regex: matches a colon, spaces, then an identifier that might have dots and might end with ()
    
    # Now fix words that shouldn't be quoted like "true", "false", "null"
    js_str = re.sub(r':\s*"+(true|false|null)"+', r': \1', js_str)
    
    # Replace functions like () => ... or function() ...
    js_str = re.sub(r':\s*"\([^)]*\)\s*=>\s*\{[^}]*\}"', r': "[Function]"', js_str)
    js_str = re.sub(r':\s*"function\s*\([^)]*\)\s*\{[^}]*\}"', r': "[Function]"', js_str)

    # Remove trailing commas
    js_str = re.sub(r',\s*([}\]])', r'\1', js_str)
    
    # Clean single quotes
    js_str = re.sub(r"(?<!\\)'(.*?)(?<!\\)'", r'"\1"', js_str)

    # Fix consecutive quotes
    js_str = re.sub(r'""', r'"', js_str)

    return js_str

count = 0
errors = 0

for filepath in html_files:
    filename = os.path.basename(filepath)
    m = re.match(r'^(\d+)', filename)
    if not m:
        continue
    screen_id = m.group(1)
    
    if os.path.exists(os.path.join(OUTPUT_DIR, f"{screen_id}.json")):
        # Skip successfully parsed ones
        continue
        
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except:
        continue
        
    req_match = re.search(r'(?:const|var|let)\s+REQ_SPEC\s*=\s*(\{[\s\S]*?\});', content)
    
    if req_match:
        raw_js = req_match.group(1)
        fixed_json = aggressive_fallback_parse(raw_js)
        
        try:
            data = json.loads(fixed_json)
            with open(os.path.join(OUTPUT_DIR, f"{screen_id}.json"), 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print(f"Aggressively fixed {screen_id}")
            count += 1
        except Exception as e:
            print(f"Still failed {screen_id}: {e}")
            errors += 1
            with open(f"error_debug_{screen_id}.txt", "w", encoding='utf-8') as dbg:
                dbg.write(fixed_json)

print(f"Fixed {count} files. {errors} remaining.")
