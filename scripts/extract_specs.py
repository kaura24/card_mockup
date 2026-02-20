import os
import re
import json

folder = "."
html_files = sorted([f for f in os.listdir(folder) if f.lower().endswith('.html')])

# Deduplicate
seen = {}
unique_files = []
for f in html_files:
    key = f.lower()
    if key not in seen:
        seen[key] = f
        unique_files.append(f)
html_files = unique_files

# Screen name mapping from Excel analysis
SCREEN_NAMES = {
    "0001": "사업자번호입력",
    "0002": "신규 대상 통합 발급 안내",
    "0003": "추가 대상 통합 발급 안내",
    "0004": "준비사항",
    "0005": "제출서류",
    "0006": "서류자동제출서비스",
    "0007": "유의사항",
    "0008": "법인 공동인증서(기업용)이용안내",
    "0009": "신용카드 상품 약관동의",
    "0010": "신청인정보",
    "0011": "신청자 신용정보 조회 이용 동의",
    "0012": "신청인 본인인증",
    "0013": "신청인 CDD 조건부 검증",
    "0014": "대표자 정보",
    "0015": "사업자 정보",
    "0016": "법인 정보",
    "0017": "EDD정보",
    "0018": "필수확인사항",
    "0019": "이용한도",
    "0020": "명세서 받으실 곳",
    "0021": "카드선택",
    "0022": "결제일",
    "0023": "결제계좌",
    "0024": "신청매수",
    "0025": "발급 확인 및 약관수령",
    "0026": "카드수령지",
    "0027": "추천인",
    "0028": "공동인증서 인증",
    "0029": "카드정보(확인용)",
    "0030": "사업자정보(확인용)",
    "0031": "대표자정보(확인용)",
    "0032": "법인인증",
    "0033": "추가서류제출",
    "0034": "신청완료",
    "0035": "개별 카드 회원 동의서 작성안내",
    "0036": "개별카드 사용자 개인명의계좌 등록",
    "0037": "개별카드 발급 대상 고객 정보",
    "0038": "개별카드 동의 조회(조회하기)",
    "0039": "개인신용정보 동의서",
    "0040": "개별카드 동의 조회(신청하기)",
    "0041": "개별카드",
    "0042": "법인 EDD정보",
    "0043": "발급 대상 부서 팝업",
    "0044": "개별카드 동의 조회(신청하기)_추가전용",
    "0045": "기본정보",
    "0046": "유의 및 준비사항",
    "0047": "대표자_사업자정보",
    "0048": "업체(부서)정보",
    "0049": "기본정보2",
    "0050": "부서별한도(요청한도 입력)",
    "0051": "업체(부서)정보(확인용)",
    "0052": "신청완료_카드신청정보(확인용)",
    "0053": "유의 및 준비사항(개사자_신용)",
    "0054": "추가정보선택(개사자전용)",
    "0055": "약관동의(신용 or 체크)",
    "0057": "카드신청 기본_CDD(개사자전용)",
    "0058": "3종 본인인증(개사자_신용_체크)",
    "0059": "설립년월일_업종분류(개사자전용)",
    "0060": "한도부여결과조회(개사자전용)",
    "0061": "신분증 정보(개사자전용)",
    "0062": "필수확인사항(개사자전용)",
    "0063": "카드정보(개사자전용)",
    "0064": "카드정보수정하기(개사자전용)",
    "0065": "카드신청완료(개사자전용)",
    "0066": "유의 및 준비사항(개사_체크전용)",
    "0067": "신분증진위확인_촬영또는직접입력선택",
    "0068": "신분증정보 입력(개사 체크)",
    "0069": "본인확인(개사_체크)",
    "0070": "신청정보_CDD(개사_체크)",
    "0071": "신청정보_설립년월(개사_체크)",
    "0072": "약관동의(개사자_체크)",
    "0073": "신청정보_수정하기(개사자_체크)",
    "0074": "접수완료(개사자_체크)",
}

