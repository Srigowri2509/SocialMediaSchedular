import React from 'react';
import { Send, Plus } from 'lucide-react';
import { platforms } from '../Accounts/ConnectedAccounts';

export default function PostForm({
  showForm,
  formData,
  editingPost,
  connectedAccounts,
  onToggleForm,
  onTogglePlatform,
  onFormDataChange,
  onImageUpload,
  onSubmit,
  onCancel
}) {
  if (!showForm) {
    return (
      <div className="border-t pt-6 mt-6">
        <button
          onClick={onToggleForm}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          New Post
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">
        {editingPost ? 'Edit Post' : 'Create New Post'}
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Platforms *
        </label>
        <div className="flex gap-3 flex-wrap">
          {platforms.map(platform => {
            const Icon = platform.icon;
            const isConnected = connectedAccounts[platform.id];

            return (
              <button
                key={platform.id}
                type="button"
                onClick={() => onTogglePlatform(platform.id)}
                disabled={!isConnected}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  !isConnected
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : formData.platforms.includes(platform.id)
                    ? `${platform.color} text-white shadow-md`
                    : 'bg-white border-2 border-gray-300 text-gray-700'
                }`}
              >
                <Icon size={18} />
                {platform.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Post Content *
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => onFormDataChange({ ...formData, content: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows="4"
          placeholder="What do you want to share?"
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {formData.content.length} characters
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
          <input
            type="date"
            value={formData.scheduledDate}
            onChange={(e) => onFormDataChange({ ...formData, scheduledDate: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time *
          </label>
          <input
            type="time"
            value={formData.scheduledTime}
            onChange={(e) => onFormDataChange({ ...formData, scheduledTime: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Image (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        {formData.image && (
          <div className="mt-3">
            <img src={formData.image} alt="Preview" className="max-h-40 rounded-lg" />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onSubmit}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
        >
          <Send size={18} />
          {editingPost ? 'Update Post' : 'Schedule Post'}
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

