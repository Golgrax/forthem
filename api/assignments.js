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

        dbInstance.run(`CREATE TABLE IF NOT EXISTS assignments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            due_date TEXT,
            subject TEXT,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`, (err) => {
            if (err) {
                console.error("Error creating assignments table", err);
            }
        });

        // Check if assignments exist, if not insert default assignments
        const check = 'SELECT COUNT(*) as count FROM assignments';
        dbInstance.get(check, (err, row) => {
            if (err) {
                console.error("Error checking assignments", err);
                return;
            }
            if (row.count === 0) {
                console.log("No assignments found, inserting default assignments...");
                const insertAssignments = 'INSERT INTO assignments (title, description, due_date, subject, user_id) VALUES (?, ?, ?, ?, ?)';
                dbInstance.run(insertAssignments, ["Assignment #1 - Property of Matters", "Complete the worksheet on properties of matter", "2025-08-26", "Science", 1]);
                dbInstance.run(insertAssignments, ["Assignment #2 - Family Tree", "Be creative and make a family tree in your household.", "2025-09-24", "Filipino", 1]);
                console.log("Default assignments inserted");
            } else {
                console.log("Assignments already exist in database");
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
        // Get assignments with optional subject filter
        const { subject } = req.query;
        let sql = "SELECT * FROM assignments";
        let params = [];
        
        if (subject) {
            sql += " WHERE subject = ?";
            params.push(subject);
        }
        
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ "error": err.message });
                return;
            }
            res.json({ assignments: rows });
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
