import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
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
      const endpoint = isSignUp ? 'http://localhost:8000/auth/create-user/' : 'http://localhost:8000/auth/jwt/token/';
      
      const response = await axios.post(endpoint, 
        {
          email: formData.email,
          password: formData.password,
          ...(isSignUp && {
            first_name: formData.first_name,
            last_name: formData.last_name
          })
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': localStorage.getItem('latestCSRFToken') || ''
          }
        }
      );
      console.log(response);
      if (response.data.access || response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token || response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh_token || response.data.refresh);
        window.location.href = '/home';
      } else {
        setError('Invalid response from server');
      }

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

    // Redirect to Google OAuth
    window.location.href = link;
  };

  return (
    <div className="signin-container rounded-md p-4 flex flex-col gap-4 items-center">
      <p className="text-2xl font-bold">{isSignUp ? 'Sign Up' : 'Login'}</p>
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
          {isSignUp && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="form-input border border-black rounded-sm p-2 w-full mx-0"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="form-input border border-black rounded-sm p-2 w-full mx-0"
                  required
                />
              </div>
            </>
          )}
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
          
          {error && <p className="text-red-100 text-sm">{error}</p>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="signin-btn mt-4 w-full border border-black rounded-sm p-2 text-white flex flex-row items-center gap-2 justify-center hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? (isSignUp ? 'Signing up...' : 'Signing in...') : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>
        {!isSignUp && <a href="#" className="text-sm mt-2 text-muted hover:underline">Forgot password?</a>}
      </div>
      <div className="">
        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm mt-2 text-muted hover:underline"
        >
          {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
};

export default Login;