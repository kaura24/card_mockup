import os
import re
import json
from collections import defaultdict

folder = "."
html_files = sorted([f for f in os.listdir(folder) if f.lower().endswith('.html') and '_r' in f.lower()])

schema = defaultdict(list)
all_fields = {}

def clean_field_name(name):
    # CamelCase to snake_case if needed, or just keep as is but clean up
    return re.sub(r'[^a-zA-Z0-9_]', '', name)

print(f"Analyzing {len(html_files)} files...")

for filename in html_files:
    filepath = os.path.join(folder, filename)
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {filename}: {e}")
        continue
    
    screen_id = "UNKNOWN"
    m = re.match(r'^(\d+)', filename)
    if m:
        screen_id = m.group(1)
    
    # 1. Try finding REQ_SPEC
    req_spec_match = re.search(r'const\s+REQ_SPEC\s*=\s*(\{[\s\S]*?\});', content)
    fields = []
    
    if req_spec_match:
        req_spec_raw = req_spec_match.group(1)
        # Extract required_fields array
        # This is a bit hacky parsing JS object as JSON, but works for simple cases
        # We'll use regex to find keys in required_fields
        field_matches = re.findall(r'key:\s*["\'](\w+)["\']', req_spec_raw)
        
        for fm in field_matches:
            fields.append({
                "name": fm,
                "source": "REQ_SPEC",
                "type": "string" # Default
            })
            
    # 2. If REQ_SPEC yields nothing or little, scan HTML inputs
    if not fields:
        # data-field attributes
        data_fields = re.findall(r'data-field=["\']([^"\']+)["\']', content)
        for df in data_fields:
            fields.append({"name": df, "source": "data-field", "type": "string"})
            
        # IDs of inputs if no data-field
        if not data_fields:
            input_ids = re.findall(r'<input[^>]+id=["\']([^"\']+)["\']', content)
            for iid in input_ids:
                # Filter out likely non-data IDs (btns, etc) - though input usually is data
                if 'btn' not in iid.lower():
                    fields.append({"name": iid, "source": "id", "type": "string"})
    
    # Clean up and register
    for field in fields:
        fname = clean_field_name(field['name'])
        if fname not in all_fields:
            all_fields[fname] = {
                "name": fname,
                "used_in": [],
                "description": "",
                "type": "VARCHAR(255)"
            }
        if screen_id not in all_fields[fname]['used_in']:
            all_fields[fname]['used_in'].append(screen_id)

    schema[screen_id] = [f['name'] for f in fields]

# Generate Schema output
print(f"Found {len(all_fields)} unique fields across {len(schema)} screens.")

# Classify fields into logic groups (Heuristic)
ledger_columns = []
for fname, info in sorted(all_fields.items()):
    col_def = f"{fname} {info['type']}"
    ledger_columns.append(col_def)

# Output detailed report
with open("ledger_schema_analysis.json", "w", encoding="utf-8") as f:
    json.dump({
        "screens": schema,
        "fields": all_fields
    }, f, indent=2, ensure_ascii=False)

print("Schema analysis saved to ledger_schema_analysis.json")
