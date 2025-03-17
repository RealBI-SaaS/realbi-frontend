import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';




const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', formData);
      // Handle successful login here (e.g., store token, redirect)
      console.log('Login successful:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    // Create a CSRF token and store it locally
    const state = crypto.randomUUID(16).toString("hex");
    localStorage.setItem("latestCSRFToken", state);
        
    // Redirect the user to Google OAuth
    // const redirectUri = `${window.location.origin}/integrations/google/oauth2/callback`;
    // const redirectUri = `${window.location.origin}/oauth2/callback`;
    // console.log(redirectUri);
    // const redirectUri = 'http://localhost:5173/oauth/callback';
    const redirectUri = 'http://localhost:8000/auth/google/oauth2/callback/';
    const scope = "email profile";
    
    const link = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${client_id}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(scope)}` +
      `&state=${state}` +
      `&access_type=offline` +
      `&prompt=consent`;

    console.log(link);
    // Redirect to Google OAuth
    window.location.href = link;
  };

  return (
    <div className="signin-container rounded-md p-4 flex flex-col gap-4 items-center">
      <p className="text-2xl font-bold">Login</p>
      <button 
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="google-btn w-full border border-black rounded-md p-2 flex flex-row items-center justify-center gap-2 hover:bg-gray-50 disabled:opacity-50"
      >
        <FcGoogle size={32} />
        Sign in with Google
      </button>
      <div className="or-txt">
        <span>or</span>
      </div>
      <div className="signin-container rounded-md py-4 bg-gray-100 w-100">
        <form onSubmit={handleSubmit} className="signin-form rounded-md flex flex-col gap-4">
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@gmail.com"
              className="form-input border border-black rounded-sm p-2 w-full mx-0"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="form-input border border-black rounded-sm p-2 w-full"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="signin-btn mt-4 w-full border border-black rounded-sm p-2 text-white flex flex-row items-center gap-2 justify-center hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <a href="#" className="text-sm mt-2 text-muted hover:underline">Forgot password?</a>
      </div>
    </div>
  );
};

export default Login;