# PTT UI Style

自訂 PTT 網頁版（`term.ptt.cc`）的配色與背景圖片。

> Tampermonkey 腳本，只在 `https://term.ptt.cc/*` 生效。

---

## 功能

- PTT 色號類別 `.q7` 改為白色、`.q3` 改為亮黃
- `body` 背景色改為深灰藍 `#46525e`
- 主畫面區塊（`.main`、`#easyReadingLastRow`、`#easyReadingReplyRow`）套用自訂背景圖

想換配色或換背景圖，直接編輯腳本內 `style.textContent` 那段 CSS 即可。

---

## 安裝

1. 瀏覽器安裝 [Tampermonkey](https://www.tampermonkey.net/) 擴充功能
2. Tampermonkey → 新增腳本，把 `ptt-ui-style.js` 整份內容貼上並儲存
3. 打開 <https://term.ptt.cc/> 即可看到新樣式

---

## 授權

MIT
