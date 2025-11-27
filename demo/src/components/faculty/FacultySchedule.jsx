import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import FacultySidebar from './FacultySidebar';
import FacultyHeader from './FacultyHeader';


const FacultySchedule = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load faculty CSS

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const { mockGetSchedule } = await import('../../services/mockData');
        const data = await mockGetSchedule();
        setSchedule(data.schedule);
      } catch (error) {
        console.error('Error fetching schedule:', error);
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
    { path: '/faculty/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/faculty/masterlist', icon: 'masterlist', label: 'Masterlist' },
    { path: '/faculty/schedule', icon: 'schedule', label: 'Schedule' },
    { path: '/faculty/grades', icon: 'grades', label: 'Grades' },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = schedule.reduce((acc, curr) => {
    if (!acc.includes(curr.time_start)) {
      acc.push(curr.time_start);
    }
    return acc;
  }, []).sort();

  return (
    <div className="dashboard-container faculty-dashboard faculty-container">
      <FacultySidebar
        isMenuOpen={isMenuOpen}
        handleNavigation={handleNavigation}
        navItems={navItems}
        toggleMenu={toggleMenu}
      />

      <div className="main-content">
        <FacultyHeader toggleMenu={toggleMenu} />

        <div className="content-area">
          <div className="schedule-wrapper">
            <div className="schedule-table">
              <div className="schedule-header">
                <div className="time-header">TIME</div>
                {days.map(day => <div key={day} className="day-header">{day.toUpperCase()}</div>)}
              </div>
              <div className="schedule-body">
                {times.map(time => (
                  <div key={time} className="schedule-row">
                    <div className="time-cell">{time}</div>
                    {days.map(day => {
                      const entry = schedule.find(s => s.day === day && s.time_start === time);
                      return <div key={day} className="subject-cell">{entry ? entry.subject : ''}</div>;
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultySchedule;