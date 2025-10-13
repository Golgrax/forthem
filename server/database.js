
const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "forthem.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE, 
                password TEXT, 
                role TEXT,
                CONSTRAINT username_unique UNIQUE (username)
            )`, (err) => {
                if (err) {
                    console.error("Error creating table", err);
                }
            });

            const check = 'SELECT COUNT(*) as count FROM users';
            db.get(check, (err, row) => {
                if (err) {
                    console.error("Error checking users", err);
                    return;
                }
                if (row.count === 0) {
                    console.log("No users found, seeding database...");
                    const insert = 'INSERT INTO users (username, password, role) VALUES (?,?,?)';
                    db.run(insert, ["student", "password", "student"]);
                    db.run(insert, ["faculty", "password", "faculty"]);
                    db.run(insert, ["transferee", "password", "transferee"]);
                }
            });
        });
    }
});

module.exports = db;
