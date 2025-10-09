import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    learnerNumber: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, any input will navigate to dashboard
    if (formData.learnerNumber && formData.password) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="student-login-container">
      <img 
        src="https://raw.githubusercontent.com/Golgrax/forthem-assets/refs/heads/main/students/backgrounds/school/image.png?width=2514" 
        alt="School Building" 
        className="building-image"
      />
      
      <div className="login-form-content">
        <img 
          src="https://raw.githubusercontent.com/Golgrax/forthem-assets/refs/heads/main/students/logo/login-logo/image.png?width=300" 
          alt="School Logo" 
          className="school-logo"
        />
        
        <div>
          <div className="school-title">STO. NIÑO ELEMENTARY SCHOOL</div>
          <div className="school-subtitle">Student Access System</div>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="learnerNumber"
            placeholder="Learner's Reference Number"
            className="input-field"
            value={formData.learnerNumber}
            onChange={handleInputChange}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          
          <button type="submit" className="signin-button">
            Sign-in
          </button>
          
          <div className="forgot-password">
            Forgot Password?
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
