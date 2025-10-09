import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

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
      <path d="M14.4444 7.72222V1.94444C14.4444 1.53518 14.5831 1.19237 14.8604 0.916C15.1378 0.63963 15.4806 0.500963 15.8889 0.5H24.5556C24.9648 0.5 25.3081 0.638667 25.5854 0.916C25.8628 1.19333 26.001 1.53615 26 1.94444V7.72222C26 8.13148 25.8613 8.47478 25.584 8.75211C25.3067 9.02944 24.9638 9.16763 24.5556 9.16667H15.8889C15.4796 9.16667 15.1368 9.028 14.8604 8.75066C14.5841 8.47333 14.4454 8.13052 14.4444 7.72222ZM0 13.5V1.94444C0 1.53518 0.138667 1.19237 0.416 0.916C0.693333 0.63963 1.03615 0.500963 1.44444 0.5H10.1111C10.5204 0.5 10.8637 0.638667 11.141 0.916C11.4183 1.19333 11.5565 1.53615 11.5556 1.94444V13.5C11.5556 13.9093 11.4169 14.2526 11.1396 14.5299C10.8622 14.8072 10.5194 14.9454 10.1111 14.9444H1.44444C1.03518 14.9444 0.69237 14.8058 0.416 14.5284C0.13963 14.2511 0.000962963 13.9083 0 13.5ZM14.4444 25.0556V13.5C14.4444 13.0907 14.5831 12.7479 14.8604 12.4716C15.1378 12.1952 15.4806 12.0565 15.8889 12.0556H24.5556C24.9648 12.0556 25.3081 12.1942 25.5854 12.4716C25.8628 12.7489 26.001 13.0917 26 13.5V25.0556C26 25.4648 25.8613 25.8081 25.584 26.0854C25.3067 26.3628 24.9638 26.501 24.5556 26.5H15.8889C15.4796 26.5 15.1368 26.3613 14.8604 26.084C14.5841 25.8067 14.4454 25.4638 14.4444 25.0556ZM0 25.0556V19.2778C0 18.8685 0.138667 18.5257 0.416 18.2493C0.693333 17.973 1.03615 17.8343 1.44444 17.8333H10.1111C10.5204 17.8333 10.8637 17.972 11.141 18.2493C11.4183 18.5267 11.5565 18.8695 11.5556 19.2778V25.0556C11.5556 25.4648 11.4169 25.8081 11.1396 26.0854C10.8622 26.3628 10.5194 26.501 10.1111 26.5H1.44444C1.03518 26.5 0.69237 26.3613 0.416 26.084C0.13963 25.8067 0.000962963 25.4638 0 25.0556Z" fill="currentColor"/>
    </svg>
  );

  const MasterlistIcon = () => (
    <svg className="nav-icon" width="29" height="32" viewBox="0 0 29 32" fill="none">
      <path d="M24.9834 16.6504C24.8585 16.6507 24.7389 16.6686 24.624 16.7041C24.5473 16.7278 24.4756 16.7668 24.4092 16.8242L24.3398 16.8936L14.123 27.1875C14.0053 27.3062 13.9207 27.4556 13.8799 27.6182C13.7091 28.2993 14.3259 28.9203 15.0029 28.749C15.1656 28.7079 15.3143 28.623 15.4326 28.5039L25.6484 18.2256C25.831 18.0422 25.9219 17.8232 25.9219 17.5596C25.9219 17.2821 25.8342 17.0708 25.667 16.9111C25.4973 16.7492 25.2734 16.6598 24.9834 16.6504ZM22.1426 0.849609C23.33 0.849609 24.293 1.81259 24.293 3V11.5586C24.2928 12.0309 23.9518 12.4115 23.5156 12.5332C23.1783 12.6272 22.8196 12.5614 22.5439 12.3857C22.2669 12.2091 22.0645 11.9141 22.0645 11.5488V4.9375C22.0645 3.91577 21.2356 3.08789 20.2139 3.08789H4.92871C3.90698 3.08789 3.07812 3.91577 3.07812 4.9375V24.1875C3.07812 25.2092 3.90698 26.0371 4.92871 26.0371H8.36426C9.09139 26.0374 9.62482 26.7211 9.44922 27.4268C9.32504 27.925 8.87777 28.2752 8.36426 28.2754H3C1.81259 28.2754 0.849609 27.3124 0.849609 26.125V3C0.84961 1.81259 1.81259 0.849609 3 0.849609H22.1426Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3"/>
    </svg>
  );

  const ScheduleIcon = () => (
    <svg className="nav-icon" width="27" height="30" viewBox="0 0 27 30" fill="none">
      <path d="M13.5 18C13.767 18 14.028 17.912 14.25 17.7472C14.472 17.5824 14.6451 17.3481 14.7472 17.074C14.8494 16.7999 14.8762 16.4983 14.8241 16.2074C14.772 15.9164 14.6434 15.6491 14.4546 15.4393C14.2658 15.2296 14.0252 15.0867 13.7634 15.0288C13.5015 14.9709 13.2301 15.0006 12.9834 15.1142C12.7367 15.2277 12.5259 15.42 12.3775 15.6666C12.2292 15.9133 12.15 16.2033 12.15 16.5C12.15 16.8978 12.2922 17.2794 12.5454 17.5607C12.7986 17.842 13.142 18 13.5 18ZM22.95 3H21.6V1.5C21.6 1.10218 21.4578 0.720644 21.2046 0.43934C20.9514 0.158035 20.608 0 20.25 0C19.892 0 19.5486 0.158035 19.2954 0.43934C19.0422 0.720644 18.9 1.10218 18.9 1.5V3H8.1V1.5C8.1 1.10218 7.95777 0.720644 7.70459 0.43934C7.45142 0.158035 7.10804 0 6.75 0C6.39196 0 6.04858 0.158035 5.79541 0.43934C5.54223 0.720644 5.4 1.10218 5.4 1.5V3H4.05C2.97587 3 1.94574 3.47411 1.18622 4.31802C0.426695 5.16193 0 6.30653 0 7.5V25.5C0 26.6935 0.426695 27.8381 1.18622 28.682C1.94574 29.5259 2.97587 30 4.05 30H22.95C24.0241 30 25.0543 29.5259 25.8138 28.682C26.5733 27.8381 27 26.6935 27 25.5V7.5C27 6.30653 26.5733 5.16193 25.8138 4.31802C25.0543 3.47411 24.0241 3 22.95 3ZM24.3 25.5C24.3 25.8978 24.1578 26.2794 23.9046 26.5607C23.6514 26.842 23.308 27 22.95 27H4.05C3.69196 27 3.34858 26.842 3.09541 26.5607C2.84223 26.2794 2.7 25.8978 2.7 25.5V12H24.3V25.5Z" fill="currentColor"/>
    </svg>
  );

  const StudentIdIcon = () => (
    <svg className="nav-icon modules-icon" width="35" height="40" viewBox="0 0 35 40" fill="none">
      <path transform="translate(-5, 0)" d="M24.2614 10C24.96 10.0002 25.6363 10.2461 26.1717 10.6948L26.3651 10.8718L32.932 17.4387C33.4259 17.9326 33.7303 18.5847 33.7919 19.2805L33.8038 19.5423V36.7793C33.804 37.5299 33.5205 38.253 33.0101 38.8034C32.4997 39.3538 31.8 39.691 31.0515 39.7473L30.8283 39.7547H12.9755C12.2248 39.755 11.5018 39.4715 10.9513 38.961C10.4009 38.4506 10.0637 37.751 10.0074 37.0024L10 36.7793V12.9755C9.99976 12.2248 10.2833 11.5018 10.7937 10.9513C11.3041 10.4009 12.0038 10.0637 12.7523 10.0074L12.9755 10H24.2614ZM21.9019 12.9755H12.9755V36.7793H30.8283V21.9019H24.1335C23.5416 21.9019 22.974 21.6668 22.5555 21.2483C22.137 20.8298 21.9019 20.2622 21.9019 19.6703V12.9755Z" fill="currentColor"/>
    </svg>
  );

  const GradesIcon = () => (
    <svg className="nav-icon" width="30" height="34" viewBox="0 0 30 34" fill="none">
      <path d="M1 15.4C1 9.4 1 6.4 2.48556 4.2976C2.96476 3.61868 3.54481 3.02151 4.20444 2.528C6.25 1 9.16822 1 15 1C20.8318 1 23.75 1 25.794 2.528C26.4542 3.02138 27.0348 3.61855 27.5144 4.2976C29 6.4 29 9.4016 29 15.4V18.6C29 24.6 29 27.6 27.5144 29.7024C27.0348 30.3814 26.4542 30.9786 25.794 31.472C23.75 33 20.8318 33 15 33C9.16822 33 6.25 33 4.206 31.472C3.54581 30.9786 2.96523 30.3814 2.48556 29.7024C1 27.6 1 24.5984 1 18.6V15.4Z" stroke="currentColor" strokeWidth="2.25" fill="none"/>
      <path d="M19.6662 18.6001L18.3331 15.4001M18.3331 15.4001L15.9205 9.61127C15.7665 9.24007 15.404 9.00007 14.9996 9.00007C14.8045 8.99778 14.6131 9.05449 14.4491 9.16315C14.2851 9.27181 14.1557 9.42764 14.0771 9.61127L11.666 15.4001M18.3331 15.4001H11.666M10.3329 18.6001L11.666 15.4001M8.77734 25.0001H21.2218" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
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
            src="https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/me.png?raw=true?width=174" 
            alt="User Avatar" 
            className="user-avatar"
          />
        </div>

        {/* Content Area */}
        <div className="content-area">
          <div className="faculty-dashboard-wrapper">
            {/* Posted Announcements Section */}
            <div className="posted-section">
              <div className="section-header">
                <div className="section-title">POSTED ANNOUNCEMENTS</div>
                <button className="add-button" onClick={() => navigate('/faculty/create-announcement')}>+</button>
              </div>
              
              <div className="announcement-card faculty-card">
                <div className="announcement-header">
                  <div className="announcement-teacher-info">
                    <img 
                      src="https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/me.png?raw=true?width=174" 
                      alt="Faculty Avatar"
                      className="teacher-avatar"
                    />
                    <div className="teacher-name">You</div>
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

            {/* Posted Upcoming Reminders Section */}
            <div className="posted-section">
              <div className="section-header">
                <div className="section-title">POSTED UPCOMING REMINDERS</div>
                <button className="add-button" onClick={() => navigate('/faculty/create-reminder')}>+</button>
              </div>
              
              <div className="reminder-card faculty-card">
                <div className="reminder-header">
                  <div className="reminder-teacher-info">
                    <img 
                      src="https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/me.png?raw=true?width=174" 
                      alt="Faculty Avatar"
                      className="teacher-avatar"
                    />
                    <div className="teacher-name">You</div>
                    <div className="subject-tags">
                      <span className="subject-tag gmrc">GMRC</span>
                      <span className="subject-tag molave">V - Molave</span>
                      <button className="tag-add-btn">+</button>
                    </div>
                  </div>
                  <div className="reminder-date">DUE ON Sept 24 2025</div>
                </div>
                <div className="reminder-content">
                  <div className="reminder-title">Assignment #1</div>
                  <div className="reminder-text">Be creative and make a family tree in your household.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
