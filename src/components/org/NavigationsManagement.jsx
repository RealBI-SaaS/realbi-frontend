import { defaults } from "autoprefixer";
import ManageAllSideMenu from "../menu/ManageAllSideMenu";
import { useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { useState } from "react";
import { useOrg } from "../../context/OrganizationContext";
import { useUser } from "../../context/UserContext";

const NavigationManagement = () => {
  //const [loading, setLoading] = useState(true);

  const { loading, setLoading } = useUser();
  //for new navigation creation form
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
    <div className="grid grid-cols-6 h-full min-h-screen mt-10">
      <ManageAllSideMenu />

      <div className="bg-gray-200 p-20 mt-5 grid grid-cols-1 mt-20 col-span-5 overflow-auto">
        {loading || !currentOrg ? (
          <p>Loading</p>
        ) : (
          <div className="grid grid-cols-1 pl-5">
            <p className="text-2xl flex justify-center">
              Manage {currentOrg.name} Navigations
            </p>
            <p className="text-xl">Current navigations</p>
            {navigations.length > 0 ? (
              <div className="">
                {navigations.map((navigation, ind) =>
                  navigationGettingEdited === navigation.id ? (
                    <form
                      className=" border p-5 grid grid-cols-5 "
                      key={navigation.id}
                      onSubmit={handleNavigationEdit}
                    >
                      <input
                        type="text"
                        value={newNavigationLabel}
                        className="border px-2 py-1 col-span-4"
                        onChange={(e) => setNewNavigationLabel(e.target.value)}
                      />
                      <div>
                        <button
                          type="button"
                          className=" px-2 py-1 bg-red-100 border"
                          onClick={() => setNavigationGettingEdited(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className=" px-2 py-1 bg-blue-400 border"
                          type="submit"
                        >
                          Finish
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div
                      key={navigation.id}
                      className="border grid grid-cols-6 justify-around gap-1 m-3 items-center"
                    >
                      <p className="justify-start text-gray-400">{ind + 1}</p>
                      <p className="col-span-4">{navigation.label}</p>
                      <div className="flex justify-around">
                        <button
                          type="button"
                          className="border px-2 bg-blue-400"
                          onClick={() => {
                            setNavigationGettingEdited(navigation.id);
                            setNewNavigationLabel(navigation.label);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="border bg-red-400  px-2"
                          onClick={() => handleNavigationDelete(navigation.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <p>No available navigations, create below!</p>
            )}
            <p className="text-xl mt-5 pt-5">Create navigations</p>
            <form
              onSubmit={handleNavigationCreation}
              className="grid flex flex-col border justify-center items-center gap-2.5 p-5 "
            >
              <input
                type="text"
                className="border w-50"
                placeholder="naviagtion label"
                onChange={(e) => setLabel(e.target.value)}
              />
              <button type="submit" className="border bg-blue-400 m-3">
                Create
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationManagement;
