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

    const style = document.createElement('style');
    style.textContent = `
        .q7 { color: #fff; }
        .q3 { color: #fdff00; }
        #easyReadingLastRow,
        #easyReadingReplyRow,
        .main {
            background: url(https://i.imgur.com/s1tMBrr.jpg) center / 100% no-repeat;
        }
        body { background-color: #46525e; }
    `;
    document.head.appendChild(style);
})();
