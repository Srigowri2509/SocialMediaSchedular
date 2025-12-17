import React from 'react';
import { Calendar, LogOut } from 'lucide-react';

export default function Header({ onLogout }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
            <Calendar className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Social Media Scheduler</h1>
            <p className="text-gray-600">Manage all your social accounts</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

