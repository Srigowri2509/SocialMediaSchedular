import React from 'react';
import { Calendar } from 'lucide-react';
import LoginForm from './LoginForm';

export default function LoginScreen({ onLogin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to manage your social media</p>
        </div>

        <LoginForm onLogin={onLogin} />

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 mb-2"><strong>Demo Login:</strong></p>
          <p className="text-xs text-blue-700">Enter any email and password to login (demo mode)</p>
          <p className="text-xs text-blue-700 mt-2">In production, this would use secure authentication like OAuth 2.0, Firebase Auth, or Auth0</p>
        </div>
      </div>
    </div>
  );
}

