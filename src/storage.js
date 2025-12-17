// Storage polyfill using localStorage
// This provides a window.storage API that the SocialMediaScheduler component expects
window.storage = {
  get: async (key) => {
    try {
      const value = localStorage.getItem(key);
      if (value === null) {
        return null;
      }
      return { value };
    } catch (error) {
      console.error('Storage get error:', error);
      throw error;
    }
  },

  set: async (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      throw error;
    }
  },

  delete: async (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage delete error:', error);
      throw error;
    }
  }
};

