import { defaults } from "autoprefixer";
import { useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { useState } from "react";
import { useOrg } from "../../context/OrganizationContext";
import { useUser } from "../../context/UserContext";

const NavigationManagement = () => {
  //const [loading, setLoading] = useState(true);

  const { loading, setLoading } = useUser();
  const [label, setLabel] = useState("");
  const { currentOrg } = useOrg();
  const { navigations, fetchNavigations } = useOrg();
  const [navigationGettingEdited, setNavigationGettingEdited] = useState(null);
  const [newNavigationLabel, setNewNavigationLabel] = useState(null);
  //handle fetch

  //handle creating navigation
  const handleNavigationCreation = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/organizations/navigation/`, {
        organization: currentOrg.id,
        label,
      });
    } catch (err) {
      console.log("error creating navigation", err);
    } finally {
      fetchNavigations();
      setLoading(false);
    }
  };
  //handle editing navigation
  const handleNavigationEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.patch(
        `/organizations/navigation/${navigationGettingEdited}/`,
        {
          organization: currentOrg.id,
          label: newNavigationLabel,
        },
      );
      console.log(response);
    } catch (err) {
      console.log("error editing navigation", err);
    } finally {
      setNavigationGettingEdited(null);
      fetchNavigations();
      setLoading(false);
    }
  };

  ///handle deleting navigation
  const handleNavigationDelete = async (navigationId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(
        `/organizations/navigation/${navigationId}/`,
        {
          organization: currentOrg.id,
          //label,
        },
      );
    } catch (err) {
      console.log("error editing navigation", err);
    } finally {
      fetchNavigations();
      setLoading(false);
    }
  };
  //
  //useEffect(() => {
  //  fetchNavigations();
  //}, []);
  //
  return (
    <div className="bg-amber-200 mt-5 grid grid-cols-1 mt-20">
      {loading || !currentOrg ? (
        <p>Loading</p>
      ) : (
        <div>
          <p>Manage {currentOrg.name} Navigations</p>
          <p>Current navigations</p>
          {navigations.length > 0 ? (
            <div className="bg-green-400">
              {navigations.map((navigation) =>
                navigationGettingEdited === navigation.id ? (
                  <form
                    className="bg-red-200 border"
                    key={navigation.id}
                    onSubmit={handleNavigationEdit}
                  >
                    <input
                      type="text"
                      value={newNavigationLabel}
                      onChange={(e) => setNewNavigationLabel(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setNavigationGettingEdited(null)}
                    >
                      Cancel
                    </button>
                    <button type="submit">Finish</button>
                  </form>
                ) : (
                  <div key={navigation.id}>
                    <p>{navigation.label}</p>
                    <button
                      type="button"
                      className="border"
                      onClick={() => {
                        setNavigationGettingEdited(navigation.id);
                        setNewNavigationLabel(navigation.label);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="border"
                      onClick={() => handleNavigationDelete(navigation.id)}
                    >
                      Delete
                    </button>
                  </div>
                ),
              )}
            </div>
          ) : (
            <p>No available navigations, create below!</p>
          )}
          <form onSubmit={handleNavigationCreation}>
            <input type="text" onChange={(e) => setLabel(e.target.value)} />
            <button type="submit">Create</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NavigationManagement;
