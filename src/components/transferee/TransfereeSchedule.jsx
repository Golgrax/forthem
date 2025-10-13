import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransfereeSidebar from './TransfereeSidebar';
import Header from '../Header';
import '../../style/transferee.css';

const TransfereeSchedule = () => {
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
    { path: '/transferee/new-enrollee', icon: 'dashboard', label: 'New Enrollee/s' },
    { path: '/transferee/requests', icon: 'masterlist', label: 'Requests' },
    { path: '/transferee/schedule', icon: 'schedule', label: 'Schedule' },
  ];

  const scheduleData = [
    { time: '7:30 - 8:00', monday: 'Flag Ceremony', tuesday: 'Flag Ceremony', wednesday: 'Flag Ceremony', thursday: 'Flag Ceremony', friday: 'Flag Ceremony' },
    { time: '8:00 - 9:00', monday: 'Mathematics', tuesday: 'Science', wednesday: 'Filipino', thursday: 'Mathematics', friday: 'English' },
    { time: '9:00 - 10:00', monday: 'Science', tuesday: 'Mathematics', wednesday: 'English', thursday: 'Science', friday: 'Filipino' },
    { time: '10:00 - 10:30', monday: 'Break', tuesday: 'Break', wednesday: 'Break', thursday: 'Break', friday: 'Break' },
    { time: '10:30 - 11:30', monday: 'English', tuesday: 'Filipino', wednesday: 'Mathematics', thursday: 'English', friday: 'Science' },
    { time: '11:30 - 12:30', monday: 'Lunch Break', tuesday: 'Lunch Break', wednesday: 'Lunch Break', thursday: 'Lunch Break', friday: 'Lunch Break' },
    { time: '12:30 - 1:30', monday: 'MAPEH', tuesday: 'Araling Panlipunan', wednesday: 'EPP', thursday: 'GMRC', friday: 'MAPEH' },
    { time: '1:30 - 2:30', monday: 'EPP', tuesday: 'GMRC', wednesday: 'MAPEH', thursday: 'Araling Panlipunan', friday: 'EPP' }
  ];

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
          <div className="schedule-content">
            <h1 className="welcome-title">Class Schedule</h1>

            <div className="schedule-table-wrapper">
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.time}</td>
                      <td>{row.monday}</td>
                      <td>{row.tuesday}</td>
                      <td>{row.wednesday}</td>
                      <td>{row.thursday}</td>
                      <td>{row.friday}</td>
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

export default TransfereeSchedule;