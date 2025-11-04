// Mock Data Service - Provides demo data without database

// Generate random data
const randomId = () => Math.floor(Math.random() * 1000000);
const randomName = () => {
  const firstNames = ['John', 'Jane', 'Maria', 'Carlos', 'Anna', 'David', 'Lisa', 'Michael', 'Sarah', 'James'];
  const lastNames = ['Doe', 'Smith', 'Garcia', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson'];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
};

const randomSubject = () => {
  const subjects = ['Science', 'Math', 'Filipino', 'English', 'MAPEH', 'GMRC', 'TLE', 'Araling Panlipunan'];
  return subjects[Math.floor(Math.random() * subjects.length)];
};

const randomGrade = () => {
  const grades = ['A', 'B+', 'B', 'C+', 'C', 'D'];
  return grades[Math.floor(Math.random() * grades.length)];
};

// Mock User Data
export const createMockUser = (username, role) => ({
  id: randomId(),
  username: username || randomName().toLowerCase(),
  role: role || 'student',
  profile_picture: 'https://raw.githubusercontent.com/Golgrax/forthem-assets/main/students/pfp/me.png',
  email: `${username || 'demo'}@example.com`,
  firstName: randomName().split(' ')[0],
  lastName: randomName().split(' ')[1],
  studentId: `STU${randomId().toString().slice(0, 6)}`,
  gradeLevel: 'Grade 5',
  section: 'V-Molave'
});

// Mock Data Storage
let mockUsers = {};
let mockAnnouncements = [];
let mockReminders = [];
let mockGrades = {};
let mockEnrollments = [];
let mockStudents = [];
let mockSchedules = [];
let mockModules = [];
let mockAssignments = [];

// Initialize with some demo data
const initializeMockData = () => {
  // Create some demo announcements
  mockAnnouncements = [
    {
      id: randomId(),
      username: 'Teacher Ann',
      profile_picture: 'https://raw.githubusercontent.com/Golgrax/forthem-assets/main/students/pfp/teacher.png',
      content: 'Hello, V-Molave!\n\nPlease do your Module 5 for this week\'s activity.\n\nThank you!',
      created_at: new Date().toISOString()
    },
    {
      id: randomId(),
      username: 'Teacher Smith',
      profile_picture: 'https://raw.githubusercontent.com/Golgrax/forthem-assets/main/students/pfp/teacher.png',
      content: 'Reminder: Assignment #1 is due on September 23, 2025.\n\nPlease submit on time!',
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  // Create some demo reminders
  mockReminders = [
    {
      id: randomId(),
      username: 'Teacher Ann',
      profile_picture: 'https://raw.githubusercontent.com/Golgrax/forthem-assets/main/students/pfp/teacher.png',
      title: 'Assignment #1',
      text: 'Complete Module 5 exercises',
      due_date: new Date(Date.now() + 86400000 * 2).toISOString()
    }
  ];

  // Create some demo students
  for (let i = 0; i < 10; i++) {
    mockStudents.push({
      id: randomId(),
      username: randomName().toLowerCase(),
      firstName: randomName().split(' ')[0],
      lastName: randomName().split(' ')[1],
      studentId: `STU${randomId().toString().slice(0, 6)}`,
      gradeLevel: `Grade ${Math.floor(Math.random() * 3) + 4}`,
      section: ['V-Molave', 'V-Narra', 'V-Acacia'][Math.floor(Math.random() * 3)]
    });
  }
};

// API Mock Functions
export const mockLogin = (username, password) => {
  // Accept any login - auto-login with demo user
  // Determine role based on username or default to student
  let role = 'student';
  const lowerUsername = (username || '').toLowerCase();
  
  if (lowerUsername.includes('faculty') || lowerUsername.includes('teacher')) {
    role = 'faculty';
  } else if (lowerUsername.includes('transferee') || lowerUsername.includes('transfer')) {
    role = 'transferee';
  }
  
  // Create or get existing user
  if (!mockUsers[username]) {
    mockUsers[username] = createMockUser(username, role);
  }
  
  // Ensure role is set correctly
  mockUsers[username].role = role;
  
  return Promise.resolve({
    message: 'success',
    user: { ...mockUsers[username], role: role }
  });
};

export const mockGetAnnouncements = () => {
  return Promise.resolve({
    announcements: mockAnnouncements
  });
};

export const mockGetReminders = () => {
  return Promise.resolve({
    reminders: mockReminders
  });
};

export const mockGetGrades = (userId) => {
  if (!mockGrades[userId]) {
    mockGrades[userId] = [
      { id: randomId(), subject: 'Science', grade: randomGrade(), remarks: 'Good' },
      { id: randomId(), subject: 'Math', grade: randomGrade(), remarks: 'Excellent' },
      { id: randomId(), subject: 'Filipino', grade: randomGrade(), remarks: 'Good' },
      { id: randomId(), subject: 'GMRC', grade: randomGrade(), remarks: 'Excellent' }
    ];
  }
  return Promise.resolve({
    grades: mockGrades[userId]
  });
};

export const mockGetUser = (userId) => {
  // Find or create user
  const user = Object.values(mockUsers).find(u => u.id === userId) || createMockUser();
  return Promise.resolve({
    user: user
  });
};

export const mockUpdateUser = (userId, updates) => {
  const user = Object.values(mockUsers).find(u => u.id === userId) || createMockUser();
  const updatedUser = { ...user, ...updates };
  mockUsers[updatedUser.username] = updatedUser;
  return Promise.resolve({
    user: updatedUser
  });
};

export const mockGetEnrollments = () => {
  if (mockEnrollments.length === 0) {
    for (let i = 0; i < 5; i++) {
      mockEnrollments.push({
        id: randomId(),
        studentName: randomName(),
        studentId: `STU${randomId().toString().slice(0, 6)}`,
        previousSchool: 'Sample Elementary School',
        previousGrade: 'Grade 4',
        reasonForTransfer: 'Family relocation',
        status: 'pending',
        createdAt: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString()
      });
    }
  }
  return Promise.resolve({
    enrollments: mockEnrollments
  });
};

export const mockUpdateEnrollment = (id, status) => {
  mockEnrollments = mockEnrollments.map(e => 
    e.id === id ? { ...e, status } : e
  );
  return Promise.resolve({ success: true });
};

export const mockGetStudents = () => {
  return Promise.resolve({
    students: mockStudents
  });
};

export const mockGetSchedule = () => {
  if (mockSchedules.length === 0) {
    const subjects = ['Science', 'Math', 'Filipino', 'English', 'MAPEH', 'GMRC'];
    const timeSlots = [
      { time: '8:00 AM - 9:00 AM', day: 'Monday' },
      { time: '9:00 AM - 10:00 AM', day: 'Monday' },
      { time: '10:00 AM - 11:00 AM', day: 'Tuesday' },
      { time: '11:00 AM - 12:00 PM', day: 'Tuesday' },
      { time: '1:00 PM - 2:00 PM', day: 'Wednesday' },
      { time: '2:00 PM - 3:00 PM', day: 'Wednesday' }
    ];
    
    mockSchedules = timeSlots.map((slot, index) => ({
      id: randomId(),
      subject: subjects[index % subjects.length],
      time: slot.time,
      day: slot.day,
      teacher: `Teacher ${randomName().split(' ')[0]}`
    }));
  }
  return Promise.resolve({
    schedule: mockSchedules
  });
};

export const mockGetModules = () => {
  if (mockModules.length === 0) {
    const subjects = ['Science', 'Math', 'Filipino', 'English'];
    mockModules = subjects.map((subject, index) => ({
      id: randomId(),
      subject: subject,
      title: `${subject} Module ${index + 1}`,
      description: `Learn about ${subject} concepts and applications`,
      status: ['available', 'completed', 'in-progress'][Math.floor(Math.random() * 3)]
    }));
  }
  return Promise.resolve({
    modules: mockModules
  });
};

export const mockGetAssignments = () => {
  if (mockAssignments.length === 0) {
    const subjects = ['Science', 'Math', 'MAPEH', 'GMRC'];
    mockAssignments = subjects.map((subject, index) => ({
      id: randomId(),
      subject: subject,
      title: `Assignment #${index + 1}`,
      description: `Complete ${subject} exercises`,
      dueDate: new Date(Date.now() + Math.random() * 86400000 * 7).toISOString(),
      status: ['pending', 'submitted', 'graded'][Math.floor(Math.random() * 3)]
    }));
  }
  return Promise.resolve({
    assignments: mockAssignments
  });
};

export const mockCreateAnnouncement = (content, user) => {
  const announcement = {
    id: randomId(),
    username: user.username,
    profile_picture: user.profile_picture || 'https://raw.githubusercontent.com/Golgrax/forthem-assets/main/students/pfp/teacher.png',
    content: content,
    created_at: new Date().toISOString()
  };
  mockAnnouncements.unshift(announcement);
  return Promise.resolve({
    announcement: announcement
  });
};

export const mockCreateReminder = (title, text, dueDate, user) => {
  const reminder = {
    id: randomId(),
    username: user.username,
    profile_picture: user.profile_picture || 'https://raw.githubusercontent.com/Golgrax/forthem-assets/main/students/pfp/teacher.png',
    title: title,
    text: text,
    due_date: dueDate
  };
  mockReminders.unshift(reminder);
  return Promise.resolve({
    reminder: reminder
  });
};

// Initialize mock data
initializeMockData();

