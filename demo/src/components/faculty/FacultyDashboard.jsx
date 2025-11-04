import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import FacultySidebar from './FacultySidebar';
import FacultyHeader from './FacultyHeader';
import { mockGetAnnouncements, mockGetReminders } from '../../services/mockData';
import '../../style/faculty.css';

const FacultyDashboard = () => {
  console.log('Rendering FacultyDashboard');
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await mockGetAnnouncements();
        setAnnouncements(data.announcements);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    const fetchReminders = async () => {
      try {
        const data = await mockGetReminders();
        setReminders(data.reminders);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };

    fetchAnnouncements();
    fetchReminders();
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
  ];

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
          <div className="faculty-dashboard-wrapper">
            <div className="posted-section">
              <div className="section-header">
                <div className="section-title">POSTED ANNOUNCEMENTS</div>
                <button className="add-button" onClick={() => navigate('/faculty/create-announcement')}>+</button>
              </div>

              {announcements.map(announcement => (
                <div key={announcement.id} className="announcement-card faculty-card">
                  <div className="announcement-header">
                                      <div className="announcement-teacher-info">
                                        <img
                                          src={announcement.profile_picture}
                                          alt="Faculty Avatar"
                                          className="teacher-avatar"
                                        />
                                        <div className="teacher-name">{announcement.username}</div>
                                      </div>                    <div className="announcement-date">{new Date(announcement.created_at).toLocaleDateString()}</div>
                  </div>
                  <div className="announcement-text">
                    <ReactMarkdown 
                      components={{
                        p: ({ children }) => <p style={{ whiteSpace: 'pre-wrap', marginBottom: '0.5rem' }}>{children}</p>
                      }}
                    >
                      {announcement.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
            <div className="posted-section">
              <div className="section-header">
                <div className="section-title">POSTED UPCOMING REMINDERS</div>
                <button className="add-button" onClick={() => navigate('/faculty/create-reminder', { state: { user } })}>+</button>
              </div>

              {reminders.map(reminder => (
                <div key={reminder.id} className="reminder-card faculty-card">
                  <div className="reminder-header">
                    <div className="reminder-teacher-info">
                      <img
                        src={reminder.profile_picture}
                        alt="Faculty Avatar"
                        className="teacher-avatar"
                      />
                      <div className="teacher-name">{reminder.username}</div>
                    </div>
                    <div className="reminder-date">DUE ON {new Date(reminder.due_date).toLocaleDateString()}</div>
                  </div>
                  <div className="reminder-content">
                    <div className="reminder-title">{reminder.title}</div>
                    <div className="reminder-text">
                      <ReactMarkdown 
                        components={{
                          p: ({ children }) => <p style={{ whiteSpace: 'pre-wrap', marginBottom: '0.5rem' }}>{children}</p>
                        }}
                      >
                        {reminder.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;