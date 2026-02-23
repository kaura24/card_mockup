import os
import json
from pathlib import Path

def main():
    base_dir = Path(__file__).resolve().parent.parent
    specs_dir = base_dir / "docs" / "specs"
    output_file = base_dir / "js" / "specs-db.js"
    
    all_specs = {}
    
    if specs_dir.exists():
        for file_path in specs_dir.glob("*.json"):
            try:
                screen_id = file_path.stem
                with open(file_path, 'r', encoding='utf-8') as f:
                    spec_data = json.load(f)
                    all_specs[screen_id] = spec_data
            except Exception as e:
                print(f"Error reading {file_path}: {e}")
    else:
        print(f"Warning: Directory {specs_dir} not found.")

    js_content = f"""// Auto-generated from docs/specs/*.json
window.ALL_SPECS = {json.dumps(all_specs, ensure_ascii=False, indent=2)};
"""

    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"Successfully wrote {len(all_specs)} specs to {output_file}")

if __name__ == "__main__":
    main()
