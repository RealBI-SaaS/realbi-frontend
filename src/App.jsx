import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Login from './components/login'
import Home from './components/home'
import Nav from './components/Nav'
import Account from './components/Account'
import Logout from './components/logout'
import './index.css'
import { useUser } from './context/UserContext';
import CreateCompany from './components/CreateCompany';
import ManageAll from './components/ManageAll';
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
        <Nav />
        <div className="mt-20 w-full border-2 border-red-800  mx-auto ">
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
              path="/manage-all" 
              element={
                <ProtectedRoute>
                  <ManageAll />
                </ProtectedRoute>
              } 
            />
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
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
