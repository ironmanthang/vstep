import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import './index.css';
import { initPwaLifecycle } from './services/pwa/registerServiceWorker';

// Initialize PWA lifecycle, guaranteed 1-refresh updates, and dynamic preload error healing
initPwaLifecycle();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
