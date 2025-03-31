import { useState } from "react";
//import axios from "axios";
import axiosInstance from "../../axios/axiosInstance.js";

function CreateOrganization({ onOrganizationCreated }) {
  const [orgName, setOrgName] = useState("");

  const handleCreateCompanySubmit = async () => {
    try {
      //const token = localStorage.getItem('access_token');
      const response = await axiosInstance.post(
        "/organizations/organization/",
        { name: orgName },
      );

      if (response.status === 201) {
        onOrganizationCreated();
        setOrgName("");
      } else {
        throw new Error("Failed to create company");
      }
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  return (
    <div className="grid grid-cols-6 ">
      <div className="col-span-5 flex justify-between   border w-full max-w-screen-lg mt-5 p-4 rounded-lg shadow-md">
        <div className="flex border   w-full rounsed-sm items-center justify-between  gap-3 justify-center ">
          <form className="mt-0 pt-0 w-full ">
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Company Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full"
            />
          </form>
        </div>
        <button
          onClick={handleCreateCompanySubmit}
          className="text-white bg-blue-500 px-4 py-2 rounded-sm hover:bg-blue-400 transition-colors border"
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateOrganization;
