# KB국민카드 기업카드 목업 — UI & 디자인 가이드

> **버전**: v2.0 (KB 공식 브랜드 준용)  
> **기준**: KB국민카드 공식 웹사이트 디자인 시스템  
> **기술 스택**: 순수 HTML5 + Vanilla CSS + Vanilla JS

---

## 1. 브랜드 컬러 시스템

KB국민카드 공식 Identity Color를 기준으로 합니다.

| 토큰 | 값 | 용도 |
|------|----|------|
| `--kb-yellow` | `#FFBC00` | **KB Star Yellow** — 주 CTA, 강조 (공식 브랜드 컬러) |
| `--kb-yellow-dark` | `#F0A800` | Hover / Active 상태 |
| `--kb-yellow-light` | `#FFF8E1` | 배경 강조, 선택 상태 |
| `--kb-brown` | `#4B433E` | KB Star Brown — 보조 다크 |
| `--text-primary` | `#222222` | 기본 텍스트 |
| `--text-secondary` | `#555555` | 보조 텍스트 |
| `--text-muted` | `#888888` | 힌트, 비활성 |
| `--bg-white` | `#FFFFFF` | 기본 배경 |
| `--bg-light` | `#F7F7F7` | 섹션 구분 배경 |
| `--bg-panel` | `#F9F9F9` | 테이블 레이블 배경 |
| `--danger` | `#ED1C24` | 에러, 필수 표시 (KB 공식 Error Red) |
| `--info` | `#0046FF` | 링크, 정보 (KB 공식 Blue) |

---

## 2. 타이포그래피

| 구분 | 크기 | 굵기 | 용도 |
|------|------|------|------|
| 화면 타이틀 | 28px | 800 | `.kb-page-title` |
| 섹션 제목 | 18–20px | 800 | `.kb-panel-title` |
| 본문 / 레이블 | 15–16px | 400–700 | 폼 레이블, 일반 텍스트 |
| 보조 안내 | 13–14px | 400–500 | 힌트, 설명 |
| 마이크로 | 11–12px | 700 | 배지, 태그 |

**폰트 스택**: `Pretendard > Noto Sans KR > Apple SD Gothic Neo > 시스템 폰트`

> 공식 사이트는 KB금융체 (자체 폰트) 사용. 목업에서는 Pretendard로 대체.

---

## 3. 공통 파일 구조

```
card_mockup/
├── css/
│   └── kb-theme.css        ← 공통 테마 (전체 디자인 토큰 + 컴포넌트)
├── js/
│   ├── session-db.js       ← localStorage 세션 DB
│   ├── scenario-nav.js     ← 상단 네비바 + 다음 버튼 + 진행바
│   └── spec-viewer.js      ← 요구사항 모달 (? 버튼)
├── docs/
│   ├── specs/              ← 화면별 JSON 스펙
│   └── DESIGN_GUIDE.md     ← 이 문서
└── *_r.html                ← 각 화면
```

---

## 4. 화면 HTML 표준 템플릿

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>KB국민카드 | [화면명] ([화면ID])</title>
  <link rel="stylesheet" href="css/kb-theme.css"/>
