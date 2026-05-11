## Context

目前的專案僅有簡易的 API，尚無正式的資料庫規格與系統化的追蹤功能。本專案將建立一個基於 Node.js / Express.js / SQLite 的標準架構。

## Goals / Non-Goals

**Goals:**
- 提供 SQLite 資料庫 Schema，包含 `date` (TEXT), `coffee_name` (TEXT), `price` (REAL)。
- 建立 Web API 斷點，支援 `POST` (新增) 與 `GET` (查詢)。
- 實現前端 Dashboard，具備輸入表單與價格搜尋列表。

**Non-Goals:**
- 排除使用者權限控管 (Authentication)。
- 暫不支原圖表視覺化 (Charts/Visualization)。

## Decisions

### 1. 資料庫選擇
- **選擇**: SQLite
- **原因**: 輕量、單檔案、無須伺服器，適合本地與小型專案的快速原型開發。

### 2. 資料結構設計
- **名稱**: `coffee_price`
- **欄位**:
  - `id` (INTEGER PRIMARY KEY)
  - `date` (TEXT): 存儲年月或日期字串。
  - `coffee_name` (TEXT): 關鍵搜尋欄位。
  - `price` (REAL): 數值儲存。

### 3. API 設計風格
- **新增**: `GET /api/insert?date=...&name=...&price=...` (為了操作方便，延用現有的 URL Params 模式，或升級為標準 `POST /api/prices`)。
- **查詢**: `GET /api/price` (支援 Query Params 篩選)。

## Risks / Trade-offs

- **[Risk]** 直連 SQLite 可能導致併發寫入問題 → **Mitigation** 專案規模小，使用 `node-sqlite3` 異步隊列處理即可。
