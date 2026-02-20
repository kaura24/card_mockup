/**
 * KB카드 목업 — Scenario Navigator
 * URL 파라미터로 현재 시나리오 상태를 추적하고,
 * 화면 상단에 네비게이션 바를 주입합니다.
 *
 * URL 형식:
 *   0001_r.HTML?session=abc&scenario=SC-01-A&step=0
 *
 * 사용법 (각 화면 HTML):
 *   <script src="js/scenario-nav.js"></script>
 */
(function () {
  // ─── 시나리오 정의 (index.html 과 동기화) ───────────────────────────────
  const NAMES = {
    "0001": "사업자번호 입력", "0002": "신규 대상 통합 발급 안내", "0003": "추가 대상 통합 발급 안내",
    "0004": "준비사항", "0005": "제출서류", "0006": "서류자동제출서비스", "0007": "유의사항",
    "0008": "법인 공동인증서 이용안내", "0009": "신용카드 상품 약관동의", "0010": "신청인정보",
    "0011": "신청자 신용정보 조회 이용 동의", "0012": "신청인 본인인증", "0013": "신청인 CDD 조건부 검증",
    "0014": "대표자 정보", "0015": "사업자 정보", "0016": "법인 정보", "0017": "EDD정보",
    "0018": "필수확인사항", "0019": "이용한도", "0020": "명세서 받으실 곳", "0021": "카드선택",
    "0022": "결제일", "0023": "결제계좌", "0024": "신청매수", "0025": "발급 확인 및 약관수령",
    "0026": "카드수령지", "0027": "추천인", "0028": "공동인증서 인증", "0029": "카드정보(확인용)",
    "0030": "사업자정보(확인용)", "0031": "대표자정보(확인용)", "0032": "법인인증",
    "0033": "추가서류제출", "0034": "신청완료", "0035": "개별카드 회원 동의서 작성안내",
    "0036": "개별카드 개인명의계좌 등록", "0037": "개별카드 발급 대상 고객 정보",
    "0038": "개별카드 동의 조회(조회하기)", "0039": "개인신용정보 동의서",
    "0040": "개별카드 동의 조회(신청하기)", "0041": "개별카드", "0042": "법인 EDD정보",
    "0043": "발급 대상 부서 팝업", "0044": "개별카드 동의 조회(추가전용)", "0045": "기본정보",
    "0046": "유의 및 준비사항(추가개별)", "0047": "대표자_사업자정보", "0048": "업체(부서)정보",
    "0049": "기본정보2", "0050": "부서별한도(요청한도 입력)", "0051": "업체(부서)정보(확인용)",
    "0052": "신청완료_카드신청정보(확인용)", "0053": "유의 및 준비사항(개사자_신용)",
    "0054": "추가정보선택", "0055": "약관동의(신용)", "0057": "카드신청 기본_CDD",
    "0058": "3종 본인인증", "0059": "설립년월일_업종분류", "0060": "한도부여결과 조회",
    "0061": "신분증 정보", "0062": "필수확인사항(개사자)", "0063": "카드정보(개사자)",
    "0064": "카드정보수정하기", "0065": "카드신청완료", "0066": "유의 및 준비사항(개사자_체크)",
    "0067": "신분증진위확인 방법 선택", "0068": "신분증정보 입력", "0069": "본인확인",
    "0070": "신청정보_CDD", "0071": "신청정보_설립년월", "0072": "약관동의(개사자_체크)",
    "0073": "신청정보_수정하기", "0074": "접수완료(개사자_체크)"
  };

  const BASE_NEW = ["0001", "0002", "0004", "0005", "0006", "0007", "0008"];
  const BASE_ADD = ["0001", "0003", "0004", "0005", "0006", "0007", "0008"];
  const TAIL_CREDIT = ["0010", "0011", "0012", "0013", "0014", "0015", "0016", "0017", "0018", "0019", "0020", "0021", "0022", "0023", "0024", "0025", "0026", "0027", "0028", "0029", "0030", "0031", "0032", "0033", "0034"];
  const TAIL_CHECK = ["0010", "0012", "0013", "0014", "0015", "0016", "0017", "0018", "0020", "0021", "0022", "0023", "0024", "0025", "0026", "0027", "0028", "0029", "0030", "0031", "0032", "0033", "0034"];
  const INDIV_NEW = ["0035", "0036", "0037", "0038", "0039", "0040", "0041"];
  const DEPT_IN_C = ["0009", "0043", "0010", "0011", "0012", "0013", "0018", "0045", "0021", "0024", "0025", "0026", "0042", "0027", "0028", "0029", "0051", "0032", "0052"];
  const DEPT_ADD_C = ["0009", "0043", "0047", "0048", "0049", "0050", "0020", "0021", "0022", "0023", "0024", "0025", "0026", "0042", "0027", "0028", "0029", "0051", "0032", "0052"];
  const DEPT_IN_CHK = ["0043", "0010", "0012", "0013", "0018", "0045", "0021", "0024", "0025", "0026", "0042", "0027", "0028", "0029", "0051", "0032", "0052"];
  const DEPT_ADD_CHK = ["0043", "0047", "0048", "0049", "0050", "0020", "0021", "0022", "0023", "0024", "0025", "0026", "0042", "0027", "0028", "0029", "0051", "0032", "0052"];
  const INDIV_ADD = ["0035", "0036", "0037", "0038", "0039", "0044", "0046"];

  const SCENARIOS = {
    "SC-01-A": { label: "법사자_신용 | 신규 | 공용", screens: [...BASE_NEW, "0009", ...TAIL_CREDIT] },
    "SC-01-B": { label: "법사자_신용 | 신규 | 개별", screens: [...BASE_NEW, ...INDIV_NEW, ...TAIL_CREDIT] },
    "SC-01-C": { label: "법사자_신용 | 추가 | 공용 | 부서내추가", screens: [...BASE_ADD, ...DEPT_IN_C] },
    "SC-01-D": { label: "법사자_신용 | 추가 | 공용 | 부서추가", screens: [...BASE_ADD, ...DEPT_ADD_C] },
    "SC-01-E": { label: "법사자_신용 | 추가 | 개별 | 부서내추가", screens: [...BASE_ADD, ...INDIV_ADD, ...DEPT_IN_C] },
    "SC-01-F": { label: "법사자_신용 | 추가 | 개별 | 부서추가", screens: [...BASE_ADD, ...INDIV_ADD, ...DEPT_ADD_C] },
    "SC-03-A": { label: "법사자_체크 | 신규 | 공용", screens: [...BASE_NEW, ...TAIL_CHECK] },
    "SC-03-B": { label: "법사자_체크 | 신규 | 개별", screens: [...BASE_NEW, ...INDIV_NEW, ...TAIL_CHECK] },
    "SC-03-C": { label: "법사자_체크 | 추가 | 공용 | 부서내추가", screens: [...BASE_ADD, ...DEPT_IN_CHK] },
    "SC-03-D": { label: "법사자_체크 | 추가 | 공용 | 부서추가", screens: [...BASE_ADD, ...DEPT_ADD_CHK] },
    "SC-03-E": { label: "법사자_체크 | 추가 | 개별 | 부서내추가", screens: [...BASE_ADD, ...INDIV_ADD, ...DEPT_IN_CHK] },
    "SC-03-F": { label: "법사자_체크 | 추가 | 개별 | 부서추가", screens: [...BASE_ADD, ...INDIV_ADD, ...DEPT_ADD_CHK] },
    "SC-02-A": { label: "개사자_신용 | 신규", screens: ["0001", "0002", "0053", "0054", "0055", "0057", "0058", "0059", "0060", "0061", "0062", "0063", "0064", "0065"] },
    "SC-02-B": { label: "개사자_신용 | 추가", screens: ["0001", "0003", "0053", "0054", "0055", "0057", "0058", "0059", "0060", "0061", "0062", "0063", "0064", "0065"] },
    "SC-04-A": { label: "개사자_체크 | 신규 | 검증완료", screens: ["0001", "0066", "0067", "0068", "0069", "0058", "0070", "0071", "0072", "0073", "0074"] },
    "SC-04-B": { label: "개사자_체크 | 신규 | 검증필요", screens: ["0001", "0066", "0067", "0068", "0069", "0058", "0070", "0071", "0072", "0073", "0074"] },
  };

  // ─── Unified Scenario Mapping (Dynamic to Static) ─────────────────────────
  function resolveUnifiedCode(code) {
    if (!code || !code.startsWith('UNIFIED-')) return code;

    const parts = code.split('-'); // UNIFIED, BIZ, CARD, ISSUANCE
    if (parts.length < 4) return 'SC-01-A'; // Fallback

    const biz = parts[1]; // CORP, INDIV
    const card = parts[2]; // CREDIT, CHECK
    const issue = parts[3]; // NEW, ADD

    // Mapping Logic
    if (biz === 'CORP') {
      if (card === 'CREDIT') {
        return issue === 'NEW' ? 'SC-01-A' : 'SC-01-C'; // Default to DeptIn for Add
      } else { // CHECK
        return issue === 'NEW' ? 'SC-03-A' : 'SC-03-C';
      }
    } else { // INDIV
      if (card === 'CREDIT') {
        return issue === 'NEW' ? 'SC-02-A' : 'SC-02-B';
      } else { // CHECK
        return issue === 'NEW' ? 'SC-04-A' : 'SC-04-A'; // Add not fully defined for Check Indiv?
      }
    }
  }

  // ─── 파일명 → 화면 ID 추출 ───────────────────────────────────────────────
  function screenIdFromUrl() {
    const filename = window.location.pathname.split('/').pop(); // e.g. "0001_r.HTML"
    const m = filename.match(/^(\d{4})_r\./i);
    return m ? m[1] : null;
  }

  // ─── URL 파라미터 파싱 ───────────────────────────────────────────────────
  function getParams() {
    const p = new URLSearchParams(window.location.search);
    return {
      session: p.get('session'),
      scenario: p.get('scenario'),
      step: parseInt(p.get('step') || '0', 10)
    };
  }

  // ─── screen 파일명 생성 ──────────────────────────────────────────────────
  function screenFile(id) {
    if (!id || id.startsWith('N/A')) return null;
    return id + '_r.html';
  }

  // ─── 다음 화면 URL 생성 ──────────────────────────────────────────────────
  function buildUrl(session, scenario, nextStep) {
    const sc = SCENARIOS[scenario];
    if (!sc || nextStep >= sc.screens.length) return 'session-summary.html?session=' + session;
    const file = screenFile(sc.screens[nextStep]);
    if (!file) return buildUrl(session, scenario, nextStep + 1); // N/A 화면 건너뜀
    return `${file}?session=${session}&scenario=${scenario}&step=${nextStep}`;
  }

  // ─── 네비게이션 바 CSS ───────────────────────────────────────────────────
  const NAV_CSS = `
    #_sc-nav {
      position: sticky; top: 0; z-index: 800;
      background: #1a1a1a; color: #fff;
      padding: 0 20px;
      display: flex; align-items: stretch;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", sans-serif;
      font-size: 13px; box-shadow: 0 2px 8px rgba(0,0,0,.4);
      min-height: 52px; gap: 0;
    }
    #_sc-nav .nav-home {
      display: flex; align-items: center; gap: 6px;
      padding: 0 16px; text-decoration: none;
      color: #ffcc00; font-weight: 800; font-size: 13px;
      border-right: 1px solid #333; white-space: nowrap;
      transition: background .15s;
    }
    #_sc-nav .nav-home:hover { background: #2a2a2a; }
    #_sc-nav .nav-scenario {
      display: flex; align-items: center; gap: 8px;
      padding: 0 16px; flex: 1; min-width: 0;
    }
    #_sc-nav .nav-code {
      background: rgba(255,204,0,.18); color: #ffcc00;
      font-weight: 900; font-size: 11px;
      padding: 3px 9px; border-radius: 8px; white-space: nowrap;
    }
    #_sc-nav .nav-label {
      color: #ccc; font-size: 12px;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    #_sc-nav .nav-screen {
      display: flex; align-items: center; gap: 8px;
      padding: 0 16px; border-left: 1px solid #333; white-space: nowrap;
    }
    #_sc-spec-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 6px 14px; margin: 0 8px;
      background: rgba(255,188,0,.12); color: #FFBC00;
      border: 1px solid rgba(255,188,0,.3); border-radius: 20px;
      font-size: 12px; font-weight: 900; cursor: pointer;
      transition: background .15s; white-space: nowrap;
      font-family: inherit;
    }
    #_sc-spec-btn:hover { background: rgba(255,188,0,.22); }
    #_sc-nav .nav-screen-id {
      font-weight: 900; color: #fff; font-size: 14px;
    }
    #_sc-nav .nav-screen-name {
      color: #aaa; font-size: 12px;
    }
    #_sc-nav .nav-step {
      color: #ffcc00; font-weight: 900; font-size: 12px;
      background: rgba(255,204,0,.1); border: 1px solid rgba(255,204,0,.3);
      padding: 3px 9px; border-radius: 8px; white-space: nowrap;
    }
    /* ── 이전/현재/다음 화면 컨텍스트 바 ── */
    #_sc-crumb {
      position: sticky; top: 52px; z-index: 798;
      background: #111;
      display: flex; align-items: center; justify-content: center;
      gap: 0; overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", sans-serif;
      font-size: 12px; border-bottom: 1px solid #2a2a2a;
    }
    .sc-crumb-item {
      display: flex; align-items: center; gap: 6px;
      padding: 7px 16px; white-space: nowrap; min-width: 0;
    }
    .sc-crumb-item.prev { color: #555; cursor: pointer; transition: color .15s; flex-shrink: 0; }
    .sc-crumb-item.prev:hover { color: #aaa; }
    .sc-crumb-item.curr {
      color: #fff; font-weight: 900;
      background: rgba(255,204,0,.1);
      border-left: 3px solid #ffcc00;
      border-right: 3px solid #ffcc00;
      flex: 1; justify-content: center; min-width: 0;
    }
    .sc-crumb-item.curr .crumb-name {
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .sc-crumb-item.next { color: #555; cursor: pointer; transition: color .15s; flex-shrink: 0; }
    .sc-crumb-item.next:hover { color: #aaa; }
    .sc-crumb-id {
      font-size: 10px; font-weight: 900; opacity: .6; flex-shrink: 0;
    }
    .sc-crumb-arr { color: #333; padding: 0 4px; }
    .sc-crumb-na { opacity: .3; font-style: italic; }
    #_sc-progress-wrap {
      position: sticky; top: 84px; z-index: 797;
      background: #111; height: 4px;
    }
    #_sc-progress-bar {
      height: 100%; background: #ffcc00;
      transition: width .3s ease;
    }
    #_sc-next-btn {
      position: fixed; right: 24px; bottom: 90px;
      background: #ffcc00; color: #111;
      border: none; border-radius: 50px;
      padding: 14px 28px; font-size: 15px; font-weight: 900;
      cursor: pointer; z-index: 850;
      box-shadow: 0 4px 16px rgba(0,0,0,.3);
      transition: all .2s; display: flex; align-items: center; gap: 8px;
    }
    #_sc-next-btn:hover { background: #f2b800; transform: translateY(-2px); }
    #_sc-next-btn:active { transform: scale(.97); }
    /* 시나리오 모드가 아닐 때 숨김 */
    .no-scenario #_sc-nav,
    .no-scenario #_sc-progress-wrap,
    .no-scenario #_sc-next-btn { display: none !important; }

    /* ── 복구 모달 (Recovery Choice) ── */
    #_sc-recover-overlay {
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(0,0,0,.7); backdrop-filter: blur(5px);
      display: flex; align-items: center; justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", sans-serif;
    }
    #_sc-recover-modal {
      width: 420px; background: #fff; border-radius: 20px;
      padding: 34px 28px; text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,.5);
      animation: _sc-pop .3s cubic-bezier(.175, .885, .32, 1.275);
    }
    @keyframes _sc-pop {
      from { transform: scale(.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    #_sc-recover-modal h3 {
      margin: 0 0 12px; font-size: 19px; font-weight: 900; color: #111;
    }
    #_sc-recover-modal p {
      margin: 0 0 28px; font-size: 14.5px; color: #666; font-weight: 700; line-height: 1.6;
    }
    #_sc-recover-modal .sc-scenario-info {
      background: #f8f9fa; border: 1px solid #eee; border-radius: 12px;
      padding: 12px; margin-bottom: 28px; font-size: 13px; color: #444;
      text-align: left;
    }
    #_sc-recover-modal .sc-btn-row {
      display: flex; gap: 12px;
    }
    #_sc-recover-modal .sc-btn {
      flex: 1; height: 52px; border-radius: 12px; border: none;
      font-size: 15px; font-weight: 900; cursor: pointer;
      transition: all .2s;
    }
    #_sc-recover-modal .sc-btn-fresh {
      background: #f1f1f1; color: #666;
    }
    #_sc-recover-modal .sc-btn-fresh:hover { background: #e6e6e6; }
    #_sc-recover-modal .sc-btn-cont {
      background: #ffcc00; color: #111;
    }
    #_sc-recover-modal .sc-btn-cont:hover { background: #f2b800; }
  `;

  // ─── 메인 ────────────────────────────────────────────────────────────────
  function init() {
    const params = getParams();
    const { session, scenario, step } = params;

    // 만약 시나리오 파라미터가 없고, 기존에 진행 중인 세션이 있다면 사용자에게 확인
    if (!scenario || !session) {
      const lastSessionId = window.SessionDB ? SessionDB.currentId() : null;
      if (lastSessionId) {
        const lastSess = SessionDB.get(lastSessionId);
        // 완료되지 않은 세션이 보관되어 있는 경우만
        if (lastSess && lastSess.status === 'in_progress' && !params.session) {
          showRecoveryDialog(lastSess);
          return; // 다이얼로그 응답 대기
        }
      }
    }

    continueInit(session, scenario, step);
  }

  function showRecoveryDialog(sessionData) {
    const overlay = document.createElement('div');
    overlay.id = '_sc-recover-overlay';

    // 마지막 화면 정보 찾기
    const lastScreenId = Object.keys(sessionData.screens).pop() || 'N/A';
    const lastScreenName = NAMES[lastScreenId] || lastScreenId;

    overlay.innerHTML = `
      <div id="_sc-recover-modal">
        <h3>진행 중인 시나리오가 있습니다</h3>
        <p>이전에 진행하던 단계부터 이어가시겠습니까?</p>
        <div class="sc-scenario-info">
          <div><b>시나리오:</b> ${sessionData.scenarioLabel}</div>
          <div><b>마지막 단계:</b> [${lastScreenId}] ${lastScreenName}</div>
          <div style="margin-top:4px; opacity:.7; font-size:11px;">(마지막 업데이트: ${new Date(sessionData.updatedAt).toLocaleString()})</div>
        </div>
        <div class="sc-btn-row">
          <button type="button" class="sc-btn sc-btn-fresh" id="_sc-btn-fresh">새로 시작</button>
          <button type="button" class="sc-btn sc-btn-cont" id="_sc-btn-cont">이어가기</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // 새로 시작: 현재 세션 마커를 지우고 모달을 닫음 (그냥 현재 화면 유지)
    document.getElementById('_sc-btn-fresh').onclick = () => {
      localStorage.removeItem('kb_current_session');
      overlay.remove();
      // URL에 아무 파라미터가 없으므로 No-Scenario 모드로 진입
      document.body.classList.add('no-scenario');
    };

    // 이어가기: 마지막 단계로 리다이렉트
    document.getElementById('_sc-btn-cont').onclick = () => {
      const scenario = sessionData.scenarioCode;
      const step = sessionData.currentStep || 0;
      const session = sessionData.sessionId;
      const sc = SCENARIOS[scenario];
      if (sc) {
        const file = screenFile(sc.screens[step]);
        window.location.href = `${file}?session=${session}&scenario=${scenario}&step=${step}`;
      } else {
        alert('시나리오 정보를 찾을 수 없습니다.');
        overlay.remove();
      }
    };
  }

  function continueInit(session, scenario, step) {
    const screenId = screenIdFromUrl();

    // Unified Code Mapping
    if (scenario && scenario.startsWith('UNIFIED-')) {
      const mapped = resolveUnifiedCode(scenario);
      if (mapped !== scenario) {
        console.log(`[ScenarioNav] Mapped ${scenario} -> ${mapped}`);
        scenario = mapped;
        // Update URL to reflect mapped scenario? Or keep UNIFIED?
        // Better to keep UNIFIED in URL for context, but use mapped for logic.
        // But buildUrl uses 'scenario' var, so it will generate next links with mapped scenario.
        // That's fine, as long as it works. 
        // Actually, if we change the URL param, it might be clearer.
        // Let's just use the mapped 'scenario' variable for internal logic.
      }
    }

    const sc = SCENARIOS[scenario];

    // 시나리오 모드 아님 -> 복구 시도
    if (!session || (!scenario || !sc)) {
      if (session && window.SessionDB) {
        const recover = SessionDB.get(session);
        if (recover && recover.scenarioCode) {
          console.log(`[ScenarioNav] Recovered scenario ${recover.scenarioCode} from session ${session}`);
          scenario = recover.scenarioCode;
        } else {
          document.body.classList.add('no-scenario');
          return;
        }
      } else {
        document.body.classList.add('no-scenario');
        return;
      }
    }

    // 로깅: 화면 진입
    if (window.SessionDB) {
      SessionDB.logAction(screenId, 'ENTRY', { scenario, step, url: location.href });
    }

    const totalScreens = sc.screens.filter(s => !s.startsWith('N/A')).length;
    const currentScreenName = NAMES[screenId] || screenId;

    // ─── CSS 삽입 ────────────────────────────────────────────────────────
    if (!document.getElementById('_sc-nav-style')) {
      const s = document.createElement('style');
      s.id = '_sc-nav-style';
      s.textContent = NAV_CSS;
      document.head.appendChild(s);
    }

    // ─── 네비게이션 바 HTML ──────────────────────────────────────────────
    const navBar = document.createElement('div');
    navBar.id = '_sc-nav';
    const pct = totalScreens > 0 ? Math.round(((step + 1) / totalScreens) * 100) : 0;

    // Home URL Logic
    // If Unified Scenario -> integrated_flow.html
    // If General Scenario -> general_flow.html
    // Or maybe just index.html (Master Gate)? 
    // Let's use specific list pages for better context.
    const isUnified = scenario && scenario.startsWith('UNIFIED');
    const homeUrl = isUnified ? 'integrated_flow.html' : 'general_flow.html';
    const homeLabel = isUnified ? '◀ 통합' : '◀ 목록';

    navBar.innerHTML = `
      <a class="nav-home" href="${homeUrl}" title="시나리오 목록으로">
        ${homeLabel}
      </a>
      <div class="nav-scenario">
        <span class="nav-code">${scenario}</span>
        <span class="nav-label">${sc.label}</span>
      </div>
      <div class="nav-screen">
        <span class="nav-screen-id">${screenId}</span>
        <span class="nav-screen-name">${currentScreenName}</span>
        <span class="nav-step">${step + 1} / ${totalScreens}</span>
      </div>
      <button id="_sc-spec-btn" type="button" title="기능요구서 / 요건정의서 보기">
        📋 스펙
      </button>`;

    // ─── 프로그레스 바 ───────────────────────────────────────────────────
    const progressWrap = document.createElement('div');
    progressWrap.id = '_sc-progress-wrap';
    progressWrap.innerHTML = `<div id="_sc-progress-bar" style="width:${pct}%"></div>`;

    document.body.insertBefore(progressWrap, document.body.firstChild);
    document.body.insertBefore(navBar, document.body.firstChild);

    // ─── 이전/현재/다음 화면 컨텍스트 바 ────────────────────────────────
    const crumbBar = document.createElement('div');
    crumbBar.id = '_sc-crumb';

    // 실제 화면 목록에서 N/A 건너뛰고 이전/다음 찾기
    function firstRealBefore(idx) {
      for (let i = idx - 1; i >= 0; i--) {
        if (!sc.screens[i].startsWith('N/A')) return { id: sc.screens[i], step: i };
      }
      return null;
    }
    function firstRealAfter(idx) {
      for (let i = idx + 1; i < sc.screens.length; i++) {
        if (!sc.screens[i].startsWith('N/A')) return { id: sc.screens[i], step: i };
      }
      return null;
    }

    const prevInfo = firstRealBefore(step);
    const nextInfo = firstRealAfter(step);

    const prevHtml = prevInfo
      ? `<div class="sc-crumb-item prev" id="_sc-crumb-prev" title="이전 화면으로 이동">
           ‹ <span class="sc-crumb-id">${prevInfo.id}</span>
           <span class="crumb-name">${NAMES[prevInfo.id] || prevInfo.id}</span>
         </div>
         <span class="sc-crumb-arr">│</span>`
      : `<div class="sc-crumb-item prev" style="opacity:.2">처음</div><span class="sc-crumb-arr">│</span>`;

    const nextHtml = nextInfo
      ? `<span class="sc-crumb-arr">│</span>
         <div class="sc-crumb-item next" id="_sc-crumb-next" title="다음 화면으로 이동">
           <span class="crumb-name">${NAMES[nextInfo.id] || nextInfo.id}</span>
           <span class="sc-crumb-id">${nextInfo.id}</span> ›
         </div>`
      : `<span class="sc-crumb-arr">│</span><div class="sc-crumb-item next" style="opacity:.2">마지막</div>`;

    crumbBar.innerHTML = `
      ${prevHtml}
      <div class="sc-crumb-item curr">
        <span class="sc-crumb-id">${screenId}</span>
        <span class="crumb-name">${currentScreenName}</span>
        <span style="font-size:10px;opacity:.6;margin-left:4px">(${step + 1}/${totalScreens})</span>
      </div>
      ${nextHtml}`;

    document.body.insertBefore(crumbBar, progressWrap);

    // 이전/다음 클릭 이벤트
    const prevBtn = document.getElementById('_sc-crumb-prev');
    if (prevBtn && prevInfo) {
      const prevFile = screenFile(prevInfo.id);
      if (prevFile) {
        prevBtn.style.cursor = 'pointer';
        prevBtn.addEventListener('click', () => {
          window.location.href = `${prevFile}?session=${session}&scenario=${scenario}&step=${prevInfo.step}`;
        });
      }
    }
    const nextCrumbBtn = document.getElementById('_sc-crumb-next');
    if (nextCrumbBtn && nextInfo) {
      const nextFile = screenFile(nextInfo.id);
      if (nextFile) {
        nextCrumbBtn.style.cursor = 'pointer';
        nextCrumbBtn.addEventListener('click', () => {
          window.location.href = `${nextFile}?session=${session}&scenario=${scenario}&step=${nextInfo.step}`;
        });
      }
    }


    // ─── 다음 버튼 ─────────────────────────────────────────────────────
    const nextStep = step + 1;
    const nextUrl = buildUrl(session, scenario, nextStep);
    const isLast = nextStep >= sc.screens.length;

    const nextBtn = document.createElement('button');
    nextBtn.id = '_sc-next-btn';
    nextBtn.type = 'button';
    nextBtn.innerHTML = isLast ? '🏁 완료' : '다음 ›';
    nextBtn.title = isLast ? '시나리오 완료 — 요약 보기' : `다음: 화면 ${sc.screens[nextStep]}`;

    nextBtn.addEventListener('click', () => {
      goNext();
    });

    function goNext() {
      // 현재 화면 데이터 자동 저장 (form 필드 수집)
      if (window.SessionDB && screenId) {
        const fields = SessionDB.scanFields();
        SessionDB.save(screenId, fields, session, step);
        SessionDB.logAction(screenId, 'NEXT', { nextUrl });
      }

      if (isLast) {
        if (window.SessionDB) SessionDB.complete(session);
        alert('시나리오가 완료되었습니다. 결과 원장을 확인합니다.');
        window.location.href = `session-summary.html?session=${session}`;
      } else {
        window.location.href = nextUrl;
      }
    }

    function goPrev() {
      if (!prevInfo) return;
      if (window.SessionDB) SessionDB.logAction(screenId, 'PREV', { prevUrl: prevBtn.dataset.url });
      const prevFile = screenFile(prevInfo.id);
      window.location.href = `${prevFile}?session=${session}&scenario=${scenario}&step=${prevInfo.step}`;
    }

    document.body.appendChild(nextBtn);

    // 전역 API 노출
    window.ScenarioNav = {
      goNext,
      goPrev,
      log: (action, data) => {
        if (window.SessionDB) SessionDB.logAction(screenId, action, data, session);
      }
    };

    // ─── 📋 스펙 버튼 이벤트 ──────────────────────────────────────────────
    const specNavBtn = document.getElementById('_sc-spec-btn');
    if (specNavBtn) {
      specNavBtn.addEventListener('click', () => {
        const ov = document.getElementById('_sv-overlay');
        if (ov) {
          ov.classList.add('show');
          document.body.style.overflow = 'hidden';
        } else {
          const fb = document.getElementById('_sv-btn') ||
            document.querySelector('#btn-spec,#reqBtn,.req-trigger,.req-qmark');
          if (fb) fb.click();
        }
      });
    }


    // 세션 ID를 전역에 노출 (다른 스크립트에서 사용 가능)
    window._KB_SESSION = session;
    window._KB_SCENARIO = scenario;
    window._KB_STEP = step;

    // ─── 네비게이션 인터셉터 ─────────────────────────────────────────────
    // 기존 화면의 다음/확인 버튼이 하드코딩된 URL로 이동할 때
    // session/scenario/step 파라미터를 자동으로 주입합니다.
    const SCREEN_RE = /(?:^|[/\\])(\d{4})_[rR]\.[Hh][Tt][Mm][Ll]$/;

    function injectParams(rawUrl) {
      // 이미 session 파라미터가 있으면 건너뜀
      if (!rawUrl || rawUrl.includes('session=')) return rawUrl;
      const m = rawUrl.match(SCREEN_RE);
      if (!m) return rawUrl;
      const targetId = m[1];
      // 시나리오 목록에서 해당 화면의 step 찾기
      const targetStep = sc.screens.indexOf(targetId);
      if (targetStep === -1) return rawUrl;
      const base = rawUrl.split('?')[0];
      return `${base}?session=${session}&scenario=${scenario}&step=${targetStep}`;
    }

    // (1) <a href> 클릭 인터셉터
    document.addEventListener('click', function (e) {
      const anchor = e.target.closest('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      const injected = injectParams(href);
      if (injected && injected !== href) {
        e.preventDefault();
        window.location.href = injected;
      }
    }, true);

    // (2) window.location.href 오버라이드
    try {
      const locDesc = Object.getOwnPropertyDescriptor(window.Location.prototype, 'href');
      if (locDesc && locDesc.set) {
        const origSet = locDesc.set;
        Object.defineProperty(window.location, 'href', {
          set(newHref) {
            const injected = injectParams(newHref);
            origSet.call(window.location, injected || newHref);
          },
          get() { return window.location.toString(); },
          configurable: true,
        });
      }
    } catch (_) { /* 일부 브라우저에서 Location.prototype 접근 불가 — 무시 */ }

    // (3) location.assign / location.replace 오버라이드
    try {
      const _origAssign = window.location.assign.bind(window.location);
      const _origReplace = window.location.replace.bind(window.location);
      window.location.assign = (url) => _origAssign(injectParams(url) || url);
      window.location.replace = (url) => _origReplace(injectParams(url) || url);
    } catch (e) { }

    // (4) location.hash = '#/XXXX' 인터셉터 (0002 등에서 사용)
    try {
      const hashDesc = Object.getOwnPropertyDescriptor(window.Location.prototype, 'hash');
      if (hashDesc && hashDesc.set) {
        const origHashSet = hashDesc.set;
        Object.defineProperty(window.location, 'hash', {
          set(newHash) {
            // '#/0004' 패턴 확인
            const hashMatch = String(newHash).match(/^#\/?(\d{4})$/);
            if (hashMatch) {
              const targetId = hashMatch[1];
              // 시나리오 목록에서 해당 화면의 step 찾기
              const targetStep = sc.screens.indexOf(targetId);
              if (targetStep !== -1) {
                // 0002 -> 0004 이동 시 파일명도 변경되어야 함
                const nextPath = location.pathname.replace(/\d{4}_[rR]\.[Hh][Tt][Mm][Ll].*$/, `${targetId}_r.html`);
                // 무한 루프 방지
                if (!location.href.includes(targetId) && !location.href.includes(nextPath)) {
                  window.location.replace(`${nextPath}?session=${session}&scenario=${scenario}&step=${targetStep}`);
                  return;
                }
              }
            }
            origHashSet.call(window.location, newHash);
          },
          get() {
            const parts = window.location.toString().split('#');
            return parts.length > 1 ? '#' + parts[1] : '';
          },
          configurable: true
        });
      }
    } catch (_) { }

    // ─── 5. 버튼 자동 연결 (Auto-Linker) ─────────────────────────────────
    // 0002 화면 등, 다음 버튼(confirmBtn)에 로직이 누락된 경우 자동 연결
    // .confirm-btn, #confirmBtn 은 0002에서만 유일하게 사용됨 (grep 확인 완료)
    setTimeout(() => {
      const targetBtns = document.querySelectorAll('#confirmBtn, .confirm-btn');
      targetBtns.forEach(btn => {
        // 기존 onclick이 없으면 안전하게 이벤트 리스너 추가
        if (!btn.onclick && !btn.getAttribute('onclick') && !btn.hasAttribute('data-auto-linked')) {
          btn.setAttribute('data-auto-linked', 'true');
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('[ScenarioNav] Auto-linked button clicked:', btn);
            // 메인 네비게이션의 [다음] 버튼 트리거
            // init 함수 스코프 내의 nextBtn 변수 사용
            if (typeof nextBtn !== 'undefined' && nextBtn) nextBtn.click();
            else {
              const nb = document.getElementById('_sc-next-btn');
              if (nb) nb.click();
            }
          });
        }
      });
    }, 100);

    // ─── 6. 시나리오 동적 전환 (Dynamic Scenario Switch) ──────────────────
    // 0001(신규/추가 분기), 0043(부서내/부서추 분기) 등에서 호출
    window._KB_SWITCH_SCENARIO = function (changes) {
      if (!scenario || !SCENARIOS[scenario]) return;

      let currentKey = scenario;
      console.log(`[ScenarioNav] Switching request:`, changes, `from ${currentKey}`);

      // 1. 발급구분 변경 (신규 <-> 추가)
      if (changes.issuance) {
        if (changes.issuance === 'NEW') {
          // "추가" -> "신규"
          currentKey = currentKey.replace('추가', '신규');
          // 신규는 부서 옵션(_부서내, _부서추)이 없음 -> 제거
          currentKey = currentKey.replace('_부서내', '').replace('_부서추', '');
        } else if (changes.issuance === 'ADD') {
          // "신규" -> "추가"
          currentKey = currentKey.replace('신규', '추가');
          // 법인(공용/개별)의 경우 "추가"는 부서 옵션이 필수 (키 구조상)
          // 개사자는 부서 옵션 없음 ("개_신_추가")
          // 따라서, 변경된 키가 존재하는지 확인 후, 없으면 기본값(_부서내) 추가
          if (!SCENARIOS[currentKey] && !currentKey.includes('개_')) {
            currentKey += '_부서내';
          }
        }
      }

      // 2. 부서구분 변경 (부서내 <-> 부서추)
      if (changes.dept) {
        // changes.dept: '부서내' or '부서추' (한글 키워드 기준)
        // 기존 _부서내, _부서추 제거
        currentKey = currentKey.replace('_부서내', '').replace('_부서추', '');
        // 새 옵션 붙이기
        currentKey += `_${changes.dept}`;
      }

      console.log(`[ScenarioNav] Target key candidate: ${currentKey}`);

      // 3. 유효성 검사 및 Fallback
      if (!SCENARIOS[currentKey]) {
        console.warn(`[ScenarioNav] Target key ${currentKey} not found. Trying fallbacks...`);
        // 혹시 _부서내를 붙여본다?
        if (SCENARIOS[currentKey + '_부서내']) currentKey += '_부서내';
        else {
          console.error(`[ScenarioNav] Failed to switch scenario. Target ${currentKey} invalid.`);
          alert(`시나리오 전환 실패: ${currentKey} 정보를 찾을 수 없습니다.`);
          return;
        }
      }

      // 4. 리다이렉트
      const sc = SCENARIOS[currentKey];
      const currentScreenId = screenIdFromUrl();
      let nextStep = 0;

      // 현재 화면이 새 시나리오에 있는지 확인
      const idx = sc.screens.indexOf(currentScreenId);
      if (idx !== -1) {
        // 현재 화면 다음으로 이동
        nextStep = idx + 1;
      } else {
        // 현재 화면이 새 시나리오에 없다면? (거의 없음)
        console.warn(`[ScenarioNav] Current screen ${currentScreenId} not found in ${currentKey}. Going to step 0.`);
        nextStep = 0;
      }

      const nextFile = screenFile(sc.screens[nextStep]);
      if (!nextFile) {
        alert("다음 화면 파일을 찾을 수 없습니다.");
        return;
      }

      const nextUrl = `${nextFile}?session=${session}&scenario=${currentKey}&step=${nextStep}`;
      console.log(`[ScenarioNav] Redirecting to ${nextUrl}`);
      // 히스토리 남기지 않고 교체 (뒤로가기 시 꼬임 방지)
      window.location.replace(nextUrl);
    };

  }



  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
