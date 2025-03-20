import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Login from './components/login'
import Home from './components/Home'
import Account from './components/account'
import Logout from './components/logout'
import './index.css'
import { useUser } from './context/UserContext';
import CreateCompany from './components/create_company';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/home" 
            element={
                <Home />
            } 
          />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route 
            path="/account" 
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } 
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/create-company" element={<ProtectedRoute><CreateCompany /></ProtectedRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
