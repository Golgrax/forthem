import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Assignment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subject = location.state?.subject || 'SCIENCE';

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
    <svg className="nav-icon modules-icon" width="35" height="40" viewBox="0 0 35 40" fill="none">
      <path transform="translate(-5, 0)" d="M24.2614 10C24.96 10.0002 25.6363 10.2461 26.1717 10.6948L26.3651 10.8718L32.932 17.4387C33.4259 17.9326 33.7303 18.5847 33.7919 19.2805L33.8038 19.5423V36.7793C33.804 37.5299 33.5205 38.253 33.0101 38.8034C32.4997 39.3538 31.8 39.691 31.0515 39.7473L30.8283 39.7547H12.9755C12.2248 39.755 11.5018 39.4715 10.9513 38.961C10.4009 38.4506 10.0637 37.751 10.0074 37.0024L10 36.7793V12.9755C9.99976 12.2248 10.2833 11.5018 10.7937 10.9513C11.3041 10.4009 12.0038 10.0637 12.7523 10.0074L12.9755 10H24.2614ZM21.9019 12.9755H12.9755V36.7793H30.8283V21.9019H24.1335C23.5416 21.9019 22.974 21.6668 22.5555 21.2483C22.137 20.8298 21.9019 20.2622 21.9019 19.6703V12.9755ZM21.9019 23.3896C22.2965 23.3896 22.6749 23.5464 22.9539 23.8254C23.2329 24.1044 23.3896 24.4828 23.3896 24.8774V28.9062L24.0056 28.2902C24.2861 28.0192 24.662 27.8693 25.052 27.8727C25.4421 27.8761 25.8153 28.0325 26.0911 28.3084C26.3669 28.5842 26.5234 28.9573 26.5268 29.3474C26.5302 29.7375 26.3802 30.1133 26.1092 30.3939L22.9552 33.5509C22.817 33.6892 22.653 33.7989 22.4724 33.8738C22.2917 33.9487 22.0982 33.9872 21.9026 33.9872C21.7071 33.9872 21.5135 33.9487 21.3329 33.8738C21.1523 33.7989 20.9882 33.6892 20.8501 33.5509L17.6946 30.3939C17.5525 30.2567 17.4391 30.0925 17.3612 29.911C17.2832 29.7295 17.2422 29.5343 17.2404 29.3367C17.2387 29.1392 17.2764 28.9433 17.3512 28.7604C17.426 28.5776 17.5364 28.4115 17.6761 28.2718C17.8158 28.1321 17.9819 28.0216 18.1648 27.9468C18.3476 27.872 18.5435 27.8344 18.7411 27.8361C18.9386 27.8378 19.1338 27.8789 19.3153 27.9568C19.4968 28.0348 19.661 28.1481 19.7982 28.2902L20.4142 28.9062V24.8774C20.4142 24.4828 20.5709 24.1044 20.8499 23.8254C21.1289 23.5464 21.5073 23.3896 21.9019 23.3896ZM24.8774 13.5914V18.9264H30.2124L24.8774 13.5914Z" fill="currentColor"/>
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
            src="https://raw.githubusercontent.com/Golgrax/forthem-assets/refs/heads/main/students/logo/image.png?width=174" alt="School Logo"            className="sidebar-logo"
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '20px', fontWeight: '500', color: '#000' }}>{subject}</span>
            <span style={{ fontSize: '16px', fontWeight: '500', color: '#000' }}>Assignment</span>
            <span style={{ fontSize: '16px', fontWeight: '500', color: '#000' }}>Files</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <NotificationIcon />
            <img 
              src="https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/me.png?raw=true?width=174" 
              alt="User Avatar" 
              className="user-avatar"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          <div className="assignment-container">
            <div className="assignment-header">
              <div className="subject-title">{subject}</div>
            </div>
            
            <div className="assignment-card">
              <div className="assignment-title">Assignment 1 - Property of Matters</div>
              <div className="assignment-meta">
                <span>Due August 26, 2025</span>
                <span>11:59 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
