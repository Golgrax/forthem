import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import StudentLogin from './components/student/StudentLogin';
import Dashboard from './components/student/Dashboard';
import Enrollment from './components/student/Enrollment';
import Schedule from './components/student/Schedule';
import Modules from './components/student/Modules';
import Grades from './components/student/Grades';
import Assignment from './components/student/Assignment';
import FacultyLogin from './components/faculty/FacultyLogin';
import FacultyDashboard from './components/faculty/FacultyDashboard';
import CreateAnnouncement from './components/faculty/CreateAnnouncement';
import CreateReminder from './components/faculty/CreateReminder';
import Masterlist from './components/faculty/Masterlist';
import FacultySchedule from './components/faculty/FacultySchedule';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty/create-announcement" element={<CreateAnnouncement />} />
          <Route path="/faculty/create-reminder" element={<CreateReminder />} />
          <Route path="/faculty/masterlist" element={<Masterlist />} />
          <Route path="/faculty/schedule" element={<FacultySchedule />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
