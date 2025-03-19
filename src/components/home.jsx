import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from '../context/UserContext';

const Home = () => {
  const { user, loading, setUser } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleTokenParams = async () => {
      const accessToken = searchParams.get('access');
      const refreshToken = searchParams.get('refresh');

      if (accessToken && refreshToken) {
        try {
          // Store tokens in localStorage
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);
          
          // Fetch user data using the access token
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/user/`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            // Update user context directly
            setUser(userData);
          }
        } catch (error) {
          console.error('Error handling token parameters:', error);
        }
      }
    };
    console.log("searchParams")
    console.log(searchParams)
    handleTokenParams();
  }, [searchParams, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Welcome, {user?.firstName || ''}!</h2>
            <p className="text-gray-600">Your comprehensive analytics solution for data-driven decision making.</p>
          </div>
          
         

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate('/account')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Manage Account
            </button>
            <button
              onClick={() => navigate('/logout')}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
