import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Get tokens from URL parameters
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken) {
      // Store tokens in localStorage or your preferred storage method
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      // Make authenticated request with the access token
      fetch("http://localhost:8000/auth/user", {
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
        .then((res) => res.json())
        .then((data) => setUserId(data.userId))
        .catch((err) => console.error(err));
    }
  }, [location]);

  return (
    <div className="home-container">
      <h1>Welcome to Our Analytics Platform</h1>
      <div className="home-content">
        <p>Your comprehensive analytics solution for data-driven decision making.</p>
        {userId && <p>User ID: {userId}</p>}
        <a href="/account" className="account-link">Go to Account</a>
      </div>
    </div>
  );
};

export default Home;
