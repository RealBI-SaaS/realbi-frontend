import React, { useEffect, useState } from "react";

const Account = () => {
  const [userDetails, setUserDetails] = useState({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    isGoogleUser: false
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
            console.log(data);
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
          <p>{userDetails.firstName || 'Not set'}</p>
        </div>
        <div>
          <label className="font-medium">Last Name:</label>
          <p>{userDetails.lastName || 'Not set'}</p>
        </div>
        <div>
          <label className="font-medium">Role:</label>
          <p className="capitalize">{userDetails.role}</p>
        </div>
        <div>
          <label className="font-medium">Account Type:</label>
          <p>{userDetails.isGoogleUser ? 'Google Account' : 'Email Account'}</p>
        </div>
      </div>
      <a href="/home" className="account-link">Go to Home</a>
      <a href="/logout" className="account-link">Logout</a>

    </div>
  );
};

export default Account;
