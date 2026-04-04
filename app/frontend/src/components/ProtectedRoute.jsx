import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, redirectTo = '/' }) => {
  const { isAuthenticated, loading, openAuthModal } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Instead of redirecting, show auth modal
    openAuthModal('login');
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;