import React from 'react';
import { Facebook, Instagram, Twitter, CheckCircle } from 'lucide-react';

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-600' },
  { id: 'twitter', name: 'Twitter (X)', icon: Twitter, color: 'bg-sky-500' }
];

export default function ConnectedAccounts({ connectedAccounts, onConnect, onDisconnect }) {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Connected Accounts</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map(platform => {
          const Icon = platform.icon;
          const isConnected = connectedAccounts[platform.id];

          return (
            <div key={platform.id} className={`border-2 rounded-lg p-4 ${isConnected ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`${platform.color} p-2 rounded-lg`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <span className="font-semibold">{platform.name}</span>
                </div>
                {isConnected && (
                  <CheckCircle className="text-green-600" size={20} />
                )}
              </div>

              {isConnected ? (
                <div>
                  <p className="text-sm text-gray-600 mb-2">@{isConnected.username}</p>
                  <button
                    onClick={() => onDisconnect(platform.id)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onConnect(platform.id)}
                  className="w-full mt-2 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-all"
                >
                  Connect Account
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { platforms };

