const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Determine the correct database path using the repo root (like the working deploy)
// Try repo root relative to this file, then fall back to process.cwd()
let candidatePaths = [
	path.join(__dirname, '..', 'forthem.db'),
	path.join(process.cwd(), 'forthem.db')
];

let dbPath = candidatePaths.find(p => {
	try {
		return fs.existsSync(p);
	} catch (_) {
		return false;
	}
});

if (!dbPath) {
	dbPath = candidatePaths[0];
}

console.log('Database path:', dbPath);
console.log('Environment:', process.env.VERCEL ? 'Vercel' : 'Local');

// Check if database file exists
const dbExists = (() => {
	try {
		return fs.existsSync(dbPath);
	} catch (_) {
		return false;
	}
})();
console.log('Database file exists:', dbExists);

let db;

// Function to initialize database with default data
function initializeDatabase(dbInstance, isFileDb = true) {
    dbInstance.serialize(() => {
        dbInstance.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE, 
            password TEXT, 
            role TEXT,
            profile_picture TEXT,
            welcome_image TEXT,
            email TEXT,
            firstName TEXT,
            lastName TEXT,
            middleName TEXT,
            phone TEXT,
            studentId TEXT,
            employeeId TEXT,
            gradeLevel TEXT,
            section TEXT,
            birthDate TEXT,
            address TEXT,
            parentName TEXT,
            parentPhone TEXT,
            parentEmail TEXT,
            emergencyContact TEXT,
            emergencyPhone TEXT,
            department TEXT,
            position TEXT,
            subject TEXT,
            bio TEXT,
            qualifications TEXT,
            experience TEXT,
            previousSchool TEXT,
            previousGrade TEXT,
            reasonForTransfer TEXT,
            transferDate TEXT,
            academicRecords TEXT,
            recommendationLetter TEXT,
            CONSTRAINT username_unique UNIQUE (username)
        )`, (err) => {
            if (err) {
                console.error("Error creating users table", err);
            }
        });

        dbInstance.run(`CREATE TABLE IF NOT EXISTS schedules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            day TEXT,
            time_start TEXT,
            time_end TEXT,
            subject TEXT,
            teacher_name TEXT,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`, (err) => {
            if (err) {
                console.error("Error creating schedules table", err);
            }
        });

        // Check if schedules exist, if not insert default schedules
        const check = 'SELECT COUNT(*) as count FROM schedules';
        dbInstance.get(check, (err, row) => {
            if (err) {
                console.error("Error checking schedules", err);
                return;
            }
            if (row.count === 0) {
                console.log("No schedules found, inserting default schedules...");
                const insertSchedules = 'INSERT INTO schedules (day, time_start, time_end, subject, teacher_name, user_id) VALUES (?, ?, ?, ?, ?, ?)';
                dbInstance.run(insertSchedules, ["Monday", "12:20", "1:00", "Science", "Juan Miguel Santos", 1]);
                dbInstance.run(insertSchedules, ["Monday", "1:00", "1:40", "Filipino", "Maria Teresa Reyes", 1]);
                dbInstance.run(insertSchedules, ["Monday", "1:40", "2:20", "GMRC", "Carlos Antonio Cruz", 1]);
                dbInstance.run(insertSchedules, ["Monday", "2:20", "2:35", "Recess", "John Miguel Santos", 1]);
                dbInstance.run(insertSchedules, ["Monday", "2:35", "3:15", "Mathematics", "Liza Marie Fernandez", 1]);
                dbInstance.run(insertSchedules, ["Monday", "3:15", "3:55", "Araling Panlipunan", "Jose Luis Garcia", 1]);
                console.log("Default schedules inserted");
            } else {
                console.log("Schedules already exist in database");
            }
        });
    });
}

// Try to connect to file database first
if (dbExists) {
    try {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error opening database file:', err.message);
                // Fallback to in-memory database
                console.log('Falling back to in-memory database...');
                db = new sqlite3.Database(':memory:', (err) => {
                    if (err) {
                        console.error('Error opening in-memory database:', err.message);
                    } else {
                        console.log('Connected to in-memory SQLite database as fallback');
                        initializeDatabase(db, false);
                    }
                });
            } else {
                console.log('Connected to the SQLite database at:', dbPath);
                initializeDatabase(db, true);
            }
        });
    } catch (error) {
        console.error('Failed to open database file, falling back to in-memory database:', error.message);
        db = new sqlite3.Database(':memory:', (err) => {
            if (err) {
                console.error('Error opening in-memory database:', err.message);
            } else {
                console.log('Connected to in-memory SQLite database as fallback');
                initializeDatabase(db, false);
            }
        });
    }
} else {
    console.log('Database file not found, using in-memory database');
    db = new sqlite3.Database(':memory:', (err) => {
        if (err) {
            console.error('Error opening in-memory database:', err.message);
        } else {
            console.log('Connected to in-memory SQLite database');
            initializeDatabase(db, false);
        }
    });
}

// Vercel serverless function handler
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        // Check if requesting schedules for specific user
        if (req.url.includes('/schedules/')) {
            const userId = req.url.split('/').pop();
            const sql = "SELECT * FROM schedules WHERE user_id = ?";
            db.all(sql, [userId], (err, rows) => {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).json({ "error": err.message });
                    return;
                }
                res.json({ schedules: rows });
            });
        } else {
            // Get all schedules
            const sql = "SELECT * FROM schedules ORDER BY time_start";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).json({ "error": err.message });
                    return;
                }
                // Transform the data to match the expected format
                const scheduleData = rows.map(row => ({
                    time: `${row.time_start} - ${row.time_end}`,
                    minutes: "40", // Default minutes
                    subject: row.subject,
                    teacher: row.teacher_name || "Teacher"
                }));
                res.json({ schedule: scheduleData });
            });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
