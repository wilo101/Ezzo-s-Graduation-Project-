import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isAuthenticated, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate(AppRoute.LOGIN);
  };

  // If on login page, just render children without the full nav
  if (location.pathname === AppRoute.LOGIN) {
      return <>{children}</>;
  }

  const navLinkClass = (path: string) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      location.pathname === path 
        ? 'text-trust-500 bg-trust-800 border border-trust-500/30' 
        : 'text-gray-300 hover:text-white hover:bg-trust-800'
    }`;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar - Only show links if authenticated */}
      <nav className="border-b border-trust-800 bg-trust-900/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to={AppRoute.HOME} className="flex-shrink-0 flex items-center gap-2 group">
                <div className="w-8 h-8 rounded bg-trust-500 flex items-center justify-center text-trust-900 font-bold text-xl neon-border group-hover:bg-trust-400 transition-colors">
                    T
                </div>
                <span className="text-white font-bold text-xl tracking-wider group-hover:text-trust-400 transition-colors">
                    TRUST<span className="text-trust-500">ERA</span>
                </span>
              </Link>
              
              {isAuthenticated && (
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-2">
                    <Link to={AppRoute.HOME} className={navLinkClass(AppRoute.HOME)}>Home</Link>
                    <Link to={AppRoute.ANALYZER} className={navLinkClass(AppRoute.ANALYZER)}>Analyzer</Link>
                    <Link to={AppRoute.FORENSICS} className={navLinkClass(AppRoute.FORENSICS)}>Forensics Tools</Link>
                    <Link to={AppRoute.GLOBAL_THREAT} className={navLinkClass(AppRoute.GLOBAL_THREAT)}>Threat Map</Link>
                    <Link to={AppRoute.ABOUT} className={navLinkClass(AppRoute.ABOUT)}>About</Link>
                    </div>
                </div>
              )}
            </div>
            <div>
                {isAuthenticated ? (
                    <button 
                        onClick={handleLogout}
                        className="text-gray-400 hover:text-white text-sm font-medium border border-gray-700 rounded px-3 py-1 hover:border-gray-500 transition-colors"
                    >
                        LOGOUT
                    </button>
                ) : (
                    <span className="text-gray-500 text-sm font-mono">LOCKED</span>
                )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-trust-900">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-trust-800 bg-trust-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} TrustEra AI Lab. All rights reserved.
            </div>
            <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-trust-400 text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-trust-400 text-sm">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-trust-400 text-sm">Contact Forensics Team</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;