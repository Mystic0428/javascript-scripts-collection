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
    const PANEL_STYLE_ID = 'pus-panel-style';

    // ==================== 模組狀態 ====================
    let state;
    let panelEl = null;
    let panelOpen = false;
    const fields = {};  // { bodyBg, colorQ7, colorQ3, imageSrc } → input 元素

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
        const img = state.imageSrc.replace(/["\\]/g, '\\$&');
        return `
            .q7 { color: ${state.colorQ7}; }
            .q3 { color: ${state.colorQ3}; }
            #easyReadingLastRow,
            #easyReadingReplyRow,
            .main {
                background: url("${img}") center / 100% no-repeat;
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

    // ==================== 面板 UI ====================
    function injectPanelStyles() {
        if (document.getElementById(PANEL_STYLE_ID)) return;
        const s = document.createElement('style');
        s.id = PANEL_STYLE_ID;
        s.textContent = `
            .pus-gear {
                position: fixed;
                top: 12px;
                right: 12px;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                border: none;
                background: #333;
                color: #fff;
                font-size: 16px;
                line-height: 28px;
                padding: 0;
                cursor: pointer;
                opacity: 0.3;
                transition: opacity 0.2s;
                z-index: 999999;
            }
            .pus-gear:hover { opacity: 1; }

            .pus-panel {
                position: fixed;
                top: 48px;
                right: 12px;
                width: 260px;
                background: #2a2a2a;
                color: #fff;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                padding: 14px 16px;
                z-index: 999999;
                font-family: sans-serif;
                font-size: 13px;
                box-sizing: border-box;
            }

            .pus-field {
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
            }
            .pus-field-stacked {
                flex-direction: column;
                align-items: stretch;
            }
            .pus-field label { flex: 1; }
            .pus-field input[type="color"] {
                width: 48px;
                height: 26px;
                border: none;
                background: none;
                padding: 0;
                cursor: pointer;
            }
            .pus-field input[type="text"] {
                width: 100%;
                margin-top: 4px;
                padding: 4px 6px;
                box-sizing: border-box;
                background: #1a1a1a;
                color: #fff;
                border: 1px solid #555;
                border-radius: 3px;
                font-family: monospace;
                font-size: 12px;
            }
            .pus-upload-btn {
                margin-top: 6px;
                padding: 4px 8px;
                background: #555;
                color: #fff;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                font-size: 12px;
            }
            .pus-upload-btn:hover { background: #666; }
            .pus-reset-btn {
                margin-top: 10px;
                padding: 5px 10px;
                background: transparent;
                color: #ff6b6b;
                border: 1px solid #ff6b6b;
                border-radius: 3px;
                cursor: pointer;
                float: right;
                font-size: 12px;
            }
            .pus-reset-btn:hover { background: rgba(255,107,107,0.15); }
        `;
        document.head.appendChild(s);
    }

    function buildGear() {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pus-gear';
        btn.setAttribute('aria-label', '自訂外觀');
        btn.textContent = '⚙';
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePanel();
        });
        return btn;
    }

    function buildColorField(labelText, key) {
        const row = document.createElement('div');
        row.className = 'pus-field';

        const label = document.createElement('label');
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = 'color';
        input.value = state[key];
        input.addEventListener('input', () => {
            state[key] = input.value;
            save(state);
            apply(state);
        });

        fields[key] = input;
        row.appendChild(label);
        row.appendChild(input);
        return row;
    }

    function buildUrlField() {
        const row = document.createElement('div');
        row.className = 'pus-field pus-field-stacked';

        const label = document.createElement('label');
        label.textContent = '背景圖 URL';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = state.imageSrc;
        input.addEventListener('input', () => {
            state.imageSrc = input.value;
            save(state);
            apply(state);
        });
        fields.imageSrc = input;

        const uploadBtn = document.createElement('button');
        uploadBtn.type = 'button';
        uploadBtn.className = 'pus-upload-btn';
        uploadBtn.textContent = '本地上傳';

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';

        uploadBtn.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (!file) return;
            const MB = 1024 * 1024;
            if (file.size > 4 * MB) {
                alert('圖片過大（> 4MB），請壓縮後再試');
                fileInput.value = '';
                return;
            }
            if (file.size > 2 * MB) {
                alert('圖片較大，存檔可能受限');
            }
            const reader = new FileReader();
            reader.onload = () => {
                const dataUri = reader.result;
                input.value = dataUri;
                state.imageSrc = dataUri;
                save(state);
                apply(state);
            };
            reader.onerror = () => {
                alert('讀取檔案失敗，請重試');
            };
            reader.readAsDataURL(file);
            fileInput.value = '';
        });

        row.appendChild(label);
        row.appendChild(input);
        row.appendChild(uploadBtn);
        row.appendChild(fileInput);
        return row;
    }

    function buildPanel() {
        const panel = document.createElement('div');
        panel.className = 'pus-panel';
        panel.style.display = 'none';
        panel.addEventListener('click', (e) => e.stopPropagation());

        panel.appendChild(buildColorField('主要底色', 'bodyBg'));
        panel.appendChild(buildColorField('白字顏色（.q7）', 'colorQ7'));
        panel.appendChild(buildColorField('黃字顏色（.q3）', 'colorQ3'));
        panel.appendChild(buildUrlField());

        return panel;
    }

    function togglePanel() {
        panelOpen = !panelOpen;
        panelEl.style.display = panelOpen ? 'block' : 'none';
    }

    function setupPanel() {
        injectPanelStyles();
        const gear = buildGear();
        panelEl = buildPanel();
        document.body.appendChild(gear);
        document.body.appendChild(panelEl);
        document.addEventListener('click', () => {
            if (panelOpen) togglePanel();
        });
    }

    // ==================== 初始化 ====================
    state = load();
    apply(state);
    setupPanel();
})();
