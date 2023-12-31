import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from './components/App';

// Renders the main app component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
