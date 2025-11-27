import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../style/transferee.css';
import schoolBuilding from '../../assets/backgrounds/school/image.png';
import schoolLogo from '../../assets/logo/login-logo/image.png';


const TransfereeLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    learnerNumber: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load transferee CSS

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
    
    try {
      // Demo mode - accept any login with mock data
      const { mockLogin } = await import('../../services/mockData');
      const data = await mockLogin(formData.transfereeNumber || 'transferee', formData.password || 'demo');
      if (data.user) {
        login({ ...data.user, role: 'transferee' });
        navigate('/transferee/new-enrollee');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError(`Login failed: ${error.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="transferee-login-container">
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
          <div className="school-subtitle">Transferee Login</div>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <input
            type="text"
            name="transfereeNumber"
            placeholder="Transferee ID (any input works)"
            className="input-field"
            value={formData.transfereeNumber}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password (any input works)"
            className="input-field"
            value={formData.password}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          
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

export default TransfereeLogin;
