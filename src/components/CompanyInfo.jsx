import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const CompanyInfo = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/company/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log(response.data);
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
        <h2 className="text-xl font-semibold mb-4">Company Information</h2>
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