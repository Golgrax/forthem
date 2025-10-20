
const express = require('express');
const cors = require('cors');
const db = require('./database.js');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;

app.post("/api/login", (req, res) => {
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
                    "role": row.role,
                    "profile_picture": row.profile_picture,
                    "welcome_image": row.welcome_image,
                    "email": row.email,
                    "firstName": row.firstName,
                    "lastName": row.lastName,
                    "middleName": row.middleName,
                    "phone": row.phone,
                    "studentId": row.studentId,
                    "employeeId": row.employeeId,
                    "gradeLevel": row.gradeLevel,
                    "section": row.section,
                    "birthDate": row.birthDate,
                    "address": row.address,
                    "parentName": row.parentName,
                    "parentPhone": row.parentPhone,
                    "parentEmail": row.parentEmail,
                    "emergencyContact": row.emergencyContact,
                    "emergencyPhone": row.emergencyPhone,
                    "department": row.department,
                    "position": row.position,
                    "subject": row.subject,
                    "bio": row.bio,
                    "qualifications": row.qualifications,
                    "experience": row.experience,
                    "previousSchool": row.previousSchool,
                    "previousGrade": row.previousGrade,
                    "reasonForTransfer": row.reasonForTransfer,
                    "transferDate": row.transferDate,
                    "academicRecords": row.academicRecords,
                    "recommendationLetter": row.recommendationLetter
                }
            });
        } else {
            res.status(401).json({ "error": "Invalid username or password" });
        }
    });
});

// Update user profile
app.put("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;
    
    // Build dynamic SQL query based on provided fields
    const fields = [];
    const values = [];
    
    Object.keys(updateData).forEach(key => {
        if (updateData[key] !== undefined && updateData[key] !== null) {
            fields.push(`${key} = ?`);
            values.push(updateData[key]);
        }
    });
    
    if (fields.length === 0) {
        return res.status(400).json({ "error": "No fields to update" });
    }
    
    values.push(userId);
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    
    db.run(sql, values, function(err) {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        
        // Return updated user data
        const selectSql = "SELECT * FROM users WHERE id = ?";
        db.get(selectSql, [userId], (err, row) => {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            
            res.json({
                "message": "Profile updated successfully",
                "user": {
                    "id": row.id,
                    "username": row.username,
                    "role": row.role,
                    "profile_picture": row.profile_picture,
                    "welcome_image": row.welcome_image,
                    "email": row.email,
                    "firstName": row.firstName,
                    "lastName": row.lastName,
                    "middleName": row.middleName,
                    "phone": row.phone,
                    "studentId": row.studentId,
                    "employeeId": row.employeeId,
                    "gradeLevel": row.gradeLevel,
                    "section": row.section,
                    "birthDate": row.birthDate,
                    "address": row.address,
                    "parentName": row.parentName,
                    "parentPhone": row.parentPhone,
                    "parentEmail": row.parentEmail,
                    "emergencyContact": row.emergencyContact,
                    "emergencyPhone": row.emergencyPhone,
                    "department": row.department,
                    "position": row.position,
                    "subject": row.subject,
                    "bio": row.bio,
                    "qualifications": row.qualifications,
                    "experience": row.experience,
                    "previousSchool": row.previousSchool,
                    "previousGrade": row.previousGrade,
                    "reasonForTransfer": row.reasonForTransfer,
                    "transferDate": row.transferDate,
                    "academicRecords": row.academicRecords,
                    "recommendationLetter": row.recommendationLetter
                }
            });
        });
    });
});

