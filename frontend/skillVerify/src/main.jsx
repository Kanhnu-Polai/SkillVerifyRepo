// main.jsx (or index.jsx)

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from './redux/store';           // ✅ redux store

import './index.css';                        // tailwind (or global) styles

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    
  </StrictMode>
);