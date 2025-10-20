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

// On Vercel, the database file is read-only, so we can't create it
// We'll handle this in the database connection logic

let db;

// Function to initialize database with default data
function initializeDatabase(dbInstance, isFileDb = true) {
    dbInstance.serialize(() => {
        dbInstance.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE, 
            password TEXT, 
            role TEXT,
            CONSTRAINT username_unique UNIQUE (username)
        )`, (err) => {
            if (err) {
                console.error("Error creating table", err);
            } else {
                console.log("Users table created or already exists");
            }
        });

        // Check if users exist, if not insert default users
        const check = 'SELECT COUNT(*) as count FROM users';
        dbInstance.get(check, (err, row) => {
            if (err) {
                console.error("Error checking users", err);
                return;
            }
            if (row.count === 0) {
                console.log("No users found, inserting default users...");
                const insert = isFileDb ? 'INSERT INTO users (username, password, role) VALUES (?,?,?)' : 'INSERT OR IGNORE INTO users (username, password, role) VALUES (?,?,?)';
                dbInstance.run(insert, ["student", "password", "student"]);
                dbInstance.run(insert, ["faculty", "password", "faculty"]);
                dbInstance.run(insert, ["transferee", "password", "transferee"]);
                console.log("Default users inserted");
            } else {
                console.log("Users already exist in database");
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

    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    console.log('Login attempt:', req.body); // Add logging for debugging
    
    const { username, password } = req.body;
    
    if (!username || !password) {
        console.log('Missing credentials');
        return res.status(400).json({ "error": "Username and password are required" });
    }
    
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.get(sql, [username, password], (err, row) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ "error": err.message });
        }
        
        if (row) {
            console.log('Login successful for user:', username);
            res.json({
                "message": "success",
                "user": {
                    "id": row.id,
                    "username": row.username,
                    "role": row.role
                }
            });
        } else {
            console.log('Invalid credentials for user:', username);
            res.status(401).json({ "error": "Invalid username or password" });
        }
    });
};
