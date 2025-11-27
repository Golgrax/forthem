import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  allowedRoles = null, 
  redirectTo = '/',
  fallback = null 
}) => {
  const { user, loading } = useAuth();

  // Ipakita ang estado ng pag-load habang tinitingnan ang pagpapatunay
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  // Kung walang user na naka-log in, i-redirect sa login
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Suriin ang access na batay sa papel
  if (requiredRole && user.role !== requiredRole) {
    return fallback || (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <p>Required role: {requiredRole}</p>
        <p>Your role: {user.role}</p>
        <button 
          onClick={() => window.history.back()}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  // Suriin kung ang user ay may alinman sa mga pinapayagang papel
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return fallback || (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <p>Allowed roles: {allowedRoles.join(', ')}</p>
        <p>Your role: {user.role}</p>
        <button 
          onClick={() => window.history.back()}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  // Ang user ay napatotohanan at may kinakailangang papel
  return children;
};

export default ProtectedRoute;
