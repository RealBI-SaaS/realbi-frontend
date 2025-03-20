import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CreateCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/company/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: companyName
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create company');
      }

      const data = await response.json();
      console.log('Company created:', data);
      // TODO: Handle successful company creation (e.g., redirect to dashboard)
      navigate('/home');
    } catch (error) {
      console.error('Error creating company:', error);
      // TODO: Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <h1>Create Company</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="companyName"
          name="companyName"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          
        />
        <button type="submit">
          Finish
        </button>
        <button onClick={() => navigate('/home')}>Skip</button>
      </form>
    </div>
  );
};

export default CreateCompany;
