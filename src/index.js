import React from 'react';
import ReactDOM from 'react-dom/client';


import App from './pages/App';
import reportWebVitals from './reportWebVitals';

// assets
import "./assets/styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

reportWebVitals();
