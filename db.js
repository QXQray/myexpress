import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'db', 'sqlite.db');

// 開啟資料庫，如果不存在會自動建立
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('無法開啟資料庫：', err.message);
    } else {
        console.log('成功連接到 SQLite 資料庫。');
        initializeTable();
    }
});

function initializeTable() {
    // 建立 coffee_price 資料表，包含 日期 (date)、咖啡名稱 (coffee_name)、價格 (price)
    db.run(`CREATE TABLE IF NOT EXISTS coffee_price (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        coffee_name TEXT,
        price REAL
    )`, (err) => {
        if (err) {
            console.error('建立資料表失敗：', err.message);
        } else {
            console.log('coffee_price 資料表已就緒。');
            insertInitialData();
        }
    });
}

function insertInitialData() {
    const data = [
        ["2026年3月", "Other Milds", 334.43],
        ["2026年3月", "Colombian Milds", 337.45],
        ["2026年3月", "Brazilian Naturals", 320.51],
        ["2026年3月", "Robustas", 176.77],
        ["2026年4月", "Other Milds", 331.22],
        ["2026年4月", "Colombian Milds", 334.56],
        ["2026年4月", "Brazilian Naturals", 313.76],
        ["2026年4月", "Robustas", 164.64],
        ["2026年5月", "Other Milds", 325.18],
        ["2026年5月", "Colombian Milds", 321.64],
        ["2026年5月", "Brazilian Naturals", 307.92],
        ["2026年5月", "Robustas", 165.49]
    ];

    // 檢查是否有資料，避免重複插入
    db.get("SELECT COUNT(*) as count FROM coffee_price", (err, row) => {
        if (err) {
            console.error('檢查資料量失敗：', err.message);
            return;
        }

        if (row.count === 0) {
            const stmt = db.prepare("INSERT INTO coffee_price (date, coffee_name, price) VALUES (?, ?, ?)");
            data.forEach((row) => {
                stmt.run(row);
            });
            stmt.finalize((err) => {
                if (err) {
                    console.error('插入資料失敗：', err.message);
                } else {
                    console.log('成功插入咖啡物價初始資料。');
                }
            });
        } else {
            console.log('資料庫中已有資料，略過插入步驟。');
        }
    });
}

export default db;
