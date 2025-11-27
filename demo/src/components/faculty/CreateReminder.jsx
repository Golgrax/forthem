import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import FacultySidebar from './FacultySidebar';
import FacultyHeader from './FacultyHeader';


const CreateReminder = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load faculty CSS

  const [formData, setFormData] = useState({
    class: 'V - Molave',
    subject: 'GMRC',
    title: '',
    body: ''
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToolbarClick = (format) => {
    const textarea = document.querySelector('textarea[name="body"]');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.body.substring(start, end);
    let newText = '';

    switch (format) {
      case 'bold':
        newText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        newText = `*${selectedText || 'italic text'}*`;
        break;
      case 'superscript':
        newText = `${selectedText || 'superscript'}^2^`;
        break;
      case 'subscript':
        newText = `${selectedText || 'subscript'}~2~`;
        break;
      case 'image':
        newText = `![alt text](image-url)`;
        break;
      case 'bullet':
        newText = `- ${selectedText || 'bullet point'}`;
        break;
      case 'linebreak':
        newText = `\n\n`;
        break;
      default:
        return;
    }

    const newBody = formData.body.substring(0, start) + newText + formData.body.substring(end);
    setFormData(prev => ({
      ...prev,
      body: newBody
    }));

    // Focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  const handleBack = () => {
    navigate('/faculty/dashboard');
  };

  const handlePost = async () => {
    if (!formData.title || !formData.body) {
      alert('Please fill in both title and body fields.');
      return;
    }

    try {
      const { mockCreateReminder } = await import('../../services/mockData');
      const demoUser = user || { username: 'Demo Faculty', profile_picture: 'https://raw.githubusercontent.com/Golgrax/forthem-assets/main/students/pfp/teacher.png' };
      const dueDate = new Date(Date.now() + 86400000 * 7).toISOString(); // 7 days from now
      await mockCreateReminder(formData.title, formData.body, dueDate, demoUser);
      navigate('/faculty/dashboard');
    } catch (error) {
      console.error('Error posting reminder:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleNavigation = (path) => {
    navigate(path, { state: { user } });
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/faculty/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/faculty/masterlist', icon: 'masterlist', label: 'Masterlist' },
    { path: '/faculty/schedule', icon: 'schedule', label: 'Schedule' },
    { path: '/faculty/grades', icon: 'grades', label: 'Grades' },
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
                  <button className="toolbar-btn" onClick={() => handleToolbarClick('bold')} title="Bold">
                    <strong>B</strong>
                  </button>
                  <button className="toolbar-btn" onClick={() => handleToolbarClick('italic')} title="Italic">
                    <em>I</em>
                  </button>
                  <button className="toolbar-btn" onClick={() => handleToolbarClick('superscript')} title="Superscript">
                    x²
                  </button>
                  <button className="toolbar-btn" onClick={() => handleToolbarClick('subscript')} title="Subscript">
                    x₂
                  </button>
                  <button className="toolbar-btn" onClick={() => handleToolbarClick('image')} title="Insert Image">
                    🖼
                  </button>
                  <button className="toolbar-btn" onClick={() => handleToolbarClick('bullet')} title="Bullet Point">
                    ●
                  </button>
                  <button className="toolbar-btn" onClick={() => handleToolbarClick('linebreak')} title="Line Break">
                    ↵
                  </button>
                  <button 
                    className={`toolbar-btn ${showPreview ? 'active' : ''}`} 
                    onClick={() => setShowPreview(!showPreview)}
                    title="Toggle Preview"
                  >
                    👁
                  </button>
                </div>
                {showPreview ? (
                  <div className="markdown-preview">
                    <h4>Preview:</h4>
                    <div className="preview-content">
                      <ReactMarkdown 
                        components={{
                          p: ({ children }) => <p style={{ whiteSpace: 'pre-wrap', marginBottom: '0.5rem' }}>{children}</p>
                        }}
                      >
                        {formData.body || '*No content to preview*'}
                      </ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <textarea
                    name="body"
                    placeholder="Body text (supports Markdown formatting)"
                    className="body-textarea"
                    value={formData.body}
                    onChange={handleInputChange}
                    rows={8}
                  />
                )}
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