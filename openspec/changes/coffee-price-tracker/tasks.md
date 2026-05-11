## 1. 資料庫與環境設定

- [ ] 1.1 安裝 `sqlite3` 與相關相依套件至 `package.json`。
- [ ] 1.2 建立 `db.js` 用於初始化 SQLite 資料庫與建立 `coffee_price` 資料表。
- [ ] 1.3 執行初始化指令，驗證 `db/sqlite.db` 是否正確產生並包含初始資料。

## 2. 後端 API 開發 (Express.js)

- [ ] 2.1 在 `app.js` 中引入 `sqlite3` 並建立資料庫連線。
- [ ] 2.2 實作 `GET /api/price` API，讀取資料庫內所有記錄並以 JSON 回傳。
- [ ] 2.3 實作 `GET /api/insert` API，將網址參數的 date, name, price 存入資料庫。

## 3. 前端介面開發 (HTML/JS)

- [ ] 3.1 修改 `public/index.html`，新增「新增咖啡物價資料」表單（包含 Date, Name, Price）。
- [ ] 3.2 在 `index.html` 中實作 JavaScript Fetch 邏輯，將表單資料透過 API 傳送至後端。
- [ ] 3.3 實作查詢介面，包含關鍵字搜尋功能，並以 Table 顯示從清單取得的物價列表。

## 4. 視覺美化 (Starbucks 風格)

- [ ] 4.1 套用 Starbucks 品牌色系與 12px 圓角卡片設計。
- [ ] 4.2 設置 SoDoSans/Arial 字體與全域字距 (-0.16px)。
- [ ] 4.3 重構按鈕為 50px Pill (膠囊) 形狀並優化輸入框邊框視覺。

