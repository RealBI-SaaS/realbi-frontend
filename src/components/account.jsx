import React, { useEffect, useState } from "react";

const Account = () => {
  const [userDetails, setUserDetails] = useState({
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    role: '',
    is_google_user: false
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    
    if (accessToken) {
      fetch("http://localhost:8000/auth/user", {
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setUserDetails(data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Account Details</h1>
      <div className="space-y-4">
        <div>
          <label className="font-medium">Email:</label>
          <p>{userDetails.email}</p>
        </div>
        <div>
          <label className="font-medium">First Name:</label>
          <p>{userDetails.first_name || 'Not set'}</p>
        </div>
        <div>
          <label className="font-medium">Last Name:</label>
          <p>{userDetails.last_name || 'Not set'}</p>
        </div>
        <div>
          <label className="font-medium">Role:</label>
          <p className="capitalize">{userDetails.role}</p>
        </div>
        <div>
          <label className="font-medium">Account Type:</label>
          <p>{userDetails.is_google_user ? 'Google Account' : 'Email Account'}</p>
        </div>
      </div>
      <a href="/home" className="account-link">Go to Home</a>

    </div>
  );
};

export default Account;
