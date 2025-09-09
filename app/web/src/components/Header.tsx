import React from 'react';
import { Database, LogOut, User as UserIcon} from 'lucide-react';
import {User} from "../types/user";

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-4 lg:px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl shadow-lg">
            <Database className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              DataMentor
            </h1>
            <p className="text-sm text-gray-400">
              Computer Engineering - Database Course
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-700 px-3 py-1.5 rounded-lg border border-gray-600">
              <UserIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-white">
                {user?.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600 text-white">
                Student
              </span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 px-3 py-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;