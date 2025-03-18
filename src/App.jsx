import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Home from './components/home'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
