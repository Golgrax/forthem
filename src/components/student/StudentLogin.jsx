import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../style/student.css';
import schoolBuilding from '../../assets/backgrounds/login-background.png';
import schoolLogo from '../../assets/logo/login-logo/image.png';

const StudentLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    learnerNumber: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load student CSS

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setIsLoading(true);
    console.log('Attempting login with:', formData.learnerNumber);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: formData.learnerNumber, 
          password: formData.password 
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const data = await response.json();
        if (data.user && data.user.role === 'student') {
          login(data.user);
          navigate('/dashboard');
        } else {
          alert('Login successful, but you do not have the correct role to access this page.');
        }
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.log('Login failed with status:', response.status, 'Error:', errorData);
        setError(errorData.error || 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError(`Login failed: ${error.message}. Please check your connection and try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="student-login-container">
      <img 
        src={schoolBuilding} 
        alt="School Building" 
        className="building-image"
      />
      
      <div className="login-form-content">
        <img 
          src={schoolLogo} 
          alt="School Logo" 
          className="school-logo"
        />
        
        <div>
          <div className="school-title">Sto. Niño Elementary School</div>
          <div className="school-subtitle">Student Access System</div>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <input
              type="text"
              id="learnerNumber"
              name="learnerNumber"
              placeholder=" "
              className="input-field"
              value={formData.learnerNumber}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            <label htmlFor="learnerNumber" className="form-label">Learner's Reference Number</label>
          </div>
          
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" "
              className="input-field"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            <label htmlFor="password" className="form-label">Password</label>
          </div>
          
          <button 
            type="submit" 
            className="signin-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign-in'}
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
