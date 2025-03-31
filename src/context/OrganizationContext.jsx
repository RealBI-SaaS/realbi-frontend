import { useState, useEffect, createContext, useContext } from "react";
import get_users_orgs from "../utils/org/get_users_organizations";
import axiosInstance from "../axios/axiosInstance";
import CreateOrganization from "../components/org/CreateOrganization";
// Create Context
const OrganizationContext = createContext(null);

// Provider Component
export const OrganizationProvider = ({ children }) => {
  const [userOrgs, setUserOrgs] = useState([]);
  //the organization th user is working on
  const [currentOrg, setCurrentOrg] = useState(userOrgs[0]);
  const [loading, setLoading] = useState(true);

  const fetchUserOrganizations = async () => {
    try {
      const response = await get_users_orgs();
      setUserOrgs(response.data?.results || []);
      if (userOrgs.length > 0) {
        setCurrentOrg(userOrgs[0]);
      }
    } catch (err) {
      console.error("Error fetching organization data:", err);
    } finally {
      setLoading(false);
    }
  };

  //create org
  const createOrganization = async (orgName) => {
    try {
      //const token = localStorage.getItem('access_token');
      const response = await axiosInstance.post(
        "/organizations/organization/",
        { name: orgName },
      );

      if (response.status === 201) {
        //onOrganizationCreated();
        //setOrgName("");
        fetchUserOrganizations();
      } else {
        throw new Error("Failed to create company");
      }
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  useEffect(() => {
    fetchUserOrganizations();
  }, []);

  return (
    <OrganizationContext.Provider
      value={{
        userOrgs,
        loading,
        currentOrg,
        setCurrentOrg,
        createOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

// Custom Hook
export const useOrg = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error("useOrg must be used within an OrganizationProvider");
  }
  return context;
};
