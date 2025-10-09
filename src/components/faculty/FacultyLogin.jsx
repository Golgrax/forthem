import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    facultyNumber: '',
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
    if (formData.facultyNumber && formData.password) {
      navigate('/faculty/dashboard');
    }
  };

  return (
    <div className="student-login-container faculty">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/6923363c4d36e3cef350cbc8fb9a99d810421d8d?width=2514"
        alt="School Building"
        className="building-image"
      />
      
      <div className="login-form-content">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/f67440401deeb09734fd0bd25c5831aea47eed28?width=300"
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
            name="facultyNumber"
            placeholder="Faculty Number"
            className="input-field"
            value={formData.facultyNumber}
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

export default FacultyLogin;
