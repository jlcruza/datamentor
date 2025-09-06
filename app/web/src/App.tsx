import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import LearningContent from './features/LearningContent.tsx';
import QueryPractice from './features/QueryPractice.tsx';
import AIAssistant from './features/AIAssistant.tsx';
import LoginModal from './components/LoginModal.tsx';
import { mockLessons } from './data/mockData.ts';
import { supabase } from './lib/supabaseClient.ts';

export type User = {
  id: string;
  email: string;
  name: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
};

export interface ChatMessage {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

type ActiveSection = 'learn' | 'practice' | 'chat';

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('learn');
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true); // Avoid flicker while checking existing session
  const lessons = mockLessons; // Built-in lessons

  // Map Supabase user to the app's User type
  const mapSupabaseUser = (supabaseUser: any): User => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email ?? '',
      // Prefer full_name stored at sign up; fallback to email
      name: supabaseUser.user_metadata?.full_name ?? supabaseUser.email ?? 'User',
    };
  };

  useEffect(() => {
    let isMounted = true;

    // 1) Check if there is already an active session on load
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

    // 2) Subscribe to auth state changes (sign in/out, token refresh, etc.)
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

  // Called by LoginModal after it completes a Supabase sign in
  const handleLogin = async () => {
    // Read current user from Supabase and update local state
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUser(mapSupabaseUser(data.user));
    }
  };

  const handleLogout = async () => {
    // Sign out from Supabase and clear local state
    await supabase.auth.signOut();
    setUser(null);
    setActiveSection('learn');
  };

  // While we check for an existing session, render a minimal shell (optional UX)
  if (initializing) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-gray-300">Loading...</div>
      </div>
    );
  }

  // If no user is logged in, show login page (email+password only)
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <LoginModal 
          onLogin={handleLogin}
          onClose={() => {}} // No close option since login is required
          isRequired={true}
        />
      </div>
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'learn':
        return <LearningContent lessons={lessons} />;
      case 'practice':
        return <QueryPractice />;
      case 'chat':
        return <AIAssistant />;
      default:
        return <LearningContent lessons={lessons} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header 
        user={user} 
        onLogout={handleLogout} 
      />
      
      <div className="flex flex-1">
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          lessons={lessons}
        />
        
        <main className="flex-1 p-4 lg:p-6 ml-64 lg:ml-72 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;