app.get("/api/announcements", (req, res) => {
    const sql = `
        SELECT a.id, a.content, a.created_at, u.username, u.profile_picture
        FROM announcements a
        JOIN users u ON a.user_id = u.id
        ORDER BY a.created_at DESC
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({ announcements: rows });
    });
});

app.post("/api/announcements", (req, res) => {
    const { content, userId } = req.body;
    if (!content || !userId) {
        return res.status(400).json({ "error": "Missing content or userId" });
    }

    const sql = 'INSERT INTO announcements (content, user_id) VALUES (?, ?)';
    db.run(sql, [content, userId], function(err) {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "id": this.lastID
        });
    });
});

app.get("/api/reminders", (req, res) => {
    const sql = `
        SELECT r.id, r.title, r.text, r.due_date, u.username, u.profile_picture
        FROM reminders r
        JOIN users u ON r.user_id = u.id
        ORDER BY r.due_date ASC
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({ reminders: rows });
    });
});

app.post("/api/reminders", (req, res) => {
    const { title, text, dueDate, userId } = req.body;
    if (!title || !text || !dueDate || !userId) {
        return res.status(400).json({ "error": "Missing required fields" });
    }

    const sql = 'INSERT INTO reminders (title, text, due_date, user_id) VALUES (?, ?, ?, ?)';
    db.run(sql, [title, text, dueDate, userId], function(err) {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "id": this.lastID
        });
    });
});

app.get("/api/students", (req, res) => {
    const sql = "SELECT id, username FROM users WHERE role = 'student'";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({ students: rows });
    });
});

app.get("/api/modules", (req, res) => {
    const sql = "SELECT * FROM modules";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({ modules: rows });
    });
});

app.get("/api/grades/:userId", (req, res) => {
    const sql = "SELECT * FROM grades WHERE user_id = ?";
    db.all(sql, [req.params.userId], (err, rows) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({ grades: rows });
    });
});

app.get("/api/assignments", (req, res) => {
    const { subject } = req.query;
    let sql = "SELECT * FROM assignments";
    let params = [];
    
    if (subject) {
        sql += " WHERE subject = ?";
        params.push(subject);
    }
    
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({ assignments: rows });
    });
});

app.post("/api/enrollment", (req, res) => {
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
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "id": this.lastID
        });
    });
});

app.get("/api/enrollment/pending", (req, res) => {
    const sql = "SELECT * FROM enrollment WHERE status = 'pending'";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({ enrollments: rows });
    });
});

app.put("/api/enrollment/:id", (req, res) => {
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ "error": "Missing status" });
    }

    const sql = 'UPDATE enrollment SET status = ? WHERE id = ?';
    db.run(sql, [status, req.params.id], function(err) {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({ "message": "success" });
    });
});

app.put("/api/users/:id", (req, res) => {
    const { profile_picture } = req.body;
    const sql = 'UPDATE users SET profile_picture = ?, welcome_image = ? WHERE id = ?';
    db.run(sql, [profile_picture, profile_picture, req.params.id], function(err) {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        const sql = "SELECT * FROM users WHERE id = ?";
        db.get(sql, [req.params.id], (err, row) => {
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
                        "role": row.role,
                        "profile_picture": row.profile_picture,
                        "welcome_image": row.welcome_image
                    }
                });
            } else {
                res.status(404).json({ "error": "User not found" });
            }
        });
    });
});

