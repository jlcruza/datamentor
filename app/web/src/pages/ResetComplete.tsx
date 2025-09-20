import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabaseClient.ts';

// Handles redirects from Supabase for password recovery.
// When the user arrives here via the reset link, Supabase provides a temporary session.
// We then allow the user to set a new password using supabase.auth.updateUser.
const ResetComplete: React.FC = () => {
  const { t } = useTranslation();
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [variant, setVariant] = useState<'info' | 'success' | 'error'>('info');

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      if (data.session?.user) {
        setIsValidSession(true);
        setMessage(t('auth.pleaseSetNewPassword', 'Please set a new password for your account.'));
        setVariant('info');
      } else {
        setIsValidSession(false);
        setMessage(t('auth.resetLinkInvalid'));
        setVariant('error');
      }
    };

    checkSession();
    return () => {
      mounted = false;
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidSession) return;

    if (password.length < 6) {
      setVariant('error');
      setMessage(t('auth.passwordMinLength'));
      return;
    }
    if (password !== confirm) {
      setVariant('error');
      setMessage(t('auth.passwordsDoNotMatch'));
      return;
    }

    setIsLoading(true);
    setMessage('');
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setVariant('error');
        setMessage(error.message || t('errors.generic'));
        return;
      }
      setVariant('success');
      setMessage(t('auth.passwordUpdatedSuccess'));
      // After success, user typically remains signed in; redirect to app.
      setTimeout(() => {
        window.location.replace('/');
      }, 1200);
    } finally {
      setIsLoading(false);
    }
  };

  const baseClasses = 'min-h-screen bg-gray-900 flex items-center justify-center p-4';
  const panelClasses =
    'bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-gray-700 p-6';
  const msgClass =
    variant === 'success'
      ? 'bg-green-900/30 border-green-500/30 text-green-400'
      : variant === 'error'
      ? 'bg-red-900/30 border-red-500/30 text-red-400'
      : 'bg-blue-900/30 border-blue-500/30 text-blue-300';

  return (
    <div className={baseClasses}>
      <div className={panelClasses}>
        <h1 className="text-xl font-semibold text-white mb-4">{t('auth.setNewPassword')}</h1>

        {message && (
          <div className={`p-3 rounded-lg border mb-4 ${msgClass}`}>
            <p className="text-sm">{message}</p>
          </div>
        )}

        {isValidSession === null && (
          <p className="text-gray-300 text-sm">{t('auth.verifyingResetLink')}</p>
        )}

        {isValidSession === true && (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('auth.newPassword')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder={t('auth.enterNewPassword')}
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('auth.confirmNewPassword')}
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder={t('auth.reenterNewPassword')}
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white rounded-lg transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50"
            >
              {isLoading ? t('auth.updating') : t('auth.updatePassword')}
            </button>
          </form>
        )}

        {isValidSession === false && (
          <div className="mt-6">
            <a
              href="/"
              className="inline-block px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              {t('auth.returnToApp')}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetComplete;
