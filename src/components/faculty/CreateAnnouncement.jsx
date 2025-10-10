import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../faculty.css';

const CreateAnnouncement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    class: 'V - Molave',
    subject: 'GMRC',
    title: '',
    body: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveDraft = () => {
    console.log('Draft saved:', formData);
  };

  const handlePost = () => {
    if (formData.title && formData.body) {
      console.log('Posted:', formData);
      navigate('/faculty/dashboard');
    }
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
      <path d="M14.4444 7.72222V1.94444C14.4444 1.53518 14.5831 1.19237 14.8604 0.916C15.1378 0.63963 15.4806 0.500963 15.8889 0.5H24.5556C24.9648 0.5 25.3081 0.638667 25.5854 0.916C25.8628 1.19333 26.001 1.53615 26 1.94444V7.72222C26 8.13148 25.8613 8.47478 25.584 8.75211C25.3067 9.02944 24.9638 9.16763 24.5556 9.16667H15.8889C15.4796 9.16667 15.1368 9.028 14.8604 8.75066C14.5841 8.47333 14.4454 8.13052 14.4444 7.72222ZM0 13.5V1.94444C0 1.53518 0.138667 1.19237 0.416 0.916C0.693333 0.63963 1.03615 0.500963 1.44444 0.5H10.1111C10.5204 0.5 10.8637 0.638667 11.141 0.916C11.4183 1.19333 11.5565 1.53615 11.5556 1.94444V13.5C11.5556 13.9093 11.4169 14.2526 11.1396 14.5299C10.8622 14.8072 10.5194 14.9454 10.1111 14.9444H1.44444C1.03518 14.9444 0.69237 14.8058 0.416 14.5284C0.13963 14.2511 0.000962963 13.9083 0 13.5Z" fill="currentColor"/>
    </svg>
  );

  const MasterlistIcon = () => (
    <svg className="nav-icon" width="29" height="32" viewBox="0 0 29 32" fill="none">
      <path d="M24.9834 16.6504C24.8585 16.6507 24.7389 16.6686 24.624 16.7041C24.5473 16.7278 24.4756 16.7668 24.4092 16.8242L24.3398 16.8936L14.123 27.1875C14.0053 27.3062 13.9207 27.4556 13.8799 27.6182C13.7091 28.2993 14.3259 28.9203 15.0029 28.749C15.1656 28.7079 15.3143 28.623 15.4326 28.5039L25.6484 18.2256C25.831 18.0422 25.9219 17.8232 25.9219 17.5596C25.9219 17.2821 25.8342 17.0708 25.667 16.9111C25.4973 16.7492 25.2734 16.6598 24.9834 16.6504ZM22.1426 0.849609C23.33 0.849609 24.293 1.81259 24.293 3V11.5586C24.2928 12.0309 23.9518 12.4115 23.5156 12.5332C23.1783 12.6272 22.8196 12.5614 22.5439 12.3857C22.2669 12.2091 22.0645 11.9141 22.0645 11.5488V4.9375C22.0645 3.91577 21.2356 3.08789 20.2139 3.08789H4.92871C3.90698 3.08789 3.07812 3.91577 3.07812 4.9375V24.1875C3.07812 25.2092 3.90698 26.0371 4.92871 26.0371H8.36426C9.09139 26.0374 9.62482 26.7211 9.44922 27.4268C9.32504 27.925 8.87777 28.2752 8.36426 28.2754H3C1.81259 28.2754 0.849609 27.3124 0.849609 26.125V3C0.84961 1.81259 1.81259 0.849609 3 0.849609H22.1426ZM5.82129 18.2871C6.43759 18.2871 6.93555 18.7918 6.93555 19.4062C6.93555 20.0207 6.43759 20.5254 5.82129 20.5254C5.20505 20.5253 4.70703 20.0207 4.70703 19.4062C4.70703 18.7918 5.20505 18.2872 5.82129 18.2871ZM14.1279 18.2871C15.123 18.2874 15.6226 19.4898 14.9209 20.1953C14.711 20.4061 14.4254 20.5253 14.1279 20.5254H9.68262C9.06494 20.5252 8.56445 20.024 8.56445 19.4062C8.56445 18.7885 9.06494 18.2873 9.68262 18.2871H14.1279ZM5.82129 12.4746C6.43759 12.4746 6.93555 12.9793 6.93555 13.5938C6.93555 14.2082 6.43759 14.7129 5.82129 14.7129C5.20505 14.7128 4.70703 14.2082 4.70703 13.5938C4.70703 12.9793 5.20505 12.4747 5.82129 12.4746ZM19.3174 12.4746C19.9351 12.4748 20.4355 12.976 20.4355 13.5938C20.4355 14.2115 19.9351 14.7127 19.3174 14.7129H9.68262C9.06494 14.7127 8.56445 14.2115 8.56445 13.5938C8.56445 12.976 9.06494 12.4748 9.68262 12.4746H19.3174ZM5.82129 6.66211C6.43759 6.66211 6.93555 7.16675 6.93555 7.78125C6.93555 8.39575 6.43759 8.90039 5.82129 8.90039C5.20505 8.90031 4.70703 8.3957 4.70703 7.78125C4.70703 7.1668 5.20505 6.66219 5.82129 6.66211ZM19.3174 6.66211C19.9351 6.66233 20.4355 7.16352 20.4355 7.78125C20.4355 8.39898 19.9351 8.90017 19.3174 8.90039H9.68262C9.06494 8.90017 8.56445 8.39898 8.56445 7.78125C8.56445 7.16352 9.06494 6.66234 9.68262 6.66211H19.3174ZM28.1504 17.5596C28.1504 17.9727 28.0707 18.375 27.9131 18.7656C27.755 19.1574 27.528 19.5029 27.2324 19.7998L16.8223 30.2871C16.5461 30.5653 16.1987 30.7631 15.8184 30.8584L13.9082 31.3369C12.335 31.731 10.9083 30.3075 11.2988 28.7334L11.7803 26.7939C11.8739 26.4167 12.0687 26.0716 12.3428 25.7959L22.7559 15.3193C23.052 15.0218 23.3966 14.7983 23.7881 14.6494C24.1752 14.5023 24.5736 14.4227 24.9824 14.4121H24.9863C25.4266 14.4121 25.8384 14.4918 26.2197 14.6514C26.5985 14.8099 26.9358 15.0319 27.2305 15.3174C27.5272 15.6048 27.7499 15.9416 27.8984 16.3252C28.0453 16.7047 28.1286 17.1143 28.1494 17.5527L28.1504 17.5596Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3"/>
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
      <div className="sidebar faculty">
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
              className={`nav-item ${isActive(item.path) ? 'active faculty' : ''}`}
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
          <svg className="notification-icon faculty" width="34" height="38" viewBox="0 0 34 38" fill="none">
            <path d="M13.2222 34.381H20.7778C20.7778 36.3714 19.0778 38 17 38C14.9222 38 13.2222 36.3714 13.2222 34.381ZM34 30.7619V32.5714H0V30.7619L3.77778 27.1429V16.2857C3.77778 10.6762 7.55556 5.79048 13.2222 4.16191V3.61905C13.2222 1.62857 14.9222 0 17 0C19.0778 0 20.7778 1.62857 20.7778 3.61905V4.16191C26.4444 5.79048 30.2222 10.6762 30.2222 16.2857V27.1429L34 30.7619ZM26.4444 16.2857C26.4444 11.219 22.2889 7.2381 17 7.2381C11.7111 7.2381 7.55556 11.219 7.55556 16.2857V28.9524H26.4444V16.2857Z" fill="currentColor"/>
          </svg>
          <img
            src="https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/me.png?raw=true?width=174"
            alt="User Avatar"
            className="user-avatar"
          />
        </div>

        {/* Content Area */}
        <div className="content-area">
          <div className="create-post-wrapper">
            <div className="post-header">
              <div className="post-title">CREATE ANNOUNCEMENT POST</div>
              <div className="drafts-label">DRAFTS</div>
            </div>

            <div className="post-selectors">
              <div className="dropdown-container">
                <select 
                  name="class" 
                  value={formData.class} 
                  onChange={handleInputChange}
                  className="dropdown-select"
                >
                  <option value="V - Molave">V - Molave</option>
                  <option value="VI - Sampaguita">VI - Sampaguita</option>
                </select>
              </div>

              <div className="dropdown-container">
                <select 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleInputChange}
                  className="dropdown-select"
                >
                  <option value="GMRC">GMRC</option>
                  <option value="Science">Science</option>
                  <option value="Math">Math</option>
                </select>
              </div>
            </div>

            <div className="form-container">
              <div className="input-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="title-input"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {!formData.title && <div className="error-text">Please fill out this field.</div>}
              </div>

              <div className="input-group">
                <textarea
                  name="body"
                  placeholder="Body text"
                  className="body-textarea"
                  value={formData.body}
                  onChange={handleInputChange}
                  rows={8}
                />
              </div>

              <div className="action-buttons">
                <button className="draft-button" onClick={handleSaveDraft}>SAVE DRAFT</button>
                <button className="post-button" onClick={handlePost}>POST</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncement;
