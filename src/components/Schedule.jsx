import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Schedule = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
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

  const DashboardIcon = () => (
    <svg className="nav-icon" width="26" height="27" viewBox="0 0 26 27" fill="none">
      <path d="M14.4444 7.72222V1.94444C14.4444 1.53518 14.5831 1.19237 14.8604 0.916C15.1378 0.63963 15.4806 0.500963 15.8889 0.5H24.5556C24.9648 0.5 25.3081 0.638667 25.5854 0.916C25.8628 1.19333 26.001 1.53615 26 1.94444V7.72222C26 8.13148 25.8613 8.47478 25.584 8.75211C25.3067 9.02944 24.9638 9.16763 24.5556 9.16667H15.8889C15.4796 9.16667 15.1368 9.028 14.8604 8.75066C14.5841 8.47333 14.4454 8.13052 14.4444 7.72222Z" fill="currentColor"/>
    </svg>
  );

  const EnrollmentIcon = () => (
    <svg className="nav-icon" width="27" height="31" viewBox="0 0 27 31" fill="none">
      <path d="M23.9866 13.5625C24.4085 13.5625 24.8002 13.6382 25.1618 13.7896C25.5234 13.9409 25.8449 14.1528 26.1261 14.4253C26.4074 14.6978 26.6183 15.0156 26.7589 15.3789C26.8996 15.7422 26.9799 16.1357 27 16.5596C27 16.9531 26.9247 17.3366 26.774 17.71C26.6233 18.0833 26.4074 18.4113 26.1261 18.6938L15.7158 29.1815C15.4589 29.4403 15.1361 29.624 14.7824 29.7126L12.8717 30.1912C11.4082 30.5578 10.0812 29.2337 10.4447 27.7694L10.926 25.8298C11.0132 25.4788 11.1938 25.158 11.4487 24.9016L21.8622 14.4253C22.1434 14.1427 22.4699 13.9308 22.8415 13.7896C23.2132 13.6483 23.5949 13.5726 23.9866 13.5625Z" fill="currentColor"/>
    </svg>
  );

  const ScheduleIcon = () => (
    <svg className="nav-icon" width="27" height="30" viewBox="0 0 27 30" fill="none">
      <path d="M22.95 3H21.6V1.5C21.6 0.6 21.06 0 20.25 0C19.44 0 18.9 0.6 18.9 1.5V3H8.1V1.5C8.1 0.6 7.56 0 6.75 0C5.94 0 5.4 0.6 5.4 1.5V3H4.05C1.755 3 0 4.95 0 7.5V9H27V7.5C27 4.95 25.245 3 22.95 3Z" fill="currentColor"/>
    </svg>
  );

  const ModulesIcon = () => (
    <svg className="nav-icon" width="35" height="40" viewBox="0 0 35 40" fill="none">
      <path d="M22.5 10V20.1562C22.5 20.7779 22.7469 21.374 23.1865 21.8135C23.626 22.2531 24.2221 22.5 24.8438 22.5H35V38.125C35 38.9538 34.6708 39.7487 34.0847 40.3347C33.4987 40.9208 32.7038 41.25 31.875 41.25H13.125C12.2962 41.25 11.5013 40.9208 10.9153 40.3347C10.3292 39.7487 10 38.9538 10 38.125V13.125C10 12.2962 10.3292 11.5013 10.9153 10.9153C11.5013 10.3292 12.2962 10 13.125 10H22.5Z" fill="currentColor"/>
    </svg>
  );

  const GradesIcon = () => (
    <svg className="nav-icon" width="38" height="42" viewBox="0 0 38 42" fill="none">
      <path d="M10 24.4C10 18.4 10 15.4 11.4856 13.2976C11.9648 12.6187 12.5448 12.0215 13.2044 11.528C15.25 10 18.1682 10 24 10C29.8318 10 32.75 10 34.794 11.528C35.4542 12.0214 36.0348 12.6186 36.5144 13.2976C38 15.4 38 18.4016 38 24.4V27.6C38 33.6 38 36.6 36.5144 38.7024C36.0348 39.3814 35.4542 39.9786 34.794 40.472C32.75 42 29.8318 42 24 42C18.1682 42 15.25 42 13.206 40.472C12.5458 39.9786 11.9652 39.3814 11.4856 38.7024C10 36.6 10 33.5984 10 27.6V24.4Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );

  const NotificationIcon = () => (
    <svg className="notification-icon" width="34" height="38" viewBox="0 0 34 38" fill="none">
      <path d="M13.2222 34.381H20.7778C20.7778 36.3714 19.0778 38 17 38C14.9222 38 13.2222 36.3714 13.2222 34.381ZM34 30.7619V32.5714H0V30.7619L3.77778 27.1429V16.2857C3.77778 10.6762 7.55556 5.79048 13.2222 4.16191V3.61905C13.2222 1.62857 14.9222 0 17 0C19.0778 0 20.7778 1.62857 20.7778 3.61905V4.16191C26.4444 5.79048 30.2222 10.6762 30.2222 16.2857V27.1429L34 30.7619ZM26.4444 16.2857C26.4444 11.219 22.2889 7.2381 17 7.2381C11.7111 7.2381 7.55556 11.219 7.55556 16.2857V28.9524H26.4444V16.2857Z" fill="currentColor"/>
    </svg>
  );

  const getNavIcon = (iconType) => {
    switch(iconType) {
      case 'dashboard': return <DashboardIcon />;
      case 'enrollment': return <EnrollmentIcon />;
      case 'schedule': return <ScheduleIcon />;
      case 'modules': return <ModulesIcon />;
      case 'grades': return <GradesIcon />;
      default: return <DashboardIcon />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/da0788b141d9b4ce3fd3f0168d4b8fb31fb0dcbc?width=174" 
            alt="School Logo" 
            className="sidebar-logo"
          />
          <div className="sidebar-school-name">STO. NIÑO ELEMENTARY SCHOOL</div>
          <div className="sidebar-system-name">Student Access System</div>
        </div>
        
        <nav className="nav-menu">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              {getNavIcon(item.icon)}
              <span className="nav-text">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <NotificationIcon />
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/da0788b141d9b4ce3fd3f0168d4b8fb31fb0dcbc?width=174" 
            alt="User Avatar" 
            className="user-avatar"
          />
        </div>

        {/* Content Area */}
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
