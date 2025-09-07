import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient.ts';
import { User } from '../types/user.ts';

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  const mapSupabaseUser = (supabaseUser: any): User => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email ?? '',
      name: supabaseUser.user_metadata?.full_name ?? supabaseUser.email ?? 'User',
    };
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!isMounted) return;

      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      } else {
        setUser(null);
      }
      setInitializing(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      } else {
        setUser(null);
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUser(mapSupabaseUser(data.user));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return {
    user,
    initializing,
    handleLogin,
    handleLogout,
  };
}

export default useSupabaseAuth;
