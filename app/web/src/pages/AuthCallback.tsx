import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient.ts';

// Handles redirects from Supabase after email confirmation.
// Behavior notes:
// - If the link grants a session (depends on your Supabase settings), user will be signed in.
// - If not, we simply inform the user that their email is confirmed and they can log in.
// - This page intentionally does not expose any secrets and just uses the client anon key.
const AuthCallback: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'info' | 'error'>('loading');
  const [message, setMessage] = useState('Completing email confirmation...');

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        // Supabase may include details in URL hash or query. We mainly use session presence to decide UX.
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
        const queryParams = new URLSearchParams(window.location.search);
        const type = hashParams.get('type') ?? queryParams.get('type') ?? '';

        // If the link was a recovery link, forward user to the reset page (defensive).
        if (type === 'recovery') {
          window.location.replace('/auth/reset-complete');
          return;
        }

        const { data } = await supabase.auth.getSession();
        const session = data.session;

        if (!mounted) return;

        if (session?.user) {
          setStatus('success');
          setMessage('Your email has been confirmed. Redirecting to app...');
          // Allow a short pause for UX, then go to app
          setTimeout(() => {
            window.location.replace('/');
          }, 1200);
        } else {
          // No session was created by the confirmation link (common when email confirmation is enabled)
          setStatus('info');
          setMessage('Email confirmed. You can now log in to your account.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Could not complete email confirmation. Please try logging in.');
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, []);

  const baseClasses = 'min-h-screen bg-gray-900 flex items-center justify-center p-4';
  const panelClasses =
    'bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-gray-700 p-6 text-center';
  const statusClass =
    status === 'success'
      ? 'text-green-400'
      : status === 'error'
      ? 'text-red-400'
      : 'text-gray-300';

  return (
    <div className={baseClasses}>
      <div className={panelClasses}>
        <h1 className="text-xl font-semibold text-white mb-2">Email Confirmation</h1>
        <p className={`text-sm ${statusClass}`}>{message}</p>
        {status !== 'loading' && (
          <div className="mt-6">
            <a
              href="/"
              className="inline-block px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              Go to App
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
