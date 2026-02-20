/**
 * KB카드 목업 — Session DB v2 (localStorage 기반)
 * ─────────────────────────────────────────────────
 * 시나리오 실행 건별 유니크 세션 키를 생성하고,
 * 각 화면 단계별 입력 정보를 수집·저장합니다.
 * 시나리오 완료 시 신청서 접수 원장(Application Ledger)을 생성합니다.
 */

const SessionDB = (() => {
    const PREFIX = 'kb_sess_';   // 세션 레코드 prefix
    const LEDGER_PX = 'kb_ledg_';  // 원장 레코드 prefix
    const CUR_KEY = 'kb_current_session';

    // ─── 내부 유틸 ────────────────────────────────────────────────────────
    /** 시나리오 코드 + 타임스탬프 형식의 유니크 세션 ID */
    function _genId(scenarioCode) {
        const now = new Date();
        const pad = (n, d = 2) => String(n).padStart(d, '0');
        const ts = [
            now.getFullYear(),
            pad(now.getMonth() + 1),
            pad(now.getDate()),
            '-',
            pad(now.getHours()),
            pad(now.getMinutes()),
            pad(now.getSeconds()),
        ].join('');
        const suffix = Math.random().toString(36).slice(2, 5).toUpperCase();
        return `${scenarioCode || 'SC'}-${ts}-${suffix}`;
    }

    function _set(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    }
    function _get(key) {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    }

    // ─── 현재 화면의 모든 입력 필드 수집 ────────────────────────────────
    /**
     * data-field 속성 + id/name 있는 input/select/textarea 값을 모두 수집
     * @returns {Object} fieldKey → value
     */
    function scanFields() {
        const result = {};

        // 1. data-field 속성이 있는 요소
        document.querySelectorAll('[data-field]').forEach(el => {
            const key = el.dataset.field;
            if (!key) return;
            result[key] = el.type === 'checkbox' ? el.checked : el.value;
        });

        // 2. data-field 없는 input / select / textarea (id 또는 name 기준)
        document.querySelectorAll('input, select, textarea').forEach(el => {
            if (el.dataset.field) return;           // 이미 처리됨
            if (el.type === 'hidden') return;        // hidden 제외
            if (el.type === 'submit' || el.type === 'button') return;
            const key = el.id || el.name;
            if (!key) return;
            result[key] = el.type === 'checkbox' ? el.checked
                : el.type === 'radio' ? (el.checked ? el.value : undefined)
                    : el.value;
        });

        // undefined 값 제거
        Object.keys(result).forEach(k => {
            if (result[k] === undefined) delete result[k];
        });

        return result;
    }

    // ─── PUBLIC API ──────────────────────────────────────────────────────

    /**
     * 새 세션 초기화 (시나리오 시작 시 호출)
     * @param {string} scenarioKey   내부 키 예: '법_신_신규_공용'
     * @param {string} scenarioCode  예: 'SC-01-A'
     * @param {string} scenarioLabel 예: '법사자_신용 | 신규 | 공용'
     * @returns {string} sessionId
     */
    function init(scenarioKey, scenarioCode, scenarioLabel) {
        const sessionId = _genId(scenarioCode);
        const session = {
            sessionId,
            scenarioKey,
            scenarioCode,
            scenarioLabel,
            startedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: 'in_progress',   // 'in_progress' | 'completed'
            currentStep: 0,
            screens: {},
            logs: []
        };
        _set(PREFIX + sessionId, session);
        localStorage.setItem(CUR_KEY, sessionId);
        return sessionId;
    }

    /** 현재 활성 세션 ID 반환 */
    function currentId() {
        return localStorage.getItem(CUR_KEY) || null;
    }

    /** 세션 데이터 조회 */
    function get(sessionId) {
        const id = sessionId || currentId();
        return id ? _get(PREFIX + id) : null;
    }

    /**
     * 특정 화면의 수집 데이터 저장
     * @param {string} screenId   예: '0001'
     * @param {Object} fields     입력 필드 key/value — 없으면 DOM 자동 스캔
     * @param {string} sessionId  없으면 현재 세션 사용
     * @param {number} step       현재 step 번호
     */
    function save(screenId, fields, sessionId, step) {
        const id = sessionId || currentId();
        if (!id) { console.warn('[SessionDB] No active session'); return; }
        const session = get(id);
        if (!session) { console.warn('[SessionDB] Session not found:', id); return; }

        // fields 없으면 DOM 자동 스캔
        const data = (fields && Object.keys(fields).length > 0) ? fields : scanFields();

        session.screens[screenId] = {
            step: step !== undefined ? step : null,
            savedAt: new Date().toISOString(),
            fields: data
        };
        if (step !== undefined) session.currentStep = step;
        session.updatedAt = new Date().toISOString();
        _set(PREFIX + id, session);
    }

    /**
     * 시나리오 완료 처리 — 신청서 원장(Application Ledger) 생성
     * @param {string} sessionId
     * @returns {Object} ledger 객체
     */
    function complete(sessionId) {
        const id = sessionId || currentId();
        const session = get(id);
        if (!session) return null;

        session.status = 'completed';
        session.completedAt = new Date().toISOString();
        _set(PREFIX + id, session);

        // 원장 생성 ─────────────────────────────────────────
        // 모든 화면의 필드를 하나의 flat 오브젝트로 병합
        const allFields = {};
        Object.entries(session.screens).forEach(([scrId, scrData]) => {
            Object.entries(scrData.fields || {}).forEach(([fk, fv]) => {
                // 이미 있으면 screenId_fieldKey 형태로 구분
                const key = allFields[fk] !== undefined ? `${scrId}_${fk}` : fk;
                allFields[key] = fv;
            });
        });

        const ledger = {
            ledgerId: id,
            sessionId: id,
            scenarioCode: session.scenarioCode,
            scenarioLabel: session.scenarioLabel,
            createdAt: new Date().toISOString(),
            startedAt: session.startedAt,
            completedAt: session.completedAt,
            screenCount: Object.keys(session.screens).length,
            data: allFields,
            screens: session.screens
        };
        _set(LEDGER_PX + id, ledger);
        return ledger;
    }

    /** 특정 세션의 원장 조회 */
    function getLedger(sessionId) {
        return _get(LEDGER_PX + (sessionId || currentId()));
    }

    /** 저장된 모든 세션 목록 */
    function list() {
        const sessions = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(PREFIX)) {
                try { sessions.push(JSON.parse(localStorage.getItem(key))); }
                catch (_) { }
            }
        }
        return sessions.sort((a, b) => (a.startedAt < b.startedAt ? 1 : -1));
    }

    /** 저장된 모든 원장 목록 */
    function listLedgers() {
        const ledgers = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(LEDGER_PX)) {
                try { ledgers.push(JSON.parse(localStorage.getItem(key))); }
                catch (_) { }
            }
        }
        return ledgers.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    }

    /** 특정 세션 삭제 */
    function remove(sessionId) {
        localStorage.removeItem(PREFIX + sessionId);
        localStorage.removeItem(LEDGER_PX + sessionId);
        if (currentId() === sessionId) localStorage.removeItem(CUR_KEY);
    }

    /** 세션 JSON 내보내기 */
    function exportJSON(sessionId) {
        const data = get(sessionId || currentId());
        return data ? JSON.stringify(data, null, 2) : '{}';
    }

    /** JSON 파일로 다운로드 */
    function download(sessionId) {
        const id = sessionId || currentId();
        const json = exportJSON(id);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `session_${id}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    /** 원장 JSON 파일로 다운로드 */
    function downloadLedger(sessionId) {
        const id = sessionId || currentId();
        const ledger = getLedger(id);
        if (!ledger) { alert('원장이 아직 생성되지 않았습니다.'); return; }
        const json = JSON.stringify(ledger, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ledger_${id}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    /**
     * 거래별/액션별 로그 기록
     * @param {string} screenId
     * @param {string} action    예: 'SAVE', 'NEXT', 'PREV', 'API_CALL'
     * @param {Object} data      관련 데이터
     * @param {string} sessionId (선택)
     */
    function logAction(screenId, action, data, sessionId) {
        const sId = sessionId || localStorage.getItem(CUR_KEY);
        if (!sId) return;
        const session = _get(PREFIX + sId);
        if (!session) return;

        if (!session.logs) session.logs = [];
        session.logs.push({
            timestamp: new Date().toISOString(),
            screenId: screenId || 'GLOBAL',
            action,
            data
        });
        _set(PREFIX + sId, session);
        console.log(`[SessionDB:Log] ${screenId || 'GLOBAL'} | ${action}`, data);
    }

    return {
        init, currentId, get, save, complete,
        getLedger, list, listLedgers,
        remove, exportJSON, download, downloadLedger,
        scanFields, logAction
    };
})();

// 전역 노출
window.SessionDB = SessionDB;
