import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';
import Scene3D from '../components/Scene3D';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && password) {
      onLogin();
      navigate(AppRoute.HOME);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)] font-sans text-[var(--text-primary)] transition-colors duration-300">
      {/* Left Panel - 3D Visualizer */}
      <div className="hidden lg:flex lg:w-[50%] relative overflow-hidden bg-black items-center justify-center border-r border-[var(--border-color)]">
        <div className="absolute inset-0 z-0">
          <Scene3D />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-10"></div>

        {/* Branding Overlay */}
        <div className="relative z-20 text-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-8 shadow-2xl"
          >
            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500">T</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl font-bold text-white mb-6 tracking-tight"
          >
            TrustEra
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed"
          >
            Next-generation audio forensics and deepfake detection platform.
          </motion.p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-[50%] flex items-center justify-center p-8 lg:p-16 relative bg-[var(--bg-primary)] transition-colors duration-300">
        <div className="w-full max-w-[400px]">

          <AnimatePresence mode='wait'>
            <motion.div
              key={isRegistering ? 'register' : 'login'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                  {isRegistering ? 'Register Badge' : 'Officer Login'}
                </h2>
                <p className="text-[var(--text-secondary)] text-sm">
                  {isRegistering ? 'Establish secure credentials for forensics access.' : 'Identify yourself to access the terminal.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name Input (Register Only) */}
                {isRegistering && (
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 ml-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-secondary)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      <input
                        type="text"
                        required={isRegistering}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg py-3 pl-10 pr-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/20 focus:border-[var(--accent-color)] transition-all text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}

                {/* Email Input */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 ml-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-secondary)]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg py-3 pl-10 pr-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/20 focus:border-[var(--accent-color)] transition-all text-sm"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 ml-1">
                    <label className="block text-xs font-semibold text-[var(--text-secondary)]">Password</label>
                    {!isRegistering && (
                      <button type="button" className="text-xs font-semibold text-[var(--accent-color)] hover:text-[var(--accent-color)]/80">Forgot Password?</button>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-secondary)]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg py-3 pl-10 pr-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/20 focus:border-[var(--accent-color)] transition-all text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--text-primary)] hover:bg-[var(--text-primary)]/90 text-[var(--bg-primary)] font-bold rounded-lg transition-colors border border-transparent shadow-md"
                >
                  {isRegistering ? 'Initialize Access' : 'Authenticate'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </motion.button>
              </form>

              {/* Divider & Socials (Constant) */}
              <div>
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-[var(--border-color)]"></div>
                  <span className="flex-shrink-0 mx-4 text-[var(--text-secondary)] text-xs uppercase tracking-wider">Or continue with</span>
                  <div className="flex-grow border-t border-[var(--border-color)]"></div>
                </div>

                <div className="flex gap-4 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-color)] hover:bg-[var(--bg-surface)]/80 py-2.5 rounded-lg transition-colors group">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">Google</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-color)] hover:bg-[var(--bg-surface)]/80 py-2.5 rounded-lg transition-colors group">
                    <svg className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.39-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.39C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78.89 0 2.53-1.11 4.19-.71 1.69.41 2.92 1.55 3.73 2.76-.13.06-.92.51-.9 1.46-.07 3.52 4.16 4.14 4.13 4.2-.34 2.25-2.52 6.06-6.23 4.47zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.16 2.29-1.93 4.34-3.74 4.25z" />
                    </svg>
                    <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">Apple</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Link */}
          <div className="text-center pt-8">
            <p className="text-sm text-[var(--text-secondary)]">
              {isRegistering ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="ml-2 font-semibold text-[var(--accent-color)] hover:underline focus:outline-none"
              >
                {isRegistering ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;