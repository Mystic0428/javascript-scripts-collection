# javascript-scripts-collection

自用的瀏覽器 / Node.js 腳本集合。每個腳本放在 `scripts/<script-name>/` 底下，有各自的 `README.md` 與檔案。

---

## 腳本列表

### 影片／動畫工具

| 名稱 | 說明 | 類型 |
|------|------|------|
| [巴哈姆特動畫瘋 GIF 擷取工具](./scripts/bahamut-anime-gif-capture/) | 在動畫瘋把影片片段做成 GIF、支援解析度／幀率調整、即時截圖 | Tampermonkey Userscript |

<!-- 未來新增的分類範例：

### 瀏覽器工具
### 開發輔助
### 資料處理

-->

---

## 目錄結構

```
repo-root/
├── README.md                    # 本檔（索引）
├── CLAUDE.md                    # AI 協作指引
└── scripts/
    └── <script-name>/
        ├── README.md            # 該腳本的使用說明
        └── <script-name>.js     # 腳本檔
```

## 新增腳本

1. 在 `scripts/` 底下開 `<script-name>/` 資料夾
2. 放入腳本檔與該腳本專屬的 `README.md`
3. 回到本檔把它加到「腳本列表」對應分類下
