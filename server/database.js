
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Create data directory for SQLite database if it doesn't exist
const dataDir = 'data';
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const DBSOURCE = "data/forthem.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;
