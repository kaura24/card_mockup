/**
 * KB카드 목업 — Spec Viewer v3
 *
 * 모든 화면(0001~74)에 공통 적용.
 * 기존 인라인 ? 버튼(#btn-spec, #reqBtn, .req-trigger, .req-qmark 등)을
 * 감지하여 hijack한 뒤 통합 스펙 모달과 연결합니다.
 * 기존 버튼이 없을 때만 새 버튼을 주입합니다.
 *
 * 데이터 우선순위:
 *   1) docs/specs/{screenId}.json  (외부 JSON)
 *   2) window.REQ_SPEC             (HTML 인라인 변수)
 *
 * 사용법:
 *   <script src="js/spec-viewer.js" data-screen-id="XXXX"></script>
 */
(function () {
  'use strict';

  /* ── 기존 인라인 스펙 모달/버튼 셀렉터 ─────────────────────────────────── */
  const OLD_BTN_SEL = '#btn-spec, #reqBtn, #req-btn, .req-trigger, .req-qmark';
  const OLD_MODAL_SEL = '#modal-spec, #specModal';

  /* ── 스타일 (한 번만) ───────────────────────────────────────────────────── */
  if (!document.getElementById('_sv-style')) {
    const st = document.createElement('style');
    st.id = '_sv-style';
    st.textContent = `
      /* ── 공통 ? 버튼 (신규 주입) ── */
      #_sv-btn {
        position: fixed; right: 24px; bottom: 24px;
        width: 52px; height: 52px; border-radius: 50%;
        background: #222; color: #FFBC00;
        border: 2px solid rgba(255,188,0,.35);
        font-size: 22px; font-weight: 900;
        cursor: pointer; z-index: 900;
        box-shadow: 0 4px 16px rgba(0,0,0,.4);
        transition: transform .2s, box-shadow .2s;
        display: flex; align-items: center; justify-content: center;
        font-family: sans-serif;
      }
      #_sv-btn:hover  { transform: rotate(12deg) scale(1.1); box-shadow: 0 6px 24px rgba(0,0,0,.5); }
      #_sv-btn:active { transform: scale(.96); }
      /* 시나리오 모드: 다음버튼(bottom:90px)과 겹치지 않도록 */
      body:not(.no-scenario) #_sv-btn { bottom: 160px; }

      /* ── 기존 버튼 스타일 오버라이드 (KB Yellow) ── */
      .req-trigger, .req-qmark, #btn-spec, #reqBtn {
        background: #222 !important;
        color: #FFBC00 !important;
        border: 2px solid rgba(255,188,0,.35) !important;
      }
      /* 시나리오 모드에서 기존 버튼 위치 조정 */
      body:not(.no-scenario) .req-trigger,
      body:not(.no-scenario) .req-qmark,
      body:not(.no-scenario) #btn-spec,
      body:not(.no-scenario) #reqBtn { bottom: 160px !important; }

      /* ── 기존 인라인 모달 숨김 (통합 모달로 교체) ── */
      #modal-spec, #specModal { display: none !important; }

      /* ── 통합 스펙 오버레이 ── */
      #_sv-overlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,.62); display: none;
        align-items: center; justify-content: center;
        padding: 20px; z-index: 9100;
        backdrop-filter: blur(5px);
      }
      #_sv-overlay.show { display: flex; }

      #_sv-modal {
        width: 100%; max-width: 960px; background: #fff;
        border-radius: 18px; max-height: 92vh; overflow: hidden;
        display: flex; flex-direction: column;
        box-shadow: 0 28px 72px rgba(0,0,0,.45);
        animation: _sv-rise .22s ease;
      }
      @keyframes _sv-rise {
        from { opacity:0; transform:translateY(14px); }
        to   { opacity:1; transform:translateY(0); }
      }

      /* ── 헤더 ── */
      #_sv-hd {
        padding: 15px 22px;
        background: #111; border-radius: 18px 18px 0 0;
        display: flex; justify-content: space-between; align-items: center;
        flex-shrink: 0;
      }
      #_sv-hd h2 {
        margin: 0; font-size: 15px; font-weight: 900; color: #fff;
        display: flex; align-items: center; gap: 10px;
        font-family: -apple-system, "Noto Sans KR", sans-serif;
      }
      .sv-badge {
        font-size: 11px; padding: 2px 9px; border-radius: 20px;
        font-weight: 900;
      }
      .sv-badge-id   { background: rgba(255,188,0,.2); color: #FFBC00; border: 1px solid rgba(255,188,0,.4); }
      .sv-badge-json { background: #e8f5e9; color: #2e7d32; }
      .sv-badge-inline { background: #fff8e1; color: #e65100; }
      .sv-badge-none   { background: #fce4ec; color: #c62828; }
      #_sv-close {
        background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2);
        color: #fff; padding: 7px 16px; border-radius: 7px;
        cursor: pointer; font-weight: 700; font-size: 13px;
        font-family: inherit; transition: background .15s;
      }
      #_sv-close:hover { background: rgba(255,255,255,.22); }

      /* ── 탭 ── */
      #_sv-tabs {
        display: flex; background: #f7f7f7;
        border-bottom: 1px solid #e8e8e8; flex-shrink: 0;
      }
      .sv-tab {
        padding: 12px 18px; font-size: 13px; font-weight: 700;
        color: #888; cursor: pointer; border: none; background: none;
        border-bottom: 3px solid transparent; transition: all .15s;
        font-family: inherit;
      }
      .sv-tab.active         { color: #111; border-bottom-color: #FFBC00; background: #fff; }
      .sv-tab:hover:not(.active) { background: #efefef; color: #555; }

      /* ── 탭 본문 ── */
      #_sv-body { padding: 24px; overflow-y: auto; flex: 1; }
      .sv-pane  { display: none; }
      .sv-pane.active { display: block; }

      /* ── 공통 테이블 ── */
      .sv-tbl { width:100%; border-collapse:collapse; margin-bottom:20px; font-size:14px; }
      .sv-tbl th, .sv-tbl td { border:1px solid #eee; padding:10px 14px; text-align:left; vertical-align:top; line-height:1.5; }
      .sv-tbl th { background:#f9f9f9; width:140px; font-weight:800; color:#333; white-space:nowrap; }

      .sv-sec { margin-top:22px; }
      .sv-sec:first-child { margin-top:0; }
      .sv-sec h3 {
        font-size:14px; margin:0 0 10px;
        border-left:4px solid #FFBC00; padding-left:10px;
        color:#111; font-weight:900;
      }
      .sv-sec ul { margin:0; padding-left:20px; font-size:14px; line-height:1.85; color:#444; }
      .sv-sec li { margin:2px 0; }

      .sv-code {
        background:#1a1a1a; color:#d4d4d4; padding:18px;
        border-radius:10px; font-family:monospace; font-size:12px;
        overflow-x:auto; margin-top:6px; line-height:1.6; white-space:pre;
      }

      /* ── 나노 바지 (데이터필드) ── */
      .sv-field-tbl { width:100%; border-collapse:collapse; font-size:13px; }
      .sv-field-tbl th,.sv-field-tbl td { border:1px solid #eee; padding:8px 12px; text-align:left; }
      .sv-field-tbl th { background:#f9f9f9; font-weight:800; }
      .sv-field-tbl code { background:#f0f0f0; padding:1px 5px; border-radius:3px; font-size:12px; }

      .sv-empty { color:#aaa; text-align:center; padding:36px 0; font-size:14px; }
    `;
    document.head.appendChild(st);
  }

  /* ── 유틸 ─────────────────────────────────────────────────────────────── */
  const esc = s => String(s == null ? '—' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const li = arr => (arr || []).map(i => `<li>${esc(i)}</li>`).join('');

  /* ── 모달 오버레이 주입 ─────────────────────────────────────────────────── */
  function injectOverlay() {
    if (document.getElementById('_sv-overlay')) return;
    const ov = document.createElement('div');
    ov.id = '_sv-overlay';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.innerHTML = `
      <div id="_sv-modal">
        <div id="_sv-hd">
          <h2>
            📋 기능요구서
            <span class="sv-badge sv-badge-id"   id="_sv-b-id">—</span>
            <span class="sv-badge"               id="_sv-b-src"></span>
          </h2>
          <button id="_sv-close" type="button">✕ 닫기</button>
        </div>
        <div id="_sv-tabs">
          <button class="sv-tab active" data-tab="spec">📄 스펙</button>
          <button class="sv-tab"        data-tab="logic">⚙ 로직·QA</button>
          <button class="sv-tab"        data-tab="fields">🗂 데이터 필드</button>
          <button class="sv-tab"        data-tab="raw">{ } JSON</button>
        </div>
        <div id="_sv-body">
          <div class="sv-pane active" id="_sv-p-spec">
            <p class="sv-empty">로딩 중...</p>
          </div>
          <div class="sv-pane" id="_sv-p-logic"></div>
          <div class="sv-pane" id="_sv-p-fields"></div>
          <div class="sv-pane" id="_sv-p-raw"></div>
        </div>
      </div>`;
    document.body.appendChild(ov);

    document.getElementById('_sv-close').addEventListener('click', closeModal);
    ov.addEventListener('click', e => { if (e.target === ov) closeModal(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && ov.classList.contains('show')) closeModal();
    });
    ov.querySelectorAll('.sv-tab').forEach(t => {
      t.addEventListener('click', () => {
        ov.querySelectorAll('.sv-tab').forEach(x => x.classList.remove('active'));
        ov.querySelectorAll('.sv-pane').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        document.getElementById(`_sv-p-${t.dataset.tab}`).classList.add('active');
      });
    });
  }

  function openModal() {
    document.getElementById('_sv-overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    document.getElementById('_sv-overlay').classList.remove('show');
    document.body.style.overflow = '';
  }

  /* ── 트리거 버튼 연결/주입 ──────────────────────────────────────────────── */
  function connectTriggers() {
    // 기존 인라인 버튼 hijack
    const existing = document.querySelectorAll(OLD_BTN_SEL);
    existing.forEach(btn => {
      // 기존 이벤트 교체 (cloneNode 로 클론 후 대체)
      const fresh = btn.cloneNode(true);
      fresh.addEventListener('click', openModal);
      btn.parentNode.replaceChild(fresh, btn);
    });

    // 기존 인라인 모달 내용을 이미 CSS로 숨겼으므로 추가 조치 불필요

    // 기존 버튼이 하나도 없을 경우에만 새 버튼 주입
    if (existing.length === 0 && !document.getElementById('_sv-btn')) {
      const btn = document.createElement('button');
      btn.id = '_sv-btn';
      btn.type = 'button';
      btn.title = '기능요구서 / 요건정의서 보기';
      btn.setAttribute('aria-label', '기능요구서 보기');
      btn.textContent = '?';
      btn.addEventListener('click', openModal);
      document.body.appendChild(btn);
    }
  }

  /* ── 렌더링 ─────────────────────────────────────────────────────────────── */
  function render(spec, source, screenId) {
    /* 배지 */
    document.getElementById('_sv-b-id').textContent = screenId || '—';
    const srcBadge = document.getElementById('_sv-b-src');
    const badgeMap = {
      json: ['sv-badge-json', '✓ JSON 연결'],
      inline: ['sv-badge-inline', '⚠ 인라인 REQ_SPEC'],
      none: ['sv-badge-none', '✗ 스펙 미등록'],
    };
    const [cls, txt] = badgeMap[source] || badgeMap.none;
    srcBadge.className = `sv-badge ${cls}`;
    srcBadge.textContent = txt;

    if (!spec) {
      document.getElementById('_sv-p-spec').innerHTML =
        `<div style="text-align:center;padding:48px">
          <p style="font-size:36px">⚠️</p>
          <p style="font-weight:800;font-size:16px">스펙 파일이 없습니다</p>
          <p style="color:#888;font-size:13px;margin-top:8px">
            <code>docs/specs/${esc(screenId)}.json</code> 을 생성하거나<br>
            HTML에 <code>const REQ_SPEC = {...}</code> 를 선언해 주세요.
          </p></div>`;
      ['logic', 'fields', 'raw'].forEach(p =>
        document.getElementById(`_sv-p-${p}`).innerHTML = '');
      return;
    }

    /* ── 스펙 탭 ── */
    const host = spec.host || {};
    const flow = spec.flow || {};
    const rf = (spec.required_fields || []);
    document.getElementById('_sv-p-spec').innerHTML = `
      <div class="sv-sec">
        <table class="sv-tbl">
          <tr><th>화면 ID</th><td>${esc(spec.screen_id)}</td></tr>
          <tr><th>화면명</th><td>${esc(spec.screen_name)}</td></tr>
          ${spec.target ? `<tr><th>적용 대상</th><td>${esc(spec.target)}</td></tr>` : ''}
          ${spec.backend ? `<tr><th>백엔드</th><td>${esc(spec.backend)}</td></tr>` : ''}
          ${spec.action ? `<tr><th>Action</th><td>${esc(spec.action)}</td></tr>` : ''}
          ${host.system ? `<tr><th>처리계</th><td>${esc(host.system)} — ${esc(host.intent || '')}</td></tr>` : ''}
          ${spec.purpose ? `<tr><th>목적</th><td>${esc(spec.purpose)}</td></tr>` : ''}
          ${spec.business_rule_source ? `<tr><th>근거</th><td>${esc(spec.business_rule_source)}</td></tr>` : ''}
          ${(flow.prev || flow.next) ? `<tr><th>플로우</th><td>이전 ${esc(flow.prev || '—')} → 다음 ${esc(flow.next || '—')}</td></tr>` : ''}
        </table>
      </div>
      ${rf.length ? `
        <div class="sv-sec"><h3>필수 입력 필드</h3>
          <table class="sv-field-tbl">
            <tr><th>key</th><th>레이블</th><th>필수</th></tr>
            ${rf.map(f => `<tr><td><code>${esc(f.key)}</code></td><td>${esc(f.label)}</td><td>${f.required ? '✅' : '—'}</td></tr>`).join('')}
          </table></div>` : ''}`;

    /* ── 로직·QA 탭 ── */
    const logic = spec.logic || spec.rules || [];
    const qa = spec.qa_points || [];
    document.getElementById('_sv-p-logic').innerHTML =
      (logic.length ? `<div class="sv-sec"><h3>주요 로직 / 규칙</h3><ul>${li(logic)}</ul></div>` : '') +
      (qa.length ? `<div class="sv-sec"><h3>QA / 개발 체크리스트</h3><ul>${li(qa)}</ul></div>` : '') +
      (!logic.length && !qa.length ? '<p class="sv-empty">로직·QA 정보 없음</p>' : '');

    /* ── 데이터 필드 탭 ── */
    const df = spec.data_fields || null;
    const live = Array.from(document.querySelectorAll('[data-field]'))
      .map(el => ({ field: el.dataset.field, tag: el.tagName.toLowerCase(), type: el.type || '—', id: el.id || '—' }));
    let fHtml = '';
    if (df) {
      fHtml += `<div class="sv-sec"><h3>스펙 정의 필드</h3>
            <table class="sv-field-tbl">
              <tr><th>필드명</th><th>설명</th></tr>
              ${Object.entries(df).map(([k, v]) => `<tr><td><code>${esc(k)}</code></td><td>${esc(v)}</td></tr>`).join('')}
            </table></div>`;
    }
    if (live.length) {
      fHtml += `<div class="sv-sec"><h3>현재 화면 <code>data-field</code> 요소 (자동 감지)</h3>
            <table class="sv-field-tbl">
              <tr><th>data-field</th><th>태그</th><th>type</th><th>id</th></tr>
              ${live.map(f => `<tr><td><code>${esc(f.field)}</code></td><td>${esc(f.tag)}</td><td>${esc(f.type)}</td><td>${esc(f.id)}</td></tr>`).join('')}
            </table></div>`;
    }
    document.getElementById('_sv-p-fields').innerHTML =
      fHtml || '<p class="sv-empty">data-field 속성이 없습니다</p>';

    /* ── Raw JSON 탭 ── */
    document.getElementById('_sv-p-raw').innerHTML =
      `<div class="sv-sec"><h3>전체 스펙 JSON</h3>
          <pre class="sv-code">${esc(JSON.stringify(spec, null, 2))}</pre></div>`;
  }

  /* ── 데이터 로딩 ─────────────────────────────────────────────────────────── */
  function getScreenId() {
    for (const s of document.querySelectorAll('script[src*="spec-viewer.js"]')) {
      if (s.dataset.screenId) return s.dataset.screenId;
    }
    if (typeof window.SCREEN_ID !== 'undefined') return String(window.SCREEN_ID);
    const m = window.location.pathname.split('/').pop().match(/^(\d{4})_r\./i);
    return m ? m[1] : null;
  }

  async function fetchJson(screenId) {
    try {
      const res = await fetch(`docs/specs/${screenId}.json`);
      if (!res.ok) throw new Error(res.status);
      return await res.json();
    } catch { return null; }
  }

  /* ── 초기화 ─────────────────────────────────────────────────────────────── */
  async function init() {
    injectOverlay();
    connectTriggers();

    const sid = getScreenId();
    let spec = sid ? await fetchJson(sid) : null;
    let source = spec ? 'json' : null;

    if (!spec && typeof window.REQ_SPEC !== 'undefined') {
      spec = window.REQ_SPEC;
      source = 'inline';
    }
    if (!spec) source = 'none';

    render(spec, source, sid);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
