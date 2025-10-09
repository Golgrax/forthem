import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../faculty.css';

const FacultySchedule = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/faculty/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/faculty/masterlist', icon: 'masterlist', label: 'Masterlist' },
    { path: '/faculty/schedule', icon: 'schedule', label: 'Schedule' },
    { path: '/faculty/student-id', icon: 'student-id', label: 'Student ID' },
    { path: '/faculty/grades', icon: 'grades', label: 'Grades' }
  ];

  const DashboardIcon = () => (
    <svg className="nav-icon" width="26" height="27" viewBox="0 0 26 27" fill="none">
      <path d="M14.4444 7.72222V1.94444C14.4444 1.53518 14.5831 1.19237 14.8604 0.916C15.1378 0.63963 15.4806 0.500963 15.8889 0.5H24.5556C24.9648 0.5 25.3081 0.638667 25.5854 0.916C25.8628 1.19333 26.001 1.53615 26 1.94444V7.72222C26 8.13148 25.8613 8.47478 25.584 8.75211C25.3067 9.02944 24.9638 9.16763 24.5556 9.16667H15.8889C15.4796 9.16667 15.1368 9.028 14.8604 8.75066C14.5841 8.47333 14.4454 8.13052 14.4444 7.72222Z" fill="currentColor"/>
    </svg>
  );

  const MasterlistIcon = () => (
    <svg className="nav-icon" width="29" height="32" viewBox="0 0 29 32" fill="none">
      <path d="M24.9834 16.6504C24.8585 16.6507 24.7389 16.6686 24.624 16.7041C24.5473 16.7278 24.4756 16.7668 24.4092 16.8242L24.3398 16.8936L14.123 27.1875C14.0053 27.3062 13.9207 27.4556 13.8799 27.6182C13.7091 28.2993 14.3259 28.9203 15.0029 28.749C15.1656 28.7079 15.3143 28.623 15.4326 28.5039L25.6484 18.2256C25.831 18.0422 25.9219 17.8232 25.9219 17.5596C25.9219 17.2821 25.8342 17.0708 25.667 16.9111C25.4973 16.7492 25.2734 16.6598 24.9834 16.6504Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3"/>
    </svg>
  );

  const ScheduleIcon = () => (
    <svg className="nav-icon" width="27" height="30" viewBox="0 0 27 30" fill="none">
      <path d="M13.5 18C13.767 18 14.028 17.912 14.25 17.7472C14.472 17.5824 14.6451 17.3481 14.7472 17.074C14.8494 16.7999 14.8762 16.4983 14.8241 16.2074C14.772 15.9164 14.6434 15.6491 14.4546 15.4393C14.2658 15.2296 14.0252 15.0867 13.7634 15.0288C13.5015 14.9709 13.2301 15.0006 12.9834 15.1142C12.7367 15.2277 12.5259 15.42 12.3775 15.6666C12.2292 15.9133 12.15 16.2033 12.15 16.5C12.15 16.8978 12.2922 17.2794 12.5454 17.5607C12.7986 17.842 13.142 18 13.5 18Z" fill="currentColor"/>
    </svg>
  );

  const StudentIdIcon = () => (
    <svg className="nav-icon modules-icon" width="35" height="40" viewBox="0 0 35 40" fill="none">
      <path transform="translate(-5, 0)" d="M24.2614 10C24.96 10.0002 25.6363 10.2461 26.1717 10.6948L26.3651 10.8718L32.932 17.4387C33.4259 17.9326 33.7303 18.5847 33.7919 19.2805L33.8038 19.5423V36.7793C33.804 37.5299 33.5205 38.253 33.0101 38.8034C32.4997 39.3538 31.8 39.691 31.0515 39.7473L30.8283 39.7547H12.9755C12.2248 39.755 11.5018 39.4715 10.9513 38.961C10.4009 38.4506 10.0637 37.751 10.0074 37.0024L10 36.7793V12.9755C9.99976 12.2248 10.2833 11.5018 10.7937 10.9513C11.3041 10.4009 12.0038 10.0637 12.7523 10.0074L12.9755 10H24.2614Z" fill="currentColor"/>
    </svg>
  );

  const GradesIcon = () => (
    <svg className="nav-icon" width="30" height="34" viewBox="0 0 30 34" fill="none">
      <path d="M1 15.4C1 9.4 1 6.4 2.48556 4.2976C2.96476 3.61868 3.54481 3.02151 4.20444 2.528C6.25 1 9.16822 1 15 1C20.8318 1 23.75 1 25.794 2.528C26.4542 3.02138 27.0348 3.61855 27.5144 4.2976C29 6.4 29 9.4016 29 15.4V18.6C29 24.6 29 27.6 27.5144 29.7024C27.0348 30.3814 26.4542 30.9786 25.794 31.472C23.75 33 20.8318 33 15 33C9.16822 33 6.25 33 4.206 31.472C3.54581 30.9786 2.96523 30.3814 2.48556 29.7024C1 27.6 1 24.5984 1 18.6V15.4Z" stroke="currentColor" strokeWidth="2.25" fill="none"/>
    </svg>
  );

  const NotificationIcon = () => (
    <svg className="notification-icon" width="34" height="38" viewBox="0 0 34 38" fill="none">
      <path d="M13.2222 34.381H20.7778C20.7778 36.3714 19.0778 38 17 38C14.9222 38 13.2222 36.3714 13.2222 34.381ZM34 30.7619V32.5714H0V30.7619L3.77778 27.1429V16.2857C3.77778 10.6762 7.55556 5.79048 13.2222 4.16191V3.61905C13.2222 1.62857 14.9222 0 17 0C19.0778 0 20.7778 1.62857 20.7778 3.61905V4.16191C26.4444 5.79048 30.2222 10.6762 30.2222 16.2857V27.1429L34 30.7619Z" fill="currentColor"/>
    </svg>
  );

  const getNavIcon = (iconType) => {
    switch(iconType) {
      case 'dashboard': return <DashboardIcon />;
      case 'masterlist': return <MasterlistIcon />;
      case 'schedule': return <ScheduleIcon />;
      case 'student-id': return <StudentIdIcon />;
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
            src="https://raw.githubusercontent.com/Golgrax/forthem-assets/refs/heads/main/students/logo/image.png?width=174" 
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
              onClick={() => navigate(item.path)}
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
            src="https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/me.png?raw=true?width=174" 
            alt="User Avatar" 
            className="user-avatar"
          />
        </div>

        {/* Content Area */}
        <div className="content-area">
          <div className="schedule-wrapper">
            <div className="schedule-table">
              <div className="schedule-header">
                <div className="time-header">TIME<br/>ALLOTMENT</div>
                <div className="day-header">MONDAY</div>
                <div className="day-header">TUESDAY</div>
                <div className="day-header">WEDNESDAY</div>
                <div className="day-header">THURSDAY</div>
                <div className="day-header">FRIDAY</div>
              </div>
              
              <div className="schedule-body">
                <div className="schedule-row">
                  <div className="time-cell">8:00 - 9:00</div>
                  <div className="subject-cell">MATH</div>
                  <div className="subject-cell">SCIENCE</div>
                  <div className="subject-cell">FILIPINO</div>
                  <div className="subject-cell">ENGLISH</div>
                  <div className="subject-cell">MAPEH</div>
                </div>
                <div className="schedule-row">
                  <div className="time-cell">9:00 - 10:00</div>
                  <div className="subject-cell">SCIENCE</div>
                  <div className="subject-cell">MATH</div>
                  <div className="subject-cell">ENGLISH</div>
                  <div className="subject-cell">FILIPINO</div>
                  <div className="subject-cell">AP</div>
                </div>
                <div className="schedule-row break-row">
                  <div className="time-cell">10:00 - 10:15</div>
                  <div className="subject-cell break-cell" colSpan={5}>BREAK</div>
                </div>
                <div className="schedule-row">
                  <div className="time-cell">10:15 - 11:15</div>
                  <div className="subject-cell">ENGLISH</div>
                  <div className="subject-cell">FILIPINO</div>
                  <div className="subject-cell">MATH</div>
                  <div className="subject-cell">SCIENCE</div>
                  <div className="subject-cell">GMRC</div>
                </div>
                <div className="schedule-row">
                  <div className="time-cell">11:15 - 12:00</div>
                  <div className="subject-cell">FILIPINO</div>
                  <div className="subject-cell">ENGLISH</div>
                  <div className="subject-cell">AP</div>
                  <div className="subject-cell">GMRC</div>
                  <div className="subject-cell">EPP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultySchedule;
