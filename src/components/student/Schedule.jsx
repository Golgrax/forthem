import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';

const Schedule = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/enrollment', icon: 'enrollment', label: 'Enrollment' },
    { path: '/schedule', icon: 'schedule', label: 'Schedule' },
    { path: '/modules', icon: 'modules', label: 'Modules' },
    { path: '/grades', icon: 'grades', label: 'Grades' }
  ];

  const scheduleData = [
    { time: '12:20 - 1:00', minutes: '40', subject: 'Science', teacher: 'Juan Miguel Santos' },
    { time: '1:00 - 1:40', minutes: '40', subject: 'Filipino', teacher: 'Maria Teresa Reyes' },
    { time: '1:40 - 2:20', minutes: '40', subject: 'GMRC', teacher: 'Carlos Antonio Cruz' },
    { time: '2:20 - 2:35', minutes: '15', subject: 'Recess', teacher: 'John Miguel Santos' },
    { time: '2:35 - 3:15', minutes: '40', subject: 'Mathematics', teacher: 'Liza Marie Fernandez' },
    { time: '3:15 - 3:55', minutes: '40', subject: 'Araling Panlipunan', teacher: 'Jose Luis Garcia' }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar
        isMenuOpen={isMenuOpen}
        handleNavigation={handleNavigation}
        navItems={navItems}
        toggleMenu={toggleMenu}
      />

      <div className="main-content">
        <Header toggleMenu={toggleMenu} />

        <div className="content-area">
          <div className="schedule-container">
            <div className="schedule-header">
              <div className="schedule-title">CLASS SCHEDULE</div>
              <div className="schedule-grade">GRADE V MOLAVE</div>
              <div className="schedule-year">S.Y. 2025-2026</div>
            </div>

            <div className="schedule-table">
              <table>
                <thead>
                  <tr>
                    <th>TIME</th>
                    <th>MINUTES</th>
                    <th>SUBJECT</th>
                    <th>TEACHER</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.time}</td>
                      <td>{row.minutes}</td>
                      <td>{row.subject}</td>
                      <td>{row.teacher}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;