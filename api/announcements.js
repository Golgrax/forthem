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

        dbInstance.run(`CREATE TABLE IF NOT EXISTS announcements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`, (err) => {
            if (err) {
                console.error("Error creating announcements table", err);
            }
        });

        // Check if announcements exist, if not insert default announcement
        const check = 'SELECT COUNT(*) as count FROM announcements';
        dbInstance.get(check, (err, row) => {
            if (err) {
                console.error("Error checking announcements", err);
                return;
            }
            if (row.count === 0) {
                console.log("No announcements found, inserting default announcement...");
                // First ensure we have a faculty user
                const insertUser = isFileDb ? 'INSERT INTO users (username, password, role, profile_picture, welcome_image) VALUES (?,?,?,?,?)' : 'INSERT OR IGNORE INTO users (username, password, role, profile_picture, welcome_image) VALUES (?,?,?,?,?)';
                dbInstance.run(insertUser, ["faculty", "password", "faculty", "https://raw.githubusercontent.com/Golgrax/forthem-assets/main/pfp/teacher.png", null], function(err) {
                    if (err) {
                        console.error("Error inserting faculty user", err);
                    } else {
                        const insertAnnouncement = 'INSERT INTO announcements (content, user_id) VALUES (?, ?)';
                        dbInstance.run(insertAnnouncement, ["Hello, V-Molave! Please do your Module 5 for this week's activity. Thank you!", this.lastID || 2]);
                        console.log("Default announcement inserted");
                    }
                });
            } else {
                console.log("Announcements already exist in database");
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
        // Get all announcements
        const sql = `
            SELECT a.id, a.content, a.created_at, u.username, u.profile_picture
            FROM announcements a
            JOIN users u ON a.user_id = u.id
            ORDER BY a.created_at DESC
        `;
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ "error": err.message });
                return;
            }
            res.json({ announcements: rows });
        });
    } else if (req.method === 'POST') {
        // Create new announcement
        const { content, userId } = req.body;
        if (!content || !userId) {
            return res.status(400).json({ "error": "Missing content or userId" });
        }

        const sql = 'INSERT INTO announcements (content, user_id) VALUES (?, ?)';
        db.run(sql, [content, userId], function(err) {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "id": this.lastID
            });
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
