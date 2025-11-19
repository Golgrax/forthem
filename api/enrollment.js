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

        dbInstance.run(`CREATE TABLE IF NOT EXISTS enrollment (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_name TEXT,
            student_address TEXT,
            parent_name TEXT,
            parent_address TEXT,
            status TEXT DEFAULT 'pending',
            enrollment_data TEXT,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`, (err) => {
            if (err) {
                console.error("Error creating enrollment table", err);
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
        const url = new URL(req.url, `http://${req.headers.host}`);
        const userId = url.searchParams.get('userId');

        if (userId) {
            // Get enrollment by user_id
            const sql = "SELECT * FROM enrollment WHERE user_id = ?";
            db.get(sql, [userId], (err, row) => {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).json({ "error": err.message });
                    return;
                }
                res.json({ enrollment: row });
            });
        } else if (req.url.includes('/pending')) {
            // Check if requesting pending enrollments
            const sql = "SELECT * FROM enrollment WHERE status = 'pending'";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).json({ "error": err.message });
                    return;
                }
                res.json({ enrollments: rows });
            });
        } else {
            // Get all enrollments
            const sql = "SELECT * FROM enrollment";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).json({ "error": err.message });
                    return;
                }
                res.json({ enrollments: rows });
            });
        }
    } else if (req.method === 'POST') {
        // Create new enrollment
        const { 
            student_name, 
            student_address, 
            parent_name, 
            parent_address, 
            userId,
            learner_info,
            current_address,
            permanent_address,
            parent_info
        } = req.body;
        
        if (!student_name || !student_address || !parent_name || !parent_address || !userId) {
            return res.status(400).json({ "error": "Missing required fields" });
        }

        // Store additional enrollment data as JSON
        const enrollmentData = JSON.stringify({
            learner_info,
            current_address,
            permanent_address,
            parent_info
        });

        const sql = 'INSERT INTO enrollment (student_name, student_address, parent_name, parent_address, user_id, enrollment_data) VALUES (?, ?, ?, ?, ?, ?)';
        db.run(sql, [student_name, student_address, parent_name, parent_address, userId, enrollmentData], function(err) {
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
    } else if (req.method === 'PUT') {
        // Update enrollment status
        const enrollmentId = req.url.split('/').pop();
        const { status } = req.body;
        
        if (!status) {
            return res.status(400).json({ "error": "Missing status" });
        }

        const sql = 'UPDATE enrollment SET status = ? WHERE id = ?';
        db.run(sql, [status, enrollmentId], function(err) {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ "error": err.message });
                return;
            }
            res.json({ "message": "success" });
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
