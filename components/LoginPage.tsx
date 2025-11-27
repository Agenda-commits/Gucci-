
import React, { useState } from 'react';
import { useLanguage, LANGUAGES } from '../LanguageContext';
import { Globe, CheckCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (name: string, phone: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { t, language, setLanguage } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !password) {
      setError(t('fill_fields'));
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 animate-fadeIn font-sans text-black relative">
      
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-50">
        <div className="relative">
          <div 
            className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          >
            <Globe size={20} strokeWidth={1.5} />
            <span className="text-xs font-bold uppercase">{language.toUpperCase()}</span>
          </div>
          
          {/* Custom Language Dropdown */}
          {isLangMenuOpen && (
            <div className="absolute top-8 right-0 bg-white border border-gray-100 shadow-xl py-2 w-48 animate-fadeIn rounded-sm">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 uppercase tracking-wide flex justify-between ${language === lang.code ? 'font-bold bg-gray-50' : 'text-gray-600'}`}
                >
                  {lang.name}
                  {language === lang.code && <CheckCircle size={12} className="text-black" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Header / Logo */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold tracking-[0.2em] mb-4">GUCCI</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
          {t('enter_world')}
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
              {t('full_name')}
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
              {t('phone_number')}
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
              {t('password')}
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
            {isLoading ? t('processing') : t('login')}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-[9px] text-gray-400 font-medium tracking-wider">
          {t('copyright')}
        </p>
      </div>
    </div>
  );
};
