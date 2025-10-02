import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Check from './check.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Check/>
  </React.StrictMode>
);
