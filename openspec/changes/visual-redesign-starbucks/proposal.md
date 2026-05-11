## Why

目前的「咖啡物價追蹤」Todo List（index.html）功能雖然完整，但其預設的 HTML 視覺風格過於通用且缺乏品牌質感。為了將其改造為具有「星巴克 (Starbucks)」品牌體驗的數位產品，我們需要套用 `starbucks.md` 中定義的設計語言，提升使用者在操作時的溫潤感與儀式感。

## What Changes

- **視覺風格升級**：將 `index.html` 的背景、容器、標題、輸入框、按鈕、表格與訊息提示，從原生風格全換轉換為星巴克品牌視覺。
- **佈局調整**：將內容集中於卡片式容器中，層疊在溫潤的奶油色背景上。
- **互動優化**：為按鈕加入膠囊形狀、品牌色填滿以及物理縮放回饋（scale 0.95）。
- **注意**：此變更僅限於 HTML 結構（CSS class）與樣式定義，**不涉及任何 JavaScript 邏輯或 API 行為的修改**。

## Capabilities

### New Capabilities
- 無：本計畫不增加新系統行為，純屬視覺套用。

### Modified Capabilities
- 無：本計畫不修改現行系統需求。

## Impact

- **Affected Files**: `public/index.html` (與其內嵌 CSS / 結構)。
- **Approach (Tech Method)**:
  - 在 `index.html` 中引入 `starbucks.md` 定義的色彩體系與字體。
  - 使用 12px 圓角半徑作為卡片基礎。
  - 核心顏色採用 `#006241` (Starbucks Green) 與 `#00754A` (Green Accent)。
  - 所有的提交與執行按鈕均轉換為 `full-pill` 型態。
