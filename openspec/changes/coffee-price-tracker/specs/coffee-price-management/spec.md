## 1. 資料庫設計 (Database Schema)

本專案使用 SQLite 關聯式資料庫，建立一張 `coffee_prices` 資料表來記錄每一筆咖啡的價格資訊。

**Table: `coffee_prices`**

| 欄位名稱 (Column) | 資料型態 (Type) | 屬性 (Attributes) | 說明 (Description) |
| :--- | :--- | :--- | :--- |
| `id` | INTEGER | Primary Key, Auto Increment | 資料唯一識別碼 |
| `record_date` | TEXT | Not Null | 記錄日期 (例如：2026年6月) |
| `coffee_name` | TEXT | Not Null | 咖啡品項名稱 (例如：Robustas) |
| `price` | REAL | Not Null | 咖啡價格，支援小數點 (例如：165.5) |

---

## 2. API 規格表 (API Specification)

後端採用 Express.js 提供 RESTful 風格的 Web API，供前端非同步呼叫 (Fetch) 以達成資料的寫入與讀取。

### 2.1 新增咖啡價格資料
* **功能：** 將前端表單輸入的最新咖啡物價寫入 SQLite 資料庫。
* **API 路由：** `/api/insert`
* **HTTP 方法：** `GET` (備註：為簡化實作，此專案透過 Query String 傳遞新增參數)
* **請求參數 (Query String)：**
    * `date`: 記錄日期 (字串)
    * `name`: 咖啡名稱 (字串)
    * `price`: 價格 (數字)
* **回傳格式 (JSON)：**
    ```json
    {
      "message": "success",
      "data": {
        "id": 1,
        "coffee_name": "Robustas"
      }
    }
    ```

### 2.2 查詢咖啡價格列表 (含篩選功能)
* **功能：** 取得資料庫中所有的咖啡價格紀錄，前端收到資料後可再依據需求進行名稱、日期或價格區間的篩選。
* **API 路由：** `/api/price`
* **HTTP 方法：** `GET`
* **回傳格式 (JSON)：**
    ```json
    {
      "message": "success",
      "data": [
        {
          "id": 1,
          "date": "2026年6月",
          "coffee_name": "Robustas",
          "price": 165.5
        },
        {
          "id": 2,
          "date": "2026年6月",
          "coffee_name": "特選那堤",
          "price": 150.0
        }
      ]
    }
    ```

---

## 3. 實作步驟規劃

本專案的開發流程分為四大階段，採漸進式開發：

### Step 1: 專案初始化與環境建置
1.  建立專案資料夾並執行 `npm init -y` 建立 Node.js 專案。
2.  安裝核心套件：執行 `npm install express sqlite3`。
3.  建立專案結構：設定 `public` 目錄放置前端靜態資源 (`style.css`、`index.html`)，並建立 `server.js` 作為後端伺服器進入點。

### Step 2: 資料庫建置與連線
1.  在 `server.js` 引入 `sqlite3` 模組，並建立連線至本地 `database.sqlite` 檔案。
2.  撰寫 SQL 語法：確保伺服器啟動時，若 `coffee_prices` 資料表不存在則自動執行 `CREATE TABLE` 建立資料表。

### Step 3: 實作 Express.js Web API
1.  設定 Express 伺服器，對外開放 `public` 資料夾。
2.  實作 `/api/price` 路由：撰寫 `SELECT * FROM coffee_prices` 指令，將結果轉為 JSON 格式回傳。
3.  實作 `/api/insert` 路由：接收 Query 參數，撰寫 `INSERT INTO coffee_prices` 指令將資料存入，並做好錯誤處理 (Error Handling)。

### Step 4: 前端網頁撰寫與串接
1.  **UI/UX 設計**：使用 HTML 與 CSS 實作現代化卡片式排版，採用星巴克經典綠色系 (`#006241`) 作為主色調，並實作斑馬紋表格與清楚的按鈕層級對比。
2.  **API 串接**：使用原生 JavaScript `fetch()` API 串接後端。
3.  **動態渲染**：實作表單送出事件攔截 (`e.preventDefault()`)，新增資料成功後動態更新下方的價格紀錄表格，並提供即時的成功/失敗訊息提示。