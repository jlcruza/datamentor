import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, LogIn, UserPlus, Mail } from 'lucide-react';
import { supabase } from '../lib/supabaseClient.ts';
import {VITE_APP_BASE_URL} from "../constants/environmentConfigs.ts";
import logo from '../images/logo.png';

interface LoginModalProps {
  onLogin: (email: string, password: string) => void;
  onClose: () => void;
  isRequired?: boolean;
}

type AuthMode = 'login' | 'register' | 'reset';

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose, isRequired = false }) => {
  const { t } = useTranslation();
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  // Clear default demo values; use empty fields for real auth.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const EMAIL_CONFIRM_REDIRECT = `${VITE_APP_BASE_URL}/auth/callback`;
  const RESET_PASSWORD_REDIRECT = `${VITE_APP_BASE_URL}/auth/reset-complete`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (authMode === 'login') {
        // Sign in with email + password via Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage(error.message || t('errors.generic'));
          return;
        }

        // Notify parent that login succeeded; parent can fetch user/session as needed.
        setMessage(t('auth.loginSuccess', 'Logged in successfully.'));
        onLogin(email, password);
      } else if (authMode === 'register') {
        // Basic client-side validation
        if (password !== confirmPassword) {
          setMessage(t('auth.passwordsDoNotMatch'));
          return;
        }
        if (password.length < 6) {
          setMessage(t('auth.passwordMinLength'));
          return;
        }

        // Create an account with Supabase (password-based only)
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // Store optional profile metadata
            data: { full_name: name },
            // Where to redirect users after they click the email confirmation link (if confirmation is enabled)
            emailRedirectTo: EMAIL_CONFIRM_REDIRECT,
          },
        });

        if (error) {
          setMessage(error.message || t('errors.generic'));
          return;
        }

        // If email confirmations are enabled, session will be null until confirmed
        setMessage(t('auth.accountCreatedSuccess'));
        setAuthMode('login');
        setPassword('');
        setConfirmPassword('');
      } else if (authMode === 'reset') {
        // Send password reset email
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: RESET_PASSWORD_REDIRECT,
        });

        if (error) {
          setMessage(error.message || t('errors.generic'));
          return;
        }

        setMessage(t('auth.resetEmailSent'));
        setTimeout(() => {
          setAuthMode('login');
          setMessage('');
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setMessage('');
  };

  const switchMode = (mode: AuthMode) => {
    setAuthMode(mode);
    resetForm();
  };

  const getTitle = () => {
    switch (authMode) {
      case 'login': return t('auth.loginTitle');
      case 'register': return t('auth.registerTitle');
      case 'reset': return t('auth.resetTitle');
    }
  };

  const getButtonText = () => {
    switch (authMode) {
      case 'login': return t('auth.login');
      case 'register': return t('auth.register');
      case 'reset': return t('auth.sendResetEmail');
    }
  };

  return (
    <div className={`${isRequired ? '' : 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md lg:max-w-lg border border-gray-200 dark:border-gray-700 mx-auto max-h-[90vh] overflow-y-auto">
        <div className="flex justify-center pt-4 sm:pt-6 pb-2">
          <img
            src={logo}
            alt="DataMentor Logo"
            className="h-12 sm:h-16 w-auto"
          />
        </div>
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            {getTitle()}
          </h2>
          {!isRequired && (
            <button
              onClick={onClose}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('auth.fullName')}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder={t('auth.enterFullName')}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('auth.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder={t('auth.enterEmail')}
            />
          </div>

          {authMode !== 'reset' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('auth.password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder={t('auth.enterPassword')}
                minLength={authMode === 'register' ? 6 : undefined}
              />
            </div>
          )}

          {authMode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('auth.confirmPassword')}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder={t('auth.confirmYourPassword')}
                minLength={6}
              />
            </div>
          )}

          {message && (
            <div className={`p-2 sm:p-3 rounded-lg border ${
              message.includes('successfully') || message.includes('sent')
                ? 'bg-green-50 dark:bg-green-900/30 border-green-500/50 dark:border-green-500/30 text-green-800 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-900/30 border-red-500/50 dark:border-red-500/30 text-red-800 dark:text-red-400'
            }`}>
              <p className="text-xs sm:text-sm break-words">{message}</p>
            </div>
          )}
          
          <div className="flex flex-col space-y-2 sm:space-y-3 pt-2 sm:pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-2 text-sm sm:text-base text-white rounded-lg transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:shadow-blue-500/25 disabled:opacity-50"
            >
              {authMode === 'login' && <LogIn className="h-4 w-4" />}
              {authMode === 'register' && <UserPlus className="h-4 w-4" />}
              {authMode === 'reset' && <Mail className="h-4 w-4" />}
              <span>{isLoading ? t('auth.processing') : getButtonText()}</span>
            </button>

            {/* Auth Mode Switcher */}
            <div className="text-center space-y-1 sm:space-y-2">
              {authMode === 'login' && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
                  <button
                    type="button"
                    onClick={() => switchMode('register')}
                    className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    {t('auth.noAccount')}
                  </button>
                  <div className="hidden sm:block text-gray-500 mx-2">•</div>
                  <button
                    type="button"
                    onClick={() => switchMode('reset')}
                    className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    {t('auth.forgotPassword')}
                  </button>
                </div>
              )}
              
              {authMode === 'register' && (
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  {t('auth.hasAccount')}
                </button>
              )}

              {authMode === 'reset' && (
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  {t('auth.backToLogin')}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;