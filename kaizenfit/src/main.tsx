import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthContext' // Import the provider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Wrap the App component so everyone can receive the "signal" */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)