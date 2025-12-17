// Storage polyfill using localStorage
// This provides a window.storage API that the SocialMediaScheduler component expects
if (typeof window !== 'undefined') {
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
        return null;
      }
    },

    set: async (key, value) => {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (error) {
        console.error('Storage set error:', error);
        return false;
      }
    },

    delete: async (key) => {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error('Storage delete error:', error);
        return false;
      }
    }
  };
}

