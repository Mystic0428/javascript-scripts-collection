// ==UserScript==
// @name         PTT UI Style
// @namespace    GitHub:Mystic0428
// @version      1.0.0
// @description  自訂 PTT 網頁版（term.ptt.cc）的配色與背景圖
// @author       GitHub:Mystic0428
// @match        https://term.ptt.cc/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ptt.cc
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    // ==================== 預設值 ====================
    const DEFAULTS = {
        bodyBg:   '#46525e',
        colorQ7:  '#ffffff',
        colorQ3:  '#fdff00',
        imageSrc: 'https://i.imgur.com/s1tMBrr.jpg',
    };

    const STYLE_ID = 'pus-style';
    const STORAGE_KEY = 'ptt-ui-style:v1';

    // ==================== 儲存 ====================
    function load() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { ...DEFAULTS };
        try {
            const parsed = JSON.parse(raw);
            const clean = { ...DEFAULTS };
            for (const k of Object.keys(DEFAULTS)) {
                if (typeof parsed[k] === typeof DEFAULTS[k]) {
                    clean[k] = parsed[k];
                }
            }
            return clean;
        } catch (e) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...DEFAULTS }));
            } catch (_) { /* recovery write best-effort */ }
            return { ...DEFAULTS };
        }
    }

    function save(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            alert('儲存失敗，可能是瀏覽器儲存空間已滿');
        }
    }

    // ==================== 樣式套用 ====================
    function buildCss(state) {
        return `
            .q7 { color: ${state.colorQ7}; }
            .q3 { color: ${state.colorQ3}; }
            #easyReadingLastRow,
            #easyReadingReplyRow,
            .main {
                background: url(${state.imageSrc}) center / 100% no-repeat;
            }
            body { background-color: ${state.bodyBg}; }
        `;
    }

    function apply(state) {
        let style = document.getElementById(STYLE_ID);
        if (!style) {
            style = document.createElement('style');
            style.id = STYLE_ID;
            document.head.appendChild(style);
        }
        style.textContent = buildCss(state);
    }

    // ==================== 初始化 ====================
    const state = load();
    apply(state);
})();
