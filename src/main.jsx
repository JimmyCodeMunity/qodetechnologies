import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { UserAuthProvider } from './context/UserAuthContext'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserAuthProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#171717',
                border: '1px solid #262626',
                color: '#fff',
              },
            }}
          />
        </UserAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
