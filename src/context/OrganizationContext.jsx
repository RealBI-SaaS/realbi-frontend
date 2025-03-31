import { useState, useEffect, createContext, useContext } from "react";
import get_users_orgs from "../utils/org/get_users_organizations";

// Create Context
const OrganizationContext = createContext(null);

// Provider Component
export const OrganizationProvider = ({ children }) => {
  const [userOrgs, setUserOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserOrganizations = async () => {
    try {
      const response = await get_users_orgs();
      setUserOrgs(response.data?.results || []);
    } catch (err) {
      console.error("Error fetching organization data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrganizations();
  }, []);

  return (
    <OrganizationContext.Provider value={{ userOrgs, loading }}>
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
