import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// ✅ Register Service Worker (FINAL FIX)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(process.env.PUBLIC_URL + '/service-worker.js')
      .then((reg) => {
        console.log('SW registered:', reg);
      })
      .catch((err) => {
        console.log('SW registration failed:', err);
      });
  });
}