import React from 'react';
import { useTranslation } from 'react-i18next';
import { LogOut, User as UserIcon, Menu} from 'lucide-react';
import {User} from "../types/user";
import ThemeToggle from './ThemeToggle';
import AIQuotaIndicator from './AIQuotaIndicator';
import logo from '../images/logo.png';
import smallLogo from '../images/small.png';
import {AIQuotaInfoDto} from "../services/dto/aiQuotaInfoDto.ts";

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  aiQuota?: AIQuotaInfoDto | null;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, aiQuota, onMenuClick }) => {
  const { t } = useTranslation();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4 shadow-lg relative z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <img
            src={logo}
            alt="DataMentor Logo"
            className="h-10 w-auto hidden sm:block"
          />
          <img
            src={smallLogo}
            alt="DataMentor"
            className="h-10 w-auto sm:hidden"
          />
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <ThemeToggle />
          {user && <AIQuotaIndicator quota={aiQuota ?? null} className="hidden md:flex" />}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-2 sm:px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600">
              <UserIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white max-w-[80px] sm:max-w-none truncate">
                {user?.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600 text-white">
                {t('header.student')}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">{t('header.logout')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;