/**
 * KB국민카드 기업카드 목업 — 공통 유틸리티 (common.js)
 * 
 * 포함 기능:
 * 1. Toast 메시지 (showToast)
 * 2. 공통 초기화 (Legacy 호환)
 */

(function (win) {
    'use strict';

    // 네임스페이스
    const KB = win.KBCommon = win.KBCommon || {};

    /**
     * Toast 메시지 표시
     * @param {string} msg 메시지 내용
     * @param {number} duration 표시 시간(ms), 기본 2500
     */
    win.showToast = function (msg, duration = 2500) {
        let el = document.querySelector('.kb-toast');
        if (!el) {
            // kb-theme.css 에 정의된 .kb-toast 사용
            el = document.createElement('div');
            el.className = 'kb-toast';
            el.setAttribute('role', 'status');
            el.setAttribute('aria-live', 'polite');
            document.body.appendChild(el);
        }

        // 기존 타이머 취소
        if (el.dataset.timer) {
            clearTimeout(parseInt(el.dataset.timer, 10));
        }

        el.textContent = msg;
        el.classList.add('show');

        const timerId = setTimeout(() => {
            el.classList.remove('show');
        }, duration);

        el.dataset.timer = timerId;
    };

    /**
     * 문서 로드 완료 후 실행할 공통 로직
     */
    function initCommon() {
        // 필요 시 여기에 공통 초기화 로직 추가
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCommon);
    } else {
        initCommon();
    }

})(window);
