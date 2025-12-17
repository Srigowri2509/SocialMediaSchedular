import React, { useState, useEffect } from 'react';
import LoginScreen from './components/Login/LoginScreen';
import Header from './components/Header/Header';
import ConnectedAccounts from './components/Accounts/ConnectedAccounts';
import PostForm from './components/Posts/PostForm';
import PostList from './components/Posts/PostList';

export default function SocialMediaScheduler() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState({
    facebook: null,
    instagram: null,
    twitter: null
  });
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    content: '',
    platforms: [],
    scheduledDate: '',
    scheduledTime: '',
    image: null
  });

  useEffect(() => {
    checkAuth();
    loadPosts();
  }, []);

  const checkAuth = async () => {
    try {
      const authResult = await window.storage.get('user-auth');
      const accountsResult = await window.storage.get('connected-accounts');

      if (authResult) {
        setIsAuthenticated(true);
      }
      if (accountsResult) {
        setConnectedAccounts(JSON.parse(accountsResult.value));
      }
    } catch (error) {
      console.log('No authentication found');
    }
  };

  const loadPosts = async () => {
    try {
      const result = await window.storage.get('scheduled-posts');
      if (result) {
        setPosts(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No existing posts');
    }
  };

  const savePosts = async (updatedPosts) => {
    try {
      await window.storage.set('scheduled-posts', JSON.stringify(updatedPosts));
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Failed to save posts', error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await window.storage.set('user-auth', JSON.stringify({ email, loggedIn: true }));
      setIsAuthenticated(true);
      alert('Login successful! Now connect your social media accounts.');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = async () => {
    try {
      await window.storage.delete('user-auth');
      await window.storage.delete('connected-accounts');
      setIsAuthenticated(false);
      setConnectedAccounts({ facebook: null, instagram: null, twitter: null });
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const connectAccount = async (platform) => {
    const mockAccount = {
      platform: platform,
      username: `demo_${platform}_user`,
      accessToken: `mock_token_${Date.now()}`,
      connectedAt: new Date().toISOString()
    };

    alert(`Connecting to ${platform}...\n\nIn production, this would:\n1. Redirect to ${platform} OAuth page\n2. User authorizes the app\n3. Receive access token\n4. Store credentials securely\n\nFor demo purposes, we'll simulate a connection.`);

    const updated = { ...connectedAccounts, [platform]: mockAccount };
    setConnectedAccounts(updated);

    try {
      await window.storage.set('connected-accounts', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save account', error);
    }
  };

  const disconnectAccount = async (platform) => {
    const updated = { ...connectedAccounts, [platform]: null };
    setConnectedAccounts(updated);

    try {
      await window.storage.set('connected-accounts', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to disconnect account', error);
    }
  };

  const handleSubmit = () => {
    if (!formData.content || formData.platforms.length === 0 || !formData.scheduledDate || !formData.scheduledTime) {
      alert('Please fill in all required fields');
      return;
    }

    const newPost = {
      id: editingPost ? editingPost.id : Date.now(),
      ...formData,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    let updatedPosts;
    if (editingPost) {
      updatedPosts = posts.map(p => p.id === editingPost.id ? newPost : p);
    } else {
      updatedPosts = [...posts, newPost];
    }

    savePosts(updatedPosts);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      content: '',
      platforms: [],
      scheduledDate: '',
      scheduledTime: '',
      image: null
    });
    setShowForm(false);
    setEditingPost(null);
  };

  const togglePlatform = (platformId) => {
    if (!connectedAccounts[platformId]) {
      alert(`Please connect your ${platformId} account first!`);
      return;
    }

    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const deletePost = (id) => {
    const updatedPosts = posts.filter(p => p.id !== id);
    savePosts(updatedPosts);
  };

  const editPost = (post) => {
    setEditingPost(post);
    setFormData({
      content: post.content,
      platforms: post.platforms,
      scheduledDate: post.scheduledDate,
      scheduledTime: post.scheduledTime,
      image: post.image
    });
    setShowForm(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const publishPost = async (post) => {
    alert(`Publishing to ${post.platforms.join(', ')}...\n\nUsing connected accounts to publish via APIs.`);

    const updatedPosts = posts.map(p =>
      p.id === post.id ? { ...p, status: 'published' } : p
    );
    savePosts(updatedPosts);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Header onLogout={handleLogout} />

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <ConnectedAccounts
            connectedAccounts={connectedAccounts}
            onConnect={connectAccount}
            onDisconnect={disconnectAccount}
          />

          <PostForm
            showForm={showForm}
            formData={formData}
            editingPost={editingPost}
            connectedAccounts={connectedAccounts}
            onToggleForm={() => setShowForm(!showForm)}
            onTogglePlatform={togglePlatform}
            onFormDataChange={setFormData}
            onImageUpload={handleImageUpload}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        </div>

        <PostList
          posts={posts}
          onEdit={editPost}
          onDelete={deletePost}
          onPublish={publishPost}
        />
      </div>
    </div>
  );
}
