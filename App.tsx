import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Analyzer from './pages/Analyzer';
import About from './pages/About';
import GlobalThreat from './pages/GlobalThreat';
import Forensics from './pages/Forensics';
import { AppRoute } from './types';

const App: React.FC = () => {
  // Simple auth state persistence
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('trustera_auth') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('trustera_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('trustera_auth');
  };

  return (
    <HashRouter>
      <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>
        <Routes>
          <Route 
            path={AppRoute.LOGIN} 
            element={
              isAuthenticated ? <Navigate to={AppRoute.HOME} replace /> : <Login onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path={AppRoute.HOME} 
            element={
              isAuthenticated ? (
                <Home />
              ) : (
                <Navigate to={AppRoute.LOGIN} replace />
              )
            } 
          />
          
          <Route 
            path={AppRoute.ANALYZER} 
            element={
              isAuthenticated ? (
                <Analyzer />
              ) : (
                <Navigate to={AppRoute.LOGIN} replace />
              )
            } 
          />

          <Route 
            path={AppRoute.FORENSICS} 
            element={
              isAuthenticated ? (
                <Forensics />
              ) : (
                <Navigate to={AppRoute.LOGIN} replace />
              )
            } 
          />

          <Route 
            path={AppRoute.GLOBAL_THREAT} 
            element={
              isAuthenticated ? (
                <GlobalThreat />
              ) : (
                <Navigate to={AppRoute.LOGIN} replace />
              )
            } 
          />
          
          <Route 
            path={AppRoute.ABOUT} 
            element={
              isAuthenticated ? (
                <About />
              ) : (
                <Navigate to={AppRoute.LOGIN} replace />
              )
            } 
          />
          
          {/* Default redirect to Login instead of Home for security */}
          <Route path="*" element={<Navigate to={AppRoute.LOGIN} replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;