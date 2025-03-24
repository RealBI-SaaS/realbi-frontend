import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "antd/dist/reset.css"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="gradient container  min-h-screen min-w-screen grid grid-cols-1 justify-center border-2 border-red-800">
      <App />
    </div>
  </StrictMode>,
)
