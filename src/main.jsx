import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="gradient container w-screen min-h-screen min-w-screen flex justify-center items-center">
      <App />
    </div>
  </StrictMode>,
)
