import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import TransfereeSidebar from './TransfereeSidebar';
import Header from '../Header';
import '../../style/transferee.css';


const TransfereeSchedule = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);

  // Load transferee CSS

  useEffect(() => {
    if (user && user.id) {
      const fetchSchedule = async () => {
        try {
          const response = await fetch(`/api/schedules/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setSchedule(data.schedules);
          } else {
            console.error('Failed to fetch schedule');
          }
        } catch (error) {
          console.error('Error fetching schedule:', error);
        }
      };

      fetchSchedule();
    }
  }, [user]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/transferee/new-enrollee', icon: 'dashboard', label: 'New Enrollee/s' },
    { path: '/transferee/requests', icon: 'masterlist', label: 'Requests' },
    { path: '/transferee/schedule', icon: 'schedule', label: 'Schedule' },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = schedule.reduce((acc, curr) => {
    if (!acc.includes(curr.time_start)) {
      acc.push(curr.time_start);
    }
    return acc;
  }, []).sort();

  return (
    <div className="dashboard-container transferee-container">
      <TransfereeSidebar
        isMenuOpen={isMenuOpen}
        handleNavigation={handleNavigation}
        navItems={navItems}
        toggleMenu={toggleMenu}
      />

      <div className="main-content">
        <Header toggleMenu={toggleMenu} />

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

export default TransfereeSchedule;