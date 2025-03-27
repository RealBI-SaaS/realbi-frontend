import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../../context/UserContext';
import { IoMdAdd } from "react-icons/io";
import get_users_orgs from '../../utils/org/get_users_organizations';

const UserOrganizations = () => {
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchOrganizationRole = async () => {
     try {
        console.log(orgData)
      } catch (err) {
        setError('Failed to fetch organization role');
        console.error('Error fetching organization role:', err);
      } finally {
        setLoading(false);
      }
    }



    const fetchCompanyData = async () => {
      try {
        const response = await get_users_orgs(accessToken);
        console.log(response.data)
        setOrgData(response.data?.results);

        fetchOrganizationRole();
      } catch (err) {
        setError('Failed to fetch organization data');
        console.error('Error fetching organization data:', err);
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
       {orgData && (
          <div className="mb-4">
            {Array.isArray(orgData) ? (
              orgData.map((company, index) => (
              <Link to={`/organizations/${company.id}`} key={index}>
                <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Company Name:</span> {company.id}
                    </div>
                    <div>
                      <span className="font-medium">Company ID:</span> {company.name}
                    </div>
                    <div>
                      <span className="font-medium">Role:</span> {company.role}
                    </div>
                  </div>
                </div>
              </Link>
              ))
            ) : (
              <Link to={`/organizations/${company.id}`} key={index}>
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

            </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrganizations; 
