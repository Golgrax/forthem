import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import '../../style/student.css';

const Schedule = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load student CSS

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/schedule');
        if (response.ok) {
          const data = await response.json();
          setScheduleData(data.schedule);
        } else {
          setError('Failed to fetch schedule');
        }
      } catch (error) {
        setError('Error fetching schedule: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

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
                {loading ? (
                  <div>Loading schedule...</div>
                ) : error ? (
                  <div>{error}</div>
                ) : (
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
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;