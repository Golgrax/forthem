import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FacultySidebar from './FacultySidebar';
import Header from '../Header';
import '../../style/faculty.css';

const CreateReminder = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleBack = () => {
    navigate('/faculty/dashboard');
  };

  const handlePost = () => {
    if (formData.title && formData.body) {
      console.log('Posted:', formData);
      navigate('/faculty/dashboard');
    }
  };

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
    <div className="dashboard-container faculty-dashboard">
      <FacultySidebar
        isMenuOpen={isMenuOpen}
        handleNavigation={handleNavigation}
        navItems={navItems}
        toggleMenu={toggleMenu}
      />

      <div className="main-content">
        <Header toggleMenu={toggleMenu} />

        <div className="content-area">
          <div className="create-post-wrapper">
            <div className="post-header">
              <div className="post-title">CREATE REMINDER POST</div>
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
                <div className="text-editor-toolbar">
                  <button className="toolbar-btn"><strong>B</strong></button>
                  <button className="toolbar-btn"><em>I</em></button>
                  <button className="toolbar-btn">x²</button>
                  <button className="toolbar-btn">x₂</button>
                  <button className="toolbar-btn">🖼</button>
                  <button className="toolbar-btn">●</button>
                </div>
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
                <button className="draft-button" onClick={handleBack}>BACK</button>
                <button className="post-button" onClick={handlePost}>POST</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReminder;