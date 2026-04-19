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
    apply(DEFAULTS);
})();
