import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageAllSideMenu from "../menu/ManageAllSideMenu";
import axiosInstance from "../../axios/axiosInstance";
import { useOrg } from "../../context/OrganizationContext";

function OrganizationDetails() {
  const { currentOrg } = useOrg();
  const [members, setMembers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviteeEmail, setInviteeEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentOrg) return;

    const fetchMembers = async () => {
      try {
        const response = await axiosInstance.get(
          `/organizations/organization/${currentOrg.id}/members/`,
        );
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    const fetchInvitations = async () => {
      try {
        const response = await axiosInstance.get(
          `/organizations/${currentOrg.id}/invitations`,
        );
        setInvitations(response.data);
      } catch (error) {
        console.error("Error fetching invitations:", error);
      }
    };

    setLoading(true);
    Promise.all([fetchMembers(), fetchInvitations()]).finally(() =>
      setLoading(false),
    );
  }, [currentOrg]);

  const handleInvitationFormSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        `/organizations/${currentOrg.id}/invite/`,
        { email: inviteeEmail },
      );
      setInvitations((prev) => [...prev, response.data]);
      setInviteeEmail("");
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this organization?"))
      return;

    try {
      await axiosInstance.delete(
        `/organizations/organization/${currentOrg.id}/`,
      );
      alert("Organization deleted successfully.");
      navigate("/manage-all");
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!currentOrg) return <p>Organization not found.</p>;

  return (
    <div className="grid grid-cols-6 h-full min-h-screen">
      <ManageAllSideMenu />
      <div className="w-full mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md grid grid-cols-1 col-span-5 overflow-auto">
        <div className="grid grid-cols-1 border m-3 p-3">
          <div id="org-details" className="p-3 m-3 border-l-current">
            <h2 className="text-2xl font-bold mb-4">{currentOrg.name}</h2>
            <p className="text-gray-700">
              {new Date(currentOrg.created_at).toLocaleDateString()}
            </p>
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => navigate(`/organizations/edit/${currentOrg.id}`)}
                className="bg-blue-400 text-lg rounded-sm border text-black px-4 py-2 hover:bg-blue-500"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-400 text-lg text-black border px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="border m-3 p-3">
          <p className="text-lg pt-5">Members</p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">First Name</th>
                  <th className="py-3 px-6 text-left">Last Name</th>
                  <th className="py-3 px-6 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {members.length > 0 ? (
                  members.map((member, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left">{member.email}</td>
                      <td className="py-3 px-6 text-left">
                        {member.first_name}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {member.last_name}
                      </td>
                      <td className="py-3 px-6 text-left">{member.role}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-3 px-6 text-center">
                      No members available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border m-3 p-3">
          <div className="grid grid-cols-2">
            <p className="text-lg">Invitations</p>
            <div className="flex gap-3 h-7 justify-end">
              <input
                type="text"
                onChange={(e) => setInviteeEmail(e.target.value)}
                className="border px-1"
                value={inviteeEmail}
                placeholder="Email for invitation"
              />
              <button
                onClick={handleInvitationFormSubmit}
                className="border bg-amber-300 px-1"
              >
                Invite
              </button>
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">Expiration Date</th>
                </tr>
              </thead>
              <tbody>
                {invitations.length > 0 ? (
                  invitations.map((invitation, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left">
                        {invitation.invitee_email}
                      </td>
                      <td className="py-3 px-6 text-left">{invitation.role}</td>
                      <td className="py-3 px-6 text-left">
                        {new Date(invitation.expires_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-3 px-6 text-center">
                      No invitations available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationDetails;
