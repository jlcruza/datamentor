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
import { fetchAIUsage } from './services/AIUsageService.ts';
import { AIQuotaInfoDto } from "./services/dto/aiQuotaInfoDto.ts";

type ActiveSection = 'learn' | 'practice' | 'chat';

function App() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<ActiveSection>('learn');
  const { user, initializing, handleLogin, handleLogout: signOut } = useSupabaseAuth();
  const [lessons, setLessons] = useState<LearningContentDto[]>([]);
  const [aiQuota, setAiQuota] = useState<AIQuotaInfoDto | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Load AI quota when user is available
  useEffect(() => {
    if (!user) {
      setAiQuota(null);
      return;
    }

    let isMounted = true;

    (async () => {
      const quota = await fetchAIUsage();
      if (isMounted) {
          console.log("Setting quota:", quota)
        setAiQuota(quota);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Function to refresh quota (can be called from child components)
  const refreshQuota = async () => {
    if (!user) return;
    const quota = await fetchAIUsage();
      console.log("Setting quota:", quota)
    setAiQuota(quota);
  };

  // Wrap logout to also reset the active section (UI concern)
  const handleLogout = async () => {
    await signOut();
    setActiveSection('learn');
  };

  // While we check for an existing session, render a minimal shell (optional UX)
  if (initializing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-gray-700 dark:text-gray-300">{t('common.loading')}</div>
      </div>
    );
  }

  // If no user is logged in, show login page (email+password only)
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <LoginModal
          onLogin={handleLogin}
          onClose={() => {}}
          isRequired={true}
        />
      </div>
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'learn':
        return <LearningContent lessons={lessons} onLessonsSet={setLessons} user={user} aiQuota={aiQuota} onRefreshQuota={refreshQuota} />;
      case 'practice':
        return <QueryPractice />;
      case 'chat':
        return <AIAssistant aiQuota={aiQuota} onRefreshQuota={refreshQuota} />;
      default:
        return <LearningContent lessons={lessons} onLessonsSet={setLessons} user={user} aiQuota={aiQuota} onRefreshQuota={refreshQuota} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header
        user={user}
        onLogout={handleLogout}
        aiQuota={aiQuota}
        onMenuClick={() => setMobileMenuOpen(true)}
      />

      <div className="flex flex-1">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          lessons={lessons}
          aiQuota={aiQuota}
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
        />

        <main className="flex-1 p-4 lg:p-6 md:ml-64 lg:ml-72 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;