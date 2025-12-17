import React from 'react';
import { Send, Edit, Trash2, Clock, CheckCircle } from 'lucide-react';
import { platforms } from '../Accounts/ConnectedAccounts';

export default function PostCard({ post, onEdit, onDelete, onPublish }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2">
          {post.platforms.map(platformId => {
            const platform = platforms.find(p => p.id === platformId);
            const Icon = platform.icon;
            return (
              <div key={platformId} className={`${platform.color} text-white p-2 rounded-lg`}>
                <Icon size={16} />
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          {post.status === 'scheduled' && (
            <>
              <button
                onClick={() => onPublish(post)}
                className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition-all"
                title="Publish Now"
              >
                <Send size={18} />
              </button>
              <button
                onClick={() => onEdit(post)}
                className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all"
                title="Edit"
              >
                <Edit size={18} />
              </button>
            </>
          )}
          <button
            onClick={() => onDelete(post.id)}
            className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="text-gray-800 mb-3 whitespace-pre-wrap">{post.content}</p>

      {post.image && (
        <img src={post.image} alt="Post" className="max-h-48 rounded-lg mb-3" />
      )}

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Clock size={16} />
          {new Date(`${post.scheduledDate}T${post.scheduledTime}`).toLocaleString()}
        </div>
        {post.status === 'published' && (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle size={16} />
            Published
          </div>
        )}
      </div>
    </div>
  );
}

