
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (name: string, phone: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate network delay for effect
    setTimeout(() => {
      setIsLoading(false);
      onLogin(name, phone);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 animate-fadeIn font-sans text-black">
      {/* Header / Logo */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold tracking-[0.2em] mb-4">GUCCI</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
          Enter the world of Gucci
        </p>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Name Input */}
          <div className="group relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-gray-300 py-3 text-sm focus:border-black focus:outline-none transition-colors bg-transparent pt-4"
              placeholder=" "
              disabled={isLoading}
            />
            <label className={`absolute left-0 top-4 text-xs uppercase tracking-widest text-gray-500 transition-all duration-300 pointer-events-none ${name ? '-translate-y-4 text-[10px]' : ''}`}>
              Full Name
            </label>
          </div>

          {/* Phone Input */}
          <div className="group relative">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-b border-gray-300 py-3 text-sm focus:border-black focus:outline-none transition-colors bg-transparent pt-4"
              placeholder=" "
              disabled={isLoading}
            />
            <label className={`absolute left-0 top-4 text-xs uppercase tracking-widest text-gray-500 transition-all duration-300 pointer-events-none ${phone ? '-translate-y-4 text-[10px]' : ''}`}>
              Phone Number
            </label>
          </div>

          {/* Password Input */}
          <div className="group relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-3 text-sm focus:border-black focus:outline-none transition-colors bg-transparent pt-4"
              placeholder=" "
              disabled={isLoading}
            />
            <label className={`absolute left-0 top-4 text-xs uppercase tracking-widest text-gray-500 transition-all duration-300 pointer-events-none ${password ? '-translate-y-4 text-[10px]' : ''}`}>
              Password
            </label>
          </div>

          {error && (
            <p className="text-red-600 text-[10px] uppercase tracking-wider text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-black text-white text-xs font-bold uppercase tracking-[0.3em] py-4 transition-opacity mt-8 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-80'}`}
          >
            {isLoading ? 'Processing...' : 'Login'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-[9px] text-gray-400 font-medium tracking-wider">
          © 2025 Guccio Gucci S.p.A.
        </p>
      </div>
    </div>
  );
};
