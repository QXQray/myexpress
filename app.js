import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sqlite3 from 'sqlite3';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'db', 'sqlite.db');

// 開啟資料庫，如果不存在會自動建立
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('無法開啟資料庫：', err.message);
    } else {
        console.log('在 app.js 中成功連接到 SQLite 資料庫。');
    }
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/api/price', (req, res) => {
    const sql = "SELECT * FROM coffee_price";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});
app.get('/api/price', (req, res) => {
    const sql = "SELECT * FROM coffee_price";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});
app.get('/api', (req, res) => {
    const provider = req.query.provider;
    if (!provider) {
        res.status(400).json({ "error": "Missing 'provider' query parameter" });
        return;
    }
    const sql = "SELECT * FROM coffee_price WHERE coffee_name = ?";
    db.all(sql, [provider], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.get('/api/insert', (req, res) => {
    const { date, name, price } = req.query;
    if (!date || !name || !price) {
        res.status(400).json({ "error": "Missing required query parameters: date, name, or price" });
        return;
    }
    const sql = "INSERT INTO coffee_price (date, coffee_name, price) VALUES (?, ?, ?)";
    const params = [date, name, price];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": {
                id: this.lastID,
                date,
                coffee_name: name,
                price
            }
        });
    });
});

export default app;
