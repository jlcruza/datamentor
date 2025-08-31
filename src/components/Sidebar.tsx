import React from 'react';
import { BookOpen, Database, MessageCircle, ChevronRight, TrendingUp } from 'lucide-react';
import { ProgressManager } from '../types/progress';
import type { Lesson } from '../App';

type ActiveSection = 'learn' | 'practice' | 'chat';

interface SidebarProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
  lessons: Lesson[];
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, lessons }) => {
  const categories = [...new Set(lessons.map(lesson => lesson.category))];
  
  const getCategoryProgress = (category: string) => {
    const categoryLessons = lessons.filter(lesson => lesson.category === category);
    const completedCount = categoryLessons.filter(lesson => 
      ProgressManager.isLessonComplete(lesson.id)
    ).length;
    
    return {
      completed: completedCount,
      total: categoryLessons.length,
      percentage: categoryLessons.length > 0 ? Math.round((completedCount / categoryLessons.length) * 100) : 0
    };
  };

  const menuItems = [
    { id: 'learn' as ActiveSection, label: 'Learning Materials', icon: BookOpen, available: true },
    { id: 'practice' as ActiveSection, label: 'Query Practice', icon: Database, available: true },
    { id: 'chat' as ActiveSection, label: 'AI Assistant', icon: MessageCircle, available: true },
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 lg:w-72 bg-gray-800 border-r border-gray-700 overflow-y-auto">
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
                      : 'text-gray-300 hover:text-purple-300'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-purple-400'
                  }`} />
                  <span className="font-medium flex-1">{item.label}</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${
                    isActive ? 'text-white rotate-90' : 'text-gray-400'
                  }`} />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Progress Overview */}
      <div className="p-4 border-t border-gray-700">
        <div className="mb-4">
          <h3 className="font-semibold text-white mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-purple-400" />
            Learning Progress
          </h3>
          
          <div className="space-y-3">
            {categories.map(category => {
              const progress = getCategoryProgress(category);
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300 font-medium">{category}</span>
                    <span className="text-xs text-gray-400">
                      {progress.completed}/{progress.total}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 text-right">
                    {progress.percentage}% complete
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4">
        <div className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 p-4 rounded-xl border border-purple-500/30">
          <h3 className="font-semibold text-white mb-2">Quick Tip</h3>
          <p className="text-sm text-gray-300">
            Use the Query Practice section to test your SQL skills with our sample database. 
            The AI Assistant is here to help if you get stuck!
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;