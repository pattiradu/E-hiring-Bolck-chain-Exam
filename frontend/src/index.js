import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';          // ✅ Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';     // ✅ Optional: Bootstrap JS (for modals, dropdowns, etc.)
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
