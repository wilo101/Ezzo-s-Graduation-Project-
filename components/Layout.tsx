import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isAuthenticated, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    onLogout();
    navigate(AppRoute.LOGIN);
  };

  if (location.pathname === AppRoute.LOGIN) {
    return <>{children}</>;
  }

  const navLinkClass = (path: string) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${location.pathname === path
      ? 'text-[var(--accent-color)] bg-[var(--text-primary)]/5 shadow-md'
      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5'
    }`;

  return (
    <div className={`min-h-screen flex flex-col font-sans bg-black text-[var(--text-primary)] transition-colors duration-300 relative`}>
      {/* Global Starfield Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150"></div>
        <div className="absolute top-0 left-0 w-full h-full animate-[pulse_8s_ease-in-out_infinite]" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(30,58,138,0.15), transparent 70%)' }}></div>
      </div>
      {/* Floating Navbar */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className="bg-[var(--bg-panel)]/80 backdrop-blur-2xl border border-[var(--border-color)]/50 rounded-full px-4 md:px-6 py-3 shadow-2xl flex items-center gap-4 md:gap-8 max-w-[95%] md:max-w-5xl w-full justify-between transition-all duration-300 hover:border-[var(--accent-color)]/30">

          {/* Logo */}
          <Link to={AppRoute.HOME} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent-color)] to-purple-600 flex items-center justify-center text-white font-bold shadow-lg group-hover:rotate-12 transition-transform">
              T
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-lg tracking-tight leading-none text-[var(--text-primary)]">TRUST<span className="text-[var(--accent-color)]">ERA</span></span>
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--text-secondary)]">Forensics</span>
            </div>
          </Link>

          {/* Center Links */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1 bg-[var(--bg-surface)]/50 rounded-full p-1 border border-[var(--border-color)]/20">
              {[
                { path: AppRoute.HOME, label: 'Dashboard' },
                { path: AppRoute.ANALYZER, label: 'Analyzer' },
                { path: AppRoute.FORENSICS, label: 'Tools' },
                { path: AppRoute.GLOBAL_THREAT, label: 'Threat Map' },
                { path: AppRoute.ABOUT, label: 'About' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${location.pathname === link.path
                    ? 'bg-[var(--accent-color)] text-white shadow-lg shadow-[var(--accent-color)]/25'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-panel)] data-[theme=light]:text-gray-700 data-[theme=light]:hover:text-black'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-3">


            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-full text-sm font-bold bg-[var(--bg-surface)] hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-500 border border-[var(--border-color)]/50 transition-all"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-[var(--accent-color)] rounded-full blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-indigo-500 rounded-full blur-3xl opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-panel)] py-8 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[var(--text-secondary)] text-sm">
            &copy; {new Date().getFullYear()} TrustEra AI Lab. All rights reserved.
          </div>
          <div className="flex space-x-8">
            <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] text-sm transition-colors">Privacy</a>
            <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] text-sm transition-colors">Terms</a>
            <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] text-sm transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;