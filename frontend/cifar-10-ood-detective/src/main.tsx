import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);  // Use createRoot instead of render
root.render(
  <BrowserRouter>  {/* Wrap your App with BrowserRouter */}
    <App />
  </BrowserRouter>
);
