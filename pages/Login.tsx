import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation of backend validation
    if (isRegistering) {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (!username || !password || !email) return;
        
        // Register success simulation
        alert(`Account created for Officer ${username}. Access Granted.`);
        onLogin();
        navigate(AppRoute.HOME);
    } else {
        // Login simulation
        if (username && password) {
            onLogin();
            navigate(AppRoute.HOME);
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-trust-900 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-trust-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full bg-trust-800/50 backdrop-blur-xl border border-trust-700 p-8 rounded-2xl shadow-2xl relative z-10 neon-border animate-fade-in-up">
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-trust-900 border border-trust-500 text-trust-500 mb-4 shadow-[0_0_20px_rgba(57,255,20,0.2)]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">TrustEra</h2>
            <p className="text-trust-400 text-sm mt-2 font-mono">
                {isRegistering ? 'NEW AGENT REGISTRATION' : 'SECURE FORENSICS ACCESS'}
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">Badge ID / Username</label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-trust-900 border border-trust-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-trust-500 focus:border-transparent transition-all"
              placeholder="Enter your ID"
            />
          </div>

          {isRegistering && (
             <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Official Email</label>
                <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-trust-900 border border-trust-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-trust-500 focus:border-transparent transition-all"
                placeholder="agent@trustera.ai"
                />
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-trust-900 border border-trust-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-trust-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          {isRegistering && (
             <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
                <input
                type="password"
                id="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-trust-900 border border-trust-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-trust-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                />
            </div>
          )}
          
          {!isRegistering && (
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-trust-500 focus:ring-trust-500 border-gray-600 rounded bg-trust-900" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">Remember me</label>
                </div>
                <div className="text-sm">
                <a href="#" className="font-medium text-trust-500 hover:text-trust-400">Forgot password?</a>
                </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-trust-900 bg-trust-500 hover:bg-trust-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-trust-500 transition-colors uppercase tracking-wider"
          >
            {isRegistering ? 'Create Access' : 'Authenticate'}
          </button>
        </form>

        <div className="mt-6 border-t border-trust-700 pt-4 text-center">
            <p className="text-sm text-gray-400">
                {isRegistering ? "Already have a badge?" : "Need system access?"}
                <button 
                    onClick={() => {
                        setIsRegistering(!isRegistering);
                        setUsername('');
                        setPassword('');
                        setConfirmPassword('');
                        setEmail('');
                    }}
                    className="ml-2 font-bold text-trust-400 hover:text-white transition-colors"
                >
                    {isRegistering ? "Login Here" : "Register Now"}
                </button>
            </p>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
             Authorized personnel only. All activities are monitored.
        </div>
      </div>
    </div>
  );
};

export default Login;