import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import TDMBService from './components/services/TDMBService';

const root = ReactDOM.createRoot(document.getElementById('root'));

const tDMBService = new TDMBService()

tDMBService.createSession().then(res => console.log(res))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

