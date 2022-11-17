import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 1000,
});

import App from './templates/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
