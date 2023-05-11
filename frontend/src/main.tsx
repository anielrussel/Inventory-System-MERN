import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import InventoryContextProvider from './context/InventoryContext.tsx'
import AuthContextProvider from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <InventoryContextProvider>
        <App />
      </InventoryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
