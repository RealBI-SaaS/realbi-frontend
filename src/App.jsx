import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Home from './components/home'
import Account from './components/account'
import Logout from './components/logout'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  )
}

export default App
