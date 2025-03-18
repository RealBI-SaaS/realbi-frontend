import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

// Create User Context
const UserContext = createContext(null);

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch user data from backend
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/user/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      console.error('Error fetching user data:', err);
      throw err;
    }
  };

  // Function to refresh token
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/jwt/refresh/`, {
        refresh: refreshToken
      });

      const newAccessToken = response.data.access;
      localStorage.setItem('access_token', newAccessToken);
      return newAccessToken;
    } catch (err) {
      console.error('Error refreshing token:', err);
      throw err;
    }
  };

  // Load user from token on first load
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          try {
            const userData = await fetchUserData(accessToken);
            setUser(userData);
          } catch (err) {
            // If token is expired, try to refresh it
            try {
              const newAccessToken = await refreshToken();
              const userData = await fetchUserData(newAccessToken);
              setUser(userData);
            } catch (refreshErr) {
              // If refresh fails, clear everything and redirect to login
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              setUser(null);
              window.location.href = '/login';
            }
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  // Save user data to local storage when user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/jwt/token/`, {
        email,
        password
      });

      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      const userData = await fetchUserData(access);
      setUser(userData);
      return userData;
    } catch (err) {
      throw err;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/create-user/`, userData);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      loading, 
      error, 
      login, 
      signup, 
      logout,
      refreshToken
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use User Context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
