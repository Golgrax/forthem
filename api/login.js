const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const dbPath = path.join(process.cwd(), 'forthem.db');
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database file:', err.message);
            res.status(500).json({ "error": err.message });
            return;
        }
    });

    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.get(sql, [username, password], (err, row) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        if (row) {
            res.json({
                "message": "success",
                "user": {
                    "id": row.id,
                    "username": row.username,
                    "role": row.role
                }
            });
        } else {
            res.status(401).json({ "error": "Invalid username or password" });
        }
    });
};