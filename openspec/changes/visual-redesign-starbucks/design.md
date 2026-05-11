## Context

依據 `starbucks.md` 規範，對現有 `index.html` 進行視覺層面的重新設計，不變動功能邏輯。

## Goals / Non-Goals

**Goals:**
- 套用星巴克色彩系統與圓角規範。
- 將按鈕轉換為 Pill shape 膠囊狀。
- 引入 `async/await` 流程下的視覺回饋樣式（例如成功標註顏色）。

**Non-Goals:**
- 修改資料庫結構。
- 修改 `app.js` 或 API Endpoint。
- 修改 JavaScript 的 `fetch` 邏輯。

## Decisions

### 1. 核心視覺映射方案
- **Background**: 使用 `#f2f0eb` (Neutral Warm)，而非純白，模擬紙巾與木質質感。
- **Container**: 使用 12px 圓角與白色背景分區內容。
- **Typography**: 使用 `Arial` 模擬 `SoDoSans` 分布，h1/h2 套用 `Starbucks Green (#006241)`。
- **Buttons**: 強制 50px Pill 型態。

## Risks / Trade-offs

- **[Risk]** 直接內嵌 CSS 可能導致 `index.html` 體積變大。 → **Mitigation**: 雖增加體積，但在本階段為最快變更方式。
