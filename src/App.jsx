import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import StudentLogin from './components/StudentLogin';
import Dashboard from './components/Dashboard';
import Enrollment from './components/Enrollment';
import Schedule from './components/Schedule';
import Modules from './components/Modules';
import Grades from './components/Grades';
import Assignment from './components/Assignment';
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
