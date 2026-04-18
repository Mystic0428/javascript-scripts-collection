# 巴哈姆特動畫瘋 GIF 擷取工具

把動畫瘋影片片段快速做成 GIF 動圖，支援解析度／幀率調整、時間範圍選擇、即時截圖。

[![Version](https://img.shields.io/greasyfork/v/525239?label=version)](https://greasyfork.org/zh-TW/scripts/525239)
[![Downloads](https://img.shields.io/greasyfork/dt/525239?label=downloads)](https://greasyfork.org/zh-TW/scripts/525239)
[![License](https://img.shields.io/badge/license-MIT-blue)](#授權)

> Tampermonkey 腳本，只在 `https://ani.gamer.com.tw/animeVideo.php?sn=*` 生效。

---

## 功能

### GIF 擷取

- 雙把手滑桿選擇片段範圍（最短 0.5 秒、最長 15 秒）
- 開始／結束時間也能直接打字（`HH:MM:SS:mmm`）精確設定
- 「跳到目前時間」按鈕把範圍起點對齊當前播放位置
- 擷取進行中可取消（Esc 或按鈕），取消後自動 seek 回原位
- 拖動滑桿時 thumb 上方浮現時間 tooltip

### 輸出調整

| 選項 | 可選值 |
|------|--------|
| 解析度 | 原始（跟隨來源）／ 1080p ／ 720p ／ 540p ／ 360p（只降畫質不升） |
| 幀率 | 原生（跟隨來源）／ 12 fps ／ 8 fps ／ 5 fps |

降解析度或降幀率都能減小 GIF 檔案大小。降幀率時播放長度會自動補償，不會因採樣變少而變快。

### 即時截圖

- 當前播放畫面原始解析度擷取，不影響播放狀態
- 一鍵下載 PNG

---

## 鍵盤快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `Shift + G` | 開啟 GIF 擷取彈窗 |
| `Ctrl + Shift + S` | 立即截圖（任何時候，不需要開彈窗） |
| `Esc` | 關閉彈窗；擷取中則取消擷取 |

---

## 安裝

1. 瀏覽器安裝 [Tampermonkey](https://www.tampermonkey.net/) 擴充功能
2. 到 Greasy Fork 安裝 [巴哈姆特動畫瘋 GIF 截圖工具](https://greasyfork.org/zh-TW/scripts/525239)
3. 打開任一動畫瘋影片頁（`https://ani.gamer.com.tw/animeVideo.php?sn=*`）
4. 播放器工具列會多出 `GIF` 按鈕，點擊或按 `Shift + G` 開啟彈窗

---

## 系統需求

- 支援 `requestVideoFrameCallback` 的瀏覽器：Chrome / Edge 83+、Firefox 132+、Safari 目前不支援
- Tampermonkey（或其他支援 UserScript 的管理器）

---

## 授權

MIT — 見 script 檔頭 `@license` 欄位。
