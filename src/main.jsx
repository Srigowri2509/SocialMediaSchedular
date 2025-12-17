import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './storage.js'
import './index.css'
import App from './App.jsx'

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p>{this.state.error?.toString()}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Ensure root element exists before rendering
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h1>Root element not found</h1>
      <p>Cannot find #root element in the DOM</p>
    </div>
  `;
} else {
  try {
    console.log('Initializing React app...');
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
    console.log('React app initialized successfully');
  } catch (error) {
    console.error('Failed to render app:', error);
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
          <h1>Failed to load application</h1>
          <p style="color: red;">${error.message}</p>
          <pre style="text-align: left; background: #f5f5f5; padding: 10px; border-radius: 4px;">${error.stack}</pre>
          <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">Reload Page</button>
        </div>
      `;
    }
  }
}
