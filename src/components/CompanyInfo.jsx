import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";

const CompanyInfo = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/company/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setCompanyData(response.data);
      } catch (err) {
        setError('Failed to fetch company data');
        console.error('Error fetching company data:', err);
      } finally {
        setLoading(false);
      }
    };

    

    fetchCompanyData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-8">
        <div className="flex items-start justify-between  p-4">
          <p className="text-xl font-semibold m-0">Organizations</p>
          <button onClick={() => navigate('/create-company')} className="text-white p-2 rounded-md hover:bg-blue-200 hover:text-black transition-colors flex items-center"> <IoMdAdd /></button>
        
        </div>
       {companyData && (
          <div className="mb-4">
            {Array.isArray(companyData) ? (
              companyData.map((company, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Company Name:</span> {company.company_name}
                    </div>
                    <div>
                      <span className="font-medium">Company ID:</span> {company.company_id}
                    </div>
                    <div>
                      <span className="font-medium">Role:</span> {company.role}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow p-4">
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Company Name:</span> {companyData.company_name}
                  </div>
                  <div>
                    <span className="font-medium">Company ID:</span> {companyData.id}
                  </div>
                  <div>
                    <span className="font-medium">Role:</span> {companyData.role}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyInfo; 