# Applicability per scenario (from Excel)
SCREEN_SCENARIOS = {
    "법사자_신용": ["0001","0002","0003","0004","0005","0006","0007","0008","0009","0010","0011","0012","0013","0014","0015","0016","0017","0018","0019","0020","0021","0022","0023","0024","0025","0026","0027","0028","0029","0030","0031","0032","0033","0034","0035","0036","0037","0038","0039","0040","0041","0042","0043","0044","0045","0046","0047","0048","0049","0050","0051","0052"],
    "법사자_체크": ["0001","0002","0003","0004","0005","0006","0007","0008","0010","0012","0013","0014","0015","0016","0017","0020","0021","0022","0023","0024","0025","0026","0027","0028","0029","0030","0031","0032","0033","0034","0035","0036","0037","0038","0039","0040","0041","0042","0043","0044","0045","0046","0047","0048","0049","0050","0051","0052"],
    "개사자_신용": ["0001","0002","0003","0053","0054","0055","0057","0058","0059","0060","0061","0062","0063","0064","0065"],
    "개사자_체크": ["0001","0002","0003","0066","0067","0068","0069","0058","0070","0071","0072","0073","0074"],
}

os.makedirs("docs/screens", exist_ok=True)

for filename in html_files:
    filepath = os.path.join(folder, filename)
    m = re.match(r'^(\d+)', filename)
    if not m:
        continue
    screen_id = m.group(1)
    screen_name = SCREEN_NAMES.get(screen_id, "화면명 미정의")

    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except:
        continue

    # Extract SCREEN_ID from file
    sid_match = re.search(r'(?:const|var|let)\s+SCREEN_ID\s*=\s*["\'](\w+)["\']', content)
    internal_id = sid_match.group(1) if sid_match else "미정의"

    # Extract SCREEN_NAME
    sname_match = re.search(r'(?:const|var|let)\s+SCREEN_NAME\s*=\s*["\']([^"\']+)["\']', content)
    internal_name = sname_match.group(1) if sname_match else screen_name

    # Extract full REQ_SPEC object
    req_spec_raw = None
    req_match = re.search(r'(?:const|var|let)\s+REQ_SPEC\s*=\s*(\{[\s\S]*?\});', content)
    if req_match:
        req_spec_raw = req_match.group(1)

    # Extract fields from REQ_SPEC if possible
    fields_section = ""
    if req_spec_raw:
        # Try to extract fields array
        fields_match = re.search(r'"fields"\s*:\s*\[([\s\S]*?)\]', req_spec_raw)
        if not fields_match:
            fields_match = re.search(r"'fields'\s*:\s*\[([\s\S]*?)\]", req_spec_raw)
        if fields_match:
            fields_section = fields_match.group(1)

    # Extract navigation info
    nav_match = re.search(r'(?:navigation|nav)\s*:\s*\{([\s\S]*?)\}', req_spec_raw or "")
    nav_section = nav_match.group(1) if nav_match else ""

    # Extract QA points
    qa_match = re.search(r'"qa_points"\s*:\s*\[([\s\S]*?)\]', req_spec_raw or "")
    qa_section = qa_match.group(1) if qa_match else ""

    # Determine which scenarios use this screen
    applicable = [s for s, ids in SCREEN_SCENARIOS.items() if screen_id in ids]

    # ID check
    id_status = ""
    if internal_id == "미정의":
        id_status = "⚠️ SCREEN_ID 미정의 (파일 내 상수 없음)"
    elif internal_id != screen_id:
        id_status = f"❌ 불일치: 파일명={screen_id}, 내부={internal_id}"
    else:
        id_status = "✅ 일치"

    # Build markdown
    md = f"""# 화면 {screen_id}: {internal_name}

## 기본 정보

| 항목 | 내용 |
|------|------|
| **화면 ID** | `{screen_id}` |
| **파일명** | `{filename}` |
| **내부 SCREEN_ID** | `{internal_id}` |
| **ID 검증** | {id_status} |
| **적용 시나리오** | {', '.join(applicable) if applicable else '미매핑'} |

---

## 화면 설명

> 엑셀 서비스목록 ID 기준 화면명: **{screen_name}**

"""

    if req_spec_raw:
        md += f"""## REQ_SPEC (원본 발췌)

```javascript
{req_spec_raw[:3000]}{"..." if len(req_spec_raw) > 3000 else ""}
```

"""

    if fields_section.strip():
        md += f"""## 필드 목록

```json
{fields_section[:2000]}
```

"""

    if qa_section.strip():
        md += f"""## QA 체크포인트

```
{qa_section[:1000]}
```

"""

    if nav_section.strip():
        md += f"""## 네비게이션

```
{nav_section[:500]}
```

"""

    md += f"""## HTML 파일 링크

→ [`{filename}`](../{filename})

---
*자동 생성: check_screen_ids.py*
"""

    out_path = f"docs/screens/{screen_id}_{re.sub(r'[/()（）]', '_', screen_name)[:30]}.md"
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(md)

print(f"Done! Created {len(html_files)} screen spec files in docs/screens/")
