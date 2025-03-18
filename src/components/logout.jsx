import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return null; // No UI needed, just a redirect
};

export default Logout;
