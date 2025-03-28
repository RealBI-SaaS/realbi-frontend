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
import VerifyEmail from './components/auth/VerifyEmail'
import AskEmailVerificatioin from './components/auth/AskEmailVerification'
import AskForPasswordReset from './components/auth/AskForPasswordReset'
import ResetPassword from './components/auth/ResetPassword'
import ManageAll from './components/ManageAll'
import OrganizationDetails from './components/org/OrganizationDetails'
import AcceptInvitation from './components/org/AcceptInvitation'

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
      <Router className="grid grid-cols-1">
        <Nav />
        <div className="w-full  bg-gray-300 grid grid-cols-1 border-red-800  mx-auto ">
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
            <Route path="/manage-all" element={<ManageAll />} />
            <Route path="/create-company" element={<ProtectedRoute><CreateCompany /></ProtectedRoute>} />
            <Route  path="/activate/:uid/:token" element={<VerifyEmail />} />
            <Route  path="/ask-email-verification" element={<AskEmailVerificatioin />} />
            <Route  path="/reset-password" element={<AskForPasswordReset />} />
            <Route  path="/password/reset/confirm/:uid/:token" element={<ResetPassword />} />
            <Route path="/organizations/:id" element={<OrganizationDetails />} />
            <Route path="/accept-invitation/:token" element={<AcceptInvitation />} />

          </Routes>
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
