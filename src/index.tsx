import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import vkBridge from '@vkontakte/vk-bridge';
import './index.css';

vkBridge.send('VKWebAppInit');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
