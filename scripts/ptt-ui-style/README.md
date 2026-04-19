# PTT UI Style

自訂 PTT 網頁版（`term.ptt.cc`）的配色與背景圖片。

> Tampermonkey 腳本，只在 `https://term.ptt.cc/*` 生效。

---

## 功能

- PTT 色號類別 `.q7` 改為白色、`.q3` 改為亮黃
- `body` 背景色改為深灰藍 `#46525e`
- 主畫面區塊（`.main`、`#easyReadingLastRow`、`#easyReadingReplyRow`）套用自訂背景圖

---

## 自訂設定

打開 `https://term.ptt.cc/` 後，畫面右上角會有一顆半透明的 ⚙ 齒輪（滑鼠移近會變明顯）。點擊展開設定面板，可即時調整：

| 欄位 | 說明 |
|------|------|
| 主要底色 | 整個 `body` 的背景色 |
| 白字顏色（.q7） | PTT `.q7` 色號類別的字體顏色 |
| 黃字顏色（.q3） | PTT `.q3` 色號類別的字體顏色 |
| 背景圖 URL | 主畫面背景圖，可貼 http(s) 網址或按 **本地上傳** 選一張本地圖片 |
| 恢復預設 | 一鍵回到出廠配色與背景圖（會先確認） |

所有改動**即時套用**並自動存入瀏覽器 `localStorage`（key：`ptt-ui-style:v1`），重新整理或關瀏覽器後仍保留。

本地上傳的圖片會轉 base64 存進 `localStorage`：
- 小於 2MB：直接使用
- 2–4MB：會跳警告但仍可使用（可能接近儲存上限）
- 大於 4MB：拒絕，請壓縮後再試

---

## 安裝

1. 瀏覽器安裝 [Tampermonkey](https://www.tampermonkey.net/) 擴充功能
2. Tampermonkey → 新增腳本，把 `ptt-ui-style.js` 整份內容貼上並儲存
3. 打開 <https://term.ptt.cc/> 即可看到新樣式

---

## 授權

MIT
