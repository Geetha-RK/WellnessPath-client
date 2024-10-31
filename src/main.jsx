import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from './context/AppContext.jsx';
import './index.css';
console.log("env:",import.meta.env.VITE_API_URL);
console.log("env-process:",process.env.VITE_API_URL);


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AppContextProvider>
          <App />
      </AppContextProvider>
    </BrowserRouter>
)
