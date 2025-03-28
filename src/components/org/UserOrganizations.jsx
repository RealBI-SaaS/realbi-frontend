
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const UserOrganizations = ({ orgData }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="mb-8">
        <div className="flex items-start justify-between p-4">
          <p className="text-xl font-semibold m-0">Organizations</p>
          <button onClick={() => navigate('/create-company')} className="text-white p-2 rounded-md hover:bg-blue-200 hover:text-black transition-colors flex items-center">
            <IoMdAdd />
          </button>
        </div>
        {orgData.length > 0 ? (
          orgData.map((company, index) => (
            <Link to={`/organizations/${company.id}`} key={index}>
              <div className="bg-white rounded-lg shadow p-4 mb-4">
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Company Name:</span> {company.name}
                  </div>
                  <div>
                    <span className="font-medium">Company ID:</span> {company.id}
                  </div>
                  <div>
                    <span className="font-medium">Role:</span> {company.role}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>No organizations found.</div>
        )}
      </div>
    </div>
  );
};

export default UserOrganizations;

