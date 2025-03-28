
import { useState } from "react";
import axios from "axios";

function CreateOrganization({ onOrganizationCreated }) {
  const [orgName, setOrgName] = useState('');

  const handleCreateCompanySubmit = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/organizations/organization/`,
        { name: orgName },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

      if (response.status === 201) {
        onOrganizationCreated();
        setOrgName('');
      } else {
        throw new Error('Failed to create company');
      }
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  return (
    <div className='grid grid-cols-6 bg-gray-100 h-full'> 
      <div className="col-span-5 border w-full max-w-screen-lg mt-5 p-4 rounded-lg shadow-md">
        <div className='flex flex-col border items-center justify-start px-5'>
          <form className="mt-0 pt-0">
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Company Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="border p-2 rounded-md"
            />
          </form>
        </div>
        <div className="mt-3 flex gap-4 w-full">
          <button onClick={handleCreateCompanySubmit} className="text-white bg-blue-100 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors">
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateOrganization;

