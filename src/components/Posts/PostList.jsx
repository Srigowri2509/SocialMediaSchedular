import React from 'react';
import { Calendar } from 'lucide-react';
import PostCard from './PostCard';

export default function PostList({ posts, onEdit, onDelete, onPublish }) {
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(`${a.scheduledDate}T${a.scheduledTime}`);
    const dateB = new Date(`${b.scheduledDate}T${b.scheduledTime}`);
    return dateA - dateB;
  });

  if (sortedPosts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Scheduled Posts (0)</h2>
        <div className="text-center py-12 text-gray-500">
          <Calendar size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">No scheduled posts yet</p>
          <p className="text-sm">Create your first post to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Scheduled Posts ({posts.length})</h2>
      <div className="space-y-4">
        {sortedPosts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
            onPublish={onPublish}
          />
        ))}
      </div>
    </div>
  );
}

