import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import LearningContent from './features/LearningContent.tsx';
import QueryPractice from './features/QueryPractice.tsx';
import AIAssistant from './features/AIAssistant.tsx';
import LoginModal from './components/LoginModal.tsx';
import {LearningContentDto} from './repository/db_types/learningContentDto.ts';
import {LearningContentService} from './services/LearningContentService.ts';
import useSupabaseAuth from './hooks/useSupabaseAuth.ts';

export interface ChatMessage {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

type ActiveSection = 'learn' | 'practice' | 'chat';

function App() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<ActiveSection>('learn');
  const { user, initializing, handleLogin, handleLogout: signOut } = useSupabaseAuth();
  const [lessons, setLessons] = useState<LearningContentDto[]>([]);

  // Load lessons on mount; service already handles errors and returns []
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const data = await LearningContentService.getAllLearningContent();
      if (isMounted) setLessons(data);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Wrap logout to also reset the active section (UI concern)
  const handleLogout = async () => {
    await signOut();
    setActiveSection('learn');
  };

  // While we check for an existing session, render a minimal shell (optional UX)
  if (initializing) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-gray-300">{t('common.loading')}</div>
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
        return <LearningContent lessons={lessons} user={user}/>;
      case 'practice':
        return <QueryPractice />;
      case 'chat':
        return <AIAssistant />;
      default:
        return <LearningContent lessons={lessons} user={user}/>;
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
        
        <main className="flex-1 p-4 lg:p-6 md:ml-64 lg:ml-72 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;