import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, Transition } from '@headlessui/react';
import { BookOpen, Database, MessageCircle, ChevronRight, TrendingUp } from 'lucide-react';
import {LearningContentDto} from "../repository/db_types/learningContentDto.ts";
import AIQuotaProgress from './AIQuotaProgress';
import {AIQuotaInfoDto} from "../services/dto/aiQuotaInfoDto.ts";

type ActiveSection = 'learn' | 'practice' | 'chat';

interface SidebarProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
  lessons: LearningContentDto[];
  aiQuota?: AIQuotaInfoDto | null;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, lessons, aiQuota }) => {
    const { t } = useTranslation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const categories = [
        ...new Map(
            lessons
                .sort((a, b) => a.module_id - b.module_id) // sort by module_id ascending
                .map((lesson) => [lesson.module_id, lesson.module_name]) // create [id, name] pairs
        ).values() // extract only the names
    ];
  const getCategoryProgress = (category: string) => {
    const categoryLessons = lessons.filter(lesson => lesson.module_name === category);
    const completedCount = categoryLessons.filter(lesson => 
      lesson.completed
    ).length;

    return {
      completed: completedCount,
      total: categoryLessons.length,
      percentage: categoryLessons.length > 0 ? Math.round((completedCount / categoryLessons.length) * 100) : 0
    };
  };

  const menuItems = [
    { id: 'learn' as ActiveSection, label: t('sidebar.learningMaterials'), icon: BookOpen, available: true },
    { id: 'practice' as ActiveSection, label: t('sidebar.queryPractice'), icon: Database, available: true },
    { id: 'chat' as ActiveSection, label: t('sidebar.aiAssistant'), icon: MessageCircle, available: true },
  ];

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 shadow-lg"
        aria-label="Open menu"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Headless UI Dialog for mobile */}
      <Transition.Root show={mobileOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={setMobileOpen}>
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative max-w-xs w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl overflow-y-auto">
                <div className="p-4 flex items-center justify-between">
                  <div className="font-semibold text-gray-900 dark:text-white">{t('common.menu', 'Menu')}</div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1 rounded text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav className="p-4">
                  <ul className="space-y-2">
                    {menuItems.map((item) => {
                      const isActive = activeSection === item.id;
                      const Icon = item.icon;

                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              onSectionChange(item.id);
                              setMobileOpen(false);
                            }}
                            className={`sidebar-item ${
                              isActive
                                ? 'active'
                                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-300'
                            }`}
                          >
                            <Icon className={`h-5 w-5 ${
                              isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-purple-400'
                            }`} />
                            <span className="font-medium flex-1 ml-2">{item.label}</span>
                            <ChevronRight className={`h-4 w-4 transition-transform ${
                              isActive ? 'text-white rotate-90' : 'text-gray-600 dark:text-gray-400'
                            }`} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* AI Usage on Mobile */}
                {aiQuota && (
                  <div className="px-4 pb-4">
                    <AIQuotaProgress quota={aiQuota} />
                  </div>
                )}

                {/* Progress Overview */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-blue-600 dark:text-purple-400" />
                      {t('sidebar.learningProgress')}
                    </h3>

                    <div className="space-y-3">
                      {categories.map(category => {
                        const progress = getCategoryProgress(category);
                        return (
                          <div key={category} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{category}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {progress.completed}/{progress.total}
                              </span>
                            </div>
                            <div className="progress-bar">
                              <div 
                                className="progress-fill"
                                style={{ width: `${progress.percentage}%` }}
                              />
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-500 text-right">
                              {progress.percentage}% {t('sidebar.complete')}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-purple-900/50 dark:to-cyan-900/50 p-4 rounded-xl border border-blue-200 dark:border-purple-500/30">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('sidebar.quickTip')}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {t('sidebar.quickTipText')}
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>

            {/* Clicking the rest of the area closes the dialog (Dialog already handles overlay clicks) */}
            <div className="flex-1" aria-hidden="true" />
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop / md+ sidebar */}
      <aside className="hidden md:block md:fixed md:left-0 md:top-16 md:h-[calc(100vh-4rem)] md:w-64 lg:w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => onSectionChange(item.id)}
                    className={`sidebar-item ${
                      isActive
                        ? 'active'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-300'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${
                      isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-purple-400'
                    }`} />
                    <span className="font-medium flex-1">{item.label}</span>
                    <ChevronRight className={`h-4 w-4 transition-transform ${
                      isActive ? 'text-white rotate-90' : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Progress Overview */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-blue-600 dark:text-purple-400" />
              {t('sidebar.learningProgress')}
            </h3>

            <div className="space-y-3">
              {categories.map(category => {
                const progress = getCategoryProgress(category);
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{category}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {progress.completed}/{progress.total}
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-500 text-right">
                      {progress.percentage}% {t('sidebar.complete')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-purple-900/50 dark:to-cyan-900/50 p-4 rounded-xl border border-blue-200 dark:border-purple-500/30">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('sidebar.quickTip')}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t('sidebar.quickTipText')}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;