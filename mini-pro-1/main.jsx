import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './mini-pro-react';
import { BrowserRouter } from 'react-router';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
