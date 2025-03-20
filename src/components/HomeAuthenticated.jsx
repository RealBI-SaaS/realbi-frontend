import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const HomeAuthenticated = () => {
  const { user } = useUser();
  const navigate = useNavigate();

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

export default HomeAuthenticated;