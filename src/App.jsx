import React, { useState, useEffect } from 'react';

import { Calendar, Facebook, Instagram, Twitter, Clock, Image, Send, Trash2, Edit, Plus, CheckCircle, LogOut, User, Key } from 'lucide-react';



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

    // Simulate authentication

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

    // In production, this would redirect to OAuth flow

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



  const platforms = [

    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },

    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-600' },

    { id: 'twitter', name: 'Twitter (X)', icon: Twitter, color: 'bg-sky-500' }

  ];



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



  const sortedPosts = [...posts].sort((a, b) => {

    const dateA = new Date(`${a.scheduledDate}T${a.scheduledTime}`);

    const dateB = new Date(`${b.scheduledDate}T${b.scheduledTime}`);

    return dateA - dateB;

  });



  // Login Screen

  if (!isAuthenticated) {

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



          <LoginForm onLogin={handleLogin} />



          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">

            <p className="text-sm text-blue-800 mb-2"><strong>Demo Login:</strong></p>

            <p className="text-xs text-blue-700">Enter any email and password to login (demo mode)</p>

            <p className="text-xs text-blue-700 mt-2">In production, this would use secure authentication like OAuth 2.0, Firebase Auth, or Auth0</p>

          </div>

        </div>

      </div>

    );

  }



  // Main App

  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

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

              onClick={handleLogout}

              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"

            >

              <LogOut size={18} />

              Logout

            </button>

          </div>



          {/* Connected Accounts */}

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

                          onClick={() => disconnectAccount(platform.id)}

                          className="text-sm text-red-600 hover:text-red-700"

                        >

                          Disconnect

                        </button>

                      </div>

                    ) : (

                      <button

                        onClick={() => connectAccount(platform.id)}

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



          {/* New Post Button */}

          <div className="border-t pt-6 mt-6">

            <button

              onClick={() => setShowForm(!showForm)}

              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"

            >

              <Plus size={20} />

              New Post

            </button>

          </div>



          {showForm && (

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

                        onClick={() => togglePlatform(platform.id)}

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

                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}

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

                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}

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

                    onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}

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

                  onChange={handleImageUpload}

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

                  onClick={handleSubmit}

                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"

                >

                  <Send size={18} />

                  {editingPost ? 'Update Post' : 'Schedule Post'}

                </button>

                <button

                  onClick={resetForm}

                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"

                >

                  Cancel

                </button>

              </div>

            </div>

          )}

        </div>



        {/* Scheduled Posts */}

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Scheduled Posts ({posts.length})</h2>

          

          {sortedPosts.length === 0 ? (

            <div className="text-center py-12 text-gray-500">

              <Calendar size={48} className="mx-auto mb-4 opacity-50" />

              <p className="text-lg">No scheduled posts yet</p>

              <p className="text-sm">Create your first post to get started</p>

            </div>

          ) : (

            <div className="space-y-4">

              {sortedPosts.map(post => (

                <div key={post.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">

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

                            onClick={() => publishPost(post)}

                            className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition-all"

                            title="Publish Now"

                          >

                            <Send size={18} />

                          </button>

                          <button

                            onClick={() => editPost(post)}

                            className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all"

                            title="Edit"

                          >

                            <Edit size={18} />

                          </button>

                        </>

                      )}

                      <button

                        onClick={() => deletePost(post.id)}

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

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}



function LoginForm({ onLogin }) {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');



  const handleSubmit = () => {

    if (!email || !password) {

      alert('Please enter both email and password');

      return;

    }

    onLogin(email, password);

  };



  return (

    <div className="space-y-4">

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">

          Email Address

        </label>

        <div className="relative">

          <User className="absolute left-3 top-3 text-gray-400" size={20} />

          <input

            type="email"

            value={email}

            onChange={(e) => setEmail(e.target.value)}

            placeholder="your@email.com"

            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"

          />

        </div>

      </div>



      <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">

          Password

        </label>

        <div className="relative">

          <Key className="absolute left-3 top-3 text-gray-400" size={20} />

          <input

            type="password"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

            placeholder="••••••••"

            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"

          />

        </div>

      </div>



      <button

        onClick={handleSubmit}

        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"

      >

        Sign In

      </button>

    </div>

  );

}