app.get("/api/schedule", (req, res) => {
    const sql = "SELECT * FROM schedules ORDER BY time_start";
    db.all(sql, [], (err, rows) => {
        if (err) {
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
});

app.get("/api/schedules/:userId", (req, res) => {
    const sql = "SELECT * FROM schedules WHERE user_id = ?";
    db.all(sql, [req.params.userId], (err, rows) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({ schedules: rows });
    });
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
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

    db.run(`CREATE TABLE IF NOT EXISTS announcements (
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

    db.run(`CREATE TABLE IF NOT EXISTS reminders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        text TEXT,
        due_date TEXT,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`, (err) => {
        if (err) {
            console.error("Error creating reminders table", err);
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS modules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT,
        teacher_name TEXT
    )`, (err) => {
        if (err) {
            console.error("Error creating modules table", err);
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS grades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT,
        grade TEXT,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`, (err) => {
        if (err) {
            console.error("Error creating grades table", err);
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS assignments (
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

    db.run(`CREATE TABLE IF NOT EXISTS enrollment (
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

    db.run(`CREATE TABLE IF NOT EXISTS schedules (
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

    console.log("Seeding database...");
    db.run("DELETE FROM users");
    db.run("DELETE FROM announcements");
    db.run("DELETE FROM reminders");
    db.run("DELETE FROM modules");
    db.run("DELETE FROM grades");
    db.run("DELETE FROM assignments");
    db.run("DELETE FROM enrollment");
    db.run("DELETE FROM schedules");

    const insert = 'INSERT INTO users (username, password, role, profile_picture, welcome_image) VALUES (?,?,?,?,?)';
    db.run(insert, ["student", "password", "student", "https://github.com/Golgrax/forthem-assets/raw/refs/heads/main/students/pfp/me.png", "https://raw.githubusercontent.com/Golgrax/forthem-assets/main/students/backgrounds/school/image.png"]);
    db.run(insert, ["faculty", "password", "faculty", "https://raw.githubusercontent.com/Golgrax/forthem-assets/main/pfp/teacher.png", null]);
    db.run(insert, ["transferee", "password", "transferee", null, null]);

    db.get("SELECT id FROM users WHERE role = 'faculty'", (err, row) => {
        if (err) {
            console.error("Error getting faculty user", err);
            return;
        }
        if (row) {
            const insertAnnouncements = 'INSERT INTO announcements (content, user_id) VALUES (?, ?)';
            db.run(insertAnnouncements, ["Hello, V-Molave! Please do your Module 5 for this week's activity. Thank you!", row.id]);
        }
    });

    const insertSchedules = 'INSERT INTO schedules (day, time_start, time_end, subject, teacher_name, user_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(insertSchedules, ["Monday", "12:20", "1:00", "Science", "Juan Miguel Santos", 1]);
    db.run(insertSchedules, ["Monday", "1:00", "1:40", "Filipino", "Maria Teresa Reyes", 1]);
    db.run(insertSchedules, ["Monday", "1:40", "2:20", "GMRC", "Carlos Antonio Cruz", 1]);
    db.run(insertSchedules, ["Monday", "2:20", "2:35", "Recess", "John Miguel Santos", 1]);
    db.run(insertSchedules, ["Monday", "2:35", "3:15", "Mathematics", "Liza Marie Fernandez", 1]);
    db.run(insertSchedules, ["Monday", "3:15", "3:55", "Araling Panlipunan", "Jose Luis Garcia", 1]);

    const insertModules = 'INSERT INTO modules (subject, teacher_name) VALUES (?, ?)';
    db.run(insertModules, ["Science", "Ms. Cha"]);
    db.run(insertModules, ["Filipino", "Ms. Cha"]);
    db.run(insertModules, ["GMRC", "Ms. Cha"]);
    db.run(insertModules, ["Mathematics", "Ms. Cha"]);
    db.run(insertModules, ["Araling Panlipunan", "Ms. Cha"]);
    db.run(insertModules, ["MAPEH", "Ms. Cha"]);
    db.run(insertModules, ["EPP", "Ms. Cha"]);

    const insertGrades = 'INSERT INTO grades (subject, grade, user_id) VALUES (?, ?, ?)';
    db.run(insertGrades, ["Science", "A", 1]);
    db.run(insertGrades, ["Filipino", "A", 1]);
    db.run(insertGrades, ["GMRC", "A", 1]);

    const insertAssignments = 'INSERT INTO assignments (title, description, due_date, subject, user_id) VALUES (?, ?, ?, ?, ?)';
    db.run(insertAssignments, ["Assignment #1 - Property of Matters", "Complete the worksheet on properties of matter", "2025-08-26", "Science", 1]);
    db.run(insertAssignments, ["Assignment #2 - Family Tree", "Be creative and make a family tree in your household.", "2025-09-24", "Filipino", 1]);

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
