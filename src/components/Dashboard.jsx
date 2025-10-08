import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
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

  const DashboardIcon = () => (
    <svg className="nav-icon" width="26" height="27" viewBox="0 0 26 27" fill="none">
      <path d="M14.4444 7.72222V1.94444C14.4444 1.53518 14.5831 1.19237 14.8604 0.916C15.1378 0.63963 15.4806 0.500963 15.8889 0.5H24.5556C24.9648 0.5 25.3081 0.638667 25.5854 0.916C25.8628 1.19333 26.001 1.53615 26 1.94444V7.72222C26 8.13148 25.8613 8.47478 25.584 8.75211C25.3067 9.02944 24.9638 9.16763 24.5556 9.16667H15.8889C15.4796 9.16667 15.1368 9.028 14.8604 8.75066C14.5841 8.47333 14.4454 8.13052 14.4444 7.72222ZM0 13.5V1.94444C0 1.53518 0.138667 1.19237 0.416 0.916C0.693333 0.63963 1.03615 0.500963 1.44444 0.5H10.1111C10.5204 0.5 10.8637 0.638667 11.141 0.916C11.4183 1.19333 11.5565 1.53615 11.5556 1.94444V13.5C11.5556 13.9093 11.4169 14.2526 11.1396 14.5299C10.8622 14.8072 10.5194 14.9454 10.1111 14.9444H1.44444C1.03518 14.9444 0.69237 14.8058 0.416 14.5284C0.13963 14.2511 0.000962963 13.9083 0 13.5ZM14.4444 25.0556V13.5C14.4444 13.0907 14.5831 12.7479 14.8604 12.4716C15.1378 12.1952 15.4806 12.0565 15.8889 12.0556H24.5556C24.9648 12.0556 25.3081 12.1942 25.5854 12.4716C25.8628 12.7489 26.001 13.0917 26 13.5V25.0556C26 25.4648 25.8613 25.8081 25.584 26.0854C25.3067 26.3628 24.9638 26.501 24.5556 26.5H15.8889C15.4796 26.5 15.1368 26.3613 14.8604 26.084C14.5841 25.8067 14.4454 25.4638 14.4444 25.0556ZM0 25.0556V19.2778C0 18.8685 0.138667 18.5257 0.416 18.2493C0.693333 17.973 1.03615 17.8343 1.44444 17.8333H10.1111C10.5204 17.8333 10.8637 17.972 11.141 18.2493C11.4183 18.5267 11.5565 18.8695 11.5556 19.2778V25.0556C11.5556 25.4648 11.4169 25.8081 11.1396 26.0854C10.8622 26.3628 10.5194 26.501 10.1111 26.5H1.44444C1.03518 26.5 0.69237 26.3613 0.416 26.084C0.13963 25.8067 0.000962963 25.4638 0 25.0556ZM2.88889 12.0556H8.66667V3.38889H2.88889V12.0556ZM17.3333 23.6111H23.1111V14.9444H17.3333V23.6111ZM17.3333 6.27778H23.1111V3.38889H17.3333V6.27778ZM2.88889 23.6111H8.66667V20.7222H2.88889V23.6111Z" fill="currentColor"/>
    </svg>
  );

  const EnrollmentIcon = () => (
    <svg className="nav-icon" width="27" height="31" viewBox="0 0 27 31" fill="none">
      <path d="M23.9866 13.5625C24.4085 13.5625 24.8002 13.6382 25.1618 13.7896C25.5234 13.9409 25.8449 14.1528 26.1261 14.4253C26.4074 14.6978 26.6183 15.0156 26.7589 15.3789C26.8996 15.7422 26.9799 16.1357 27 16.5596C27 16.9531 26.9247 17.3366 26.774 17.71C26.6233 18.0833 26.4074 18.4113 26.1261 18.6938L15.7158 29.1815C15.4589 29.4403 15.1361 29.624 14.7824 29.7126L12.8717 30.1912C11.4082 30.5578 10.0812 29.2337 10.4447 27.7694L10.926 25.8298C11.0132 25.4788 11.1938 25.158 11.4487 24.9016L21.8622 14.4253C22.1434 14.1427 22.4699 13.9308 22.8415 13.7896C23.2132 13.6483 23.5949 13.5726 23.9866 13.5625Z" fill="currentColor"/>
    </svg>
  );

  const ScheduleIcon = () => (
    <svg className="nav-icon" width="27" height="30" viewBox="0 0 27 30" fill="none">
      <path d="M22.95 3H21.6V1.5C21.6 0.6 21.06 0 20.25 0C19.44 0 18.9 0.6 18.9 1.5V3H8.1V1.5C8.1 0.6 7.56 0 6.75 0C5.94 0 5.4 0.6 5.4 1.5V3H4.05C1.755 3 0 4.95 0 7.5V9H27V7.5C27 4.95 25.245 3 22.95 3ZM0 25.5C0 28.05 1.755 30 4.05 30H22.95C25.245 30 27 28.05 27 25.5V12H0V25.5Z" fill="currentColor"/>
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
      <path d="M28.6662 27.6001L27.3331 24.4001M27.3331 24.4001L24.9205 18.6113C24.7665 18.2401 24.404 18.0001 23.9996 18.0001C23.8045 17.9978 23.6131 18.0545 23.4491 18.1632C23.2851 18.2718 23.1557 18.4276 23.0771 18.6113L20.666 24.4001M27.3331 24.4001H20.666M19.3329 27.6001L20.666 24.4001M17.7773 34.0001H30.2218" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
          <div className="sidebar-text">
            <div className="sidebar-school-name">STO. NIÑO ELEMENTARY SCHOOL</div>
            <div className="sidebar-system-name">Student Access System</div>
          </div>
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
          <div className="dashboard-content-wrapper">
            {/* Welcome Section */}
            <div className="welcome-section">
              <div className="welcome-text">Welcome, Jay Andrei!</div>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/852d60b5c461d70312209362efee8c9bd1c6ef21?width=602" 
                alt="Welcome"
                className="welcome-image"
              />
            </div>

            {/* Announcements Section */}
            <div className="announcements-section">
              <div className="announcements-title">CLASS ANNOUNCEMENTS</div>
              <div className="announcement-card">
                <div className="announcement-header">
                  <div className="announcement-teacher-info">
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/da0788b141d9b4ce3fd3f0168d4b8fb31fb0dcbc?width=174" 
                      alt="Teacher Avatar"
                      className="teacher-avatar"
                    />
                    <div className="teacher-name">Teacher Ann</div>
                  </div>
                  <div className="announcement-date">Feb 11 2025</div>
                </div>
                <div className="announcement-text">
                  Hello, V-Molave!
                  Please do your Module 5 for this week's activity.

                  Thank you!
                </div>
              </div>
            </div>

            {/* Reminder Section */}
            <div className="reminder-section">
              <div className="reminder-title">REMINDER</div>
              
              {/* Science Reminder */}
              <div className="subject-reminder">
                <div className="subject-name">SCIENCE</div>
                <div className="assignments-list">
                  <div className="assignment-item">
                    <div className="assignment-circle"></div>
                    <div className="assignment-details">
                      <div className="assignment-name">Assignment #1</div>
                      <div className="assignment-date">Sept 23 2025</div>
                    </div>
                  </div>
                  <div className="assignment-item">
                    <div className="assignment-circle"></div>
                    <div className="assignment-details">
                      <div className="assignment-name">Assignment #2</div>
                      <div className="assignment-date">Sept 24 2025</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MAPEH Reminder */}
              <div className="subject-reminder">
                <div className="subject-name">MAPEH</div>
                <div className="assignments-list">
                  <div className="assignment-item">
                    <div className="assignment-circle"></div>
                    <div className="assignment-details">
                      <div className="assignment-name">Assignment #1</div>
                      <div className="assignment-date">Sept 24 2025</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GMRC Reminder */}
              <div className="subject-reminder">
                <div className="subject-name">GMRC</div>
                <div className="assignments-list">
                  <div className="assignment-item">
                    <div className="assignment-circle"></div>
                    <div className="assignment-details">
                      <div className="assignment-name">Assignment #1</div>
                      <div className="assignment-date">Sept 24 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
