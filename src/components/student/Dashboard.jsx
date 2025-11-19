import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import Sidebar from '../Sidebar';
import Header from '../Header';
import '../../style/student.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [doneList, setDoneList] = useState({});
  const [loading, setLoading] = useState(true);
  const [reminderLoading, setReminderLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load student "marked as done" list from localStorage
  useEffect(() => {
    const savedDone = JSON.parse(localStorage.getItem("doneList")) || {};
    setDoneList(savedDone);
  }, []);

  // Fetch announcements
  useEffect(() => {
    if (user && user.id) {
      const fetchAnnouncements = async () => {
        try {
          setLoading(true);
          const response = await fetch('/api/announcements');

          if (response.ok) {
            const data = await response.json();
            setAnnouncements(data.announcements);
          } else {
            setError('Failed to fetch announcements');
          }
        } catch (error) {
          setError('Error fetching announcements:' + error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAnnouncements();
    }
  }, [user]);

  // Fetch reminders created by teachers
  useEffect(() => {
    if (user && user.id) {
      const fetchReminders = async () => {
        try {
          setReminderLoading(true);
          const response = await fetch('/api/reminders');

          if (response.ok) {
            const data = await response.json();
            setReminders(data.reminders); // expects: [{ id, subject, title, date }]
          }
        } catch (error) {
          console.error("Error loading reminders:", error);
        } finally {
          setReminderLoading(false);
        }
      };

      fetchReminders();
    }
  }, [user]);

  // Toggle assignment done/undone
  const toggleDone = (id) => {
    const updated = { ...doneList, [id]: !doneList[id] };
    setDoneList(updated);
    localStorage.setItem("doneList", JSON.stringify(updated));
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Group reminders by subject
  const subjectGroups = reminders.reduce((acc, r) => {
    if (!acc[r.subject]) acc[r.subject] = [];
    acc[r.subject].push(r);
    return acc;
  }, {});

  const navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/enrollment', icon: 'enrollment', label: 'Enrollment' },
    { path: '/schedule', icon: 'schedule', label: 'Schedule' },
    { path: '/modules', icon: 'modules', label: 'Modules' },
    { path: '/grades', icon: 'grades', label: 'Grades' },
  ];

  return (
    <div className="dashboard-container student-container">
      <Sidebar
        isMenuOpen={isMenuOpen}
        handleNavigation={handleNavigation}
        navItems={navItems}
        toggleMenu={toggleMenu}
      />

      <div className="main-content">
        <Header toggleMenu={toggleMenu} />

        <div className="content-area">
          <div className="dashboard-content-wrapper">

            {/* WELCOME SECTION */}
            <div className="welcome-section">
              <div className="welcome-text">Welcome, {user ? user.username : 'Student'}!</div>
              <img
                src={user ? user.profile_picture : 'https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/me.png?raw=true'}
                alt="Welcome Illustration"
                className="welcome-image"
              />
            </div>

            {/* ANNOUNCEMENTS */}
            <div className="announcements-section">
              <div className="announcements-title">CLASS ANNOUNCEMENTS</div>

              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : announcements.length === 0 ? (
                // Default announcement example
                <div className="announcement-card">
                  <div className="announcement-header">
                    <div className="announcement-teacher-info">
                      <img
                        src="https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/teacher.png?raw=true"
                        alt="Teacher Avatar"
                        className="teacher-avatar"
                      />
                      <div className="teacher-name">Teacher Ann</div>
                    </div>
                    <div className="announcement-date">Feb 11 2025</div>
                  </div>
                  <div className="announcement-text">
                    <ReactMarkdown>
                      Hello, V-Molave!

                      Please do your Module 5 for this week's activity.

                      Thank you!
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                announcements.map(announcement => (
                  <div key={announcement.id} className="announcement-card">
                    <div className="announcement-header">
                      <div className="announcement-teacher-info">
                        <img
                          src={announcement.profile_picture ||
                            "https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/teacher.png?raw=true"}
                          alt="Teacher Avatar"
                          className="teacher-avatar"
                        />
                        <div className="teacher-name">{announcement.username}</div>
                      </div>
                      <div className="announcement-date">
                        {new Date(announcement.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="announcement-text">
                      <ReactMarkdown>
                        {announcement.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* REMINDER SECTION (dynamic per subject) */}
            <div className="reminder-section">
              <div className="reminder-title">REMINDER</div>

              {reminderLoading ? (
                <div>Loading reminders...</div>
              ) : reminders.length === 0 ? (
                <div className="no-reminders">No reminders yet.</div>
              ) : (
                Object.keys(subjectGroups).map(subject => (
                  <div key={subject} className="subject-reminder">
                    <div className="subject-name">{subject}</div>

                    <div className="assignments-list">
                      {subjectGroups[subject].map(r => (
                        <div key={r.id} className="assignment-item">
                          <div
                            className={`assignment-circle ${doneList[r.id] ? 'done' : ''}`}
                            onClick={() => toggleDone(r.id)}
                          ></div>

                          <div className="assignment-details">
                            <div className="assignment-name">{r.title}</div>
                            <div className="assignment-date">{r.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;