</head>
<body>
  <!--
    Screen ID   : XXXX
    Screen Name : [화면명]
    Scenarios   : SC-XX-X, ...
    Updated     : YYYY-MM-DD
  -->

  <div class="kb-wrap">

    <div class="kb-page-header">
      <h1 class="kb-page-title">[화면명]</h1>
      <p class="kb-page-subtitle">[부제목]</p>
    </div>

    <!-- 안내 (선택) -->
    <div class="kb-notice">
      <ul><li>...</li></ul>
    </div>

    <!-- 폼 -->
    <div class="kb-required-note"><span class="star">*</span> 필수입력</div>
    <div class="kb-form">
      <div class="kb-form-row">
        <div class="kb-form-label">[항목명] <span class="star">*</span></div>
        <div class="kb-form-content">
          <input class="kb-input" data-field="fieldName" type="text"/>
          <p class="kb-msg-hint">힌트 텍스트</p>
          <p class="kb-msg-error" id="err-field">오류 메시지</p>
        </div>
      </div>
    </div>

    <!-- 하단 버튼 -->
    <div class="kb-btn-area">
      <button class="kb-btn-outline" type="button">이전</button>
      <button class="kb-btn" type="button" id="btn-next">
        <span class="kb-spinner"></span>
        <span class="kb-btn-text">다음</span>
      </button>
    </div>

  </div>

  <div id="toast" class="kb-toast"></div>

  <!-- 공통 (순서 고정) -->
  <script src="js/session-db.js"></script>
  <script src="js/scenario-nav.js"></script>
  <script src="js/spec-viewer.js" data-screen-id="XXXX"></script>

  <!-- 화면 로직 -->
  <script>
  (function(){
    const SCREEN_ID = "XXXX";
    // ...
  })();
  </script>
</body>
</html>
```

---

## 5. 주요 컴포넌트 클래스 레퍼런스

| 요소 | 클래스 |
|------|--------|
| 페이지 타이틀 | `.kb-page-title` |
| 안내 박스 | `.kb-notice` / `.kb-notice.warning` / `.kb-notice.danger` |
| 폼 컨테이너 | `.kb-form` |
| 폼 행 | `.kb-form-row` |
| 레이블 | `.kb-form-label` |
| 입력 컨텐츠 영역 | `.kb-form-content` |
| 텍스트 입력 | `.kb-input` (+ `.is-error`) |
| 셀렉트 | `.kb-select` |
| 체크박스 | `.kb-check-label > input[type=checkbox]` |
| 힌트 메시지 | `.kb-msg-hint` |
| 에러 메시지 | `.kb-msg-error` (+ `.show` 로 표시) |
| 주 버튼 | `.kb-btn` |
| 보조 버튼 | `.kb-btn-outline` |
| 텍스트 버튼 | `.kb-btn-ghost` |
| 버튼 영역 | `.kb-btn-area` |
| 카드/패널 | `.kb-panel` |
| 패널 제목 | `.kb-panel-title` |
| 테이블 | `.kb-table` |
| 토스트 | `.kb-toast` (+ `.show`) |
| 모달 오버레이 | `.kb-modal-overlay` (+ `.show`) |

---

## 6. 시나리오 연동 규칙

### data-field (자동 데이터 수집)
```html
<input data-field="bizNo" .../>       <!-- SessionDB 자동 수집 -->
<select data-field="cardType" .../>
<input type="checkbox" data-field="agreed"/>
```
`scenario-nav.js`의 "다음" 버튼 클릭 시 `data-field` 필드를 모두 수집해 `SessionDB.save()` 호출합니다.

### 네비게이션 바 (자동 주입)
`scenario-nav.js` 로드가 되면 URL 파라미터 `?session=&scenario=&step=` 을 감지해
- 화면 최상단에 **진행 표시줄 + 현재순서/전체** bars 주입
- 우하단에 **노란색 "다음 ›"** 버튼 주입
- 시나리오 모드가 아닐 때(일반 단독 열람)는 아무것도 주입하지 않음

---

## 7. 반응형 브레이크포인트

| 구간 | 기준 |
|------|------|
| PC (기본) | ≥ 860px — 폼 2열 레이아웃 |
| 모바일 | < 860px — 폼 1열, 버튼 full-width |

---

## 8. 신규 화면 체크리스트

- [ ] `<link href="css/kb-theme.css">` 적용
- [ ] 화면 메타 주석 (Screen ID, Scenarios, Updated) 작성
- [ ] 모든 입력 필드에 `data-field` 속성 추가
- [ ] `session-db.js`, `scenario-nav.js`, `spec-viewer.js` 로드
- [ ] `docs/specs/XXXX.json` 스펙 파일 작성
- [ ] 에러 메시지 / 토스트 처리 구현
- [ ] 모바일 반응형 확인
