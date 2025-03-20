import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import CompanyInfo from './CompanyInfo';

const Account = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Account Information</h1>
      
      <div className="space-y-2 mb-8">
        <div>
          <span className="font-medium">User ID:</span> {user.userId}
        </div>
        <div>
          <span className="font-medium">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-medium">First Name:</span> {user.firstName}
        </div>
        <div>
          <span className="font-medium">Last Name:</span> {user.lastName}
        </div>
        <div>
          <span className="font-medium">Role:</span> {user.role}
        </div>
        <div>
          <span className="font-medium">Google User:</span> {user.isGoogleUser ? 'Yes' : 'No'}
        </div>
      </div>

      <CompanyInfo />

      <button
        onClick={() => navigate('/home')}
        className="mt-4 px-3 py-1 bg-gray-100 rounded"
      >
        Back to Home
      </button>
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
  );
};

export default Account;
