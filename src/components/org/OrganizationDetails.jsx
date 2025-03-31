import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axiosInstance from "../../axios/axiosInstance";

function OrganizationDetails({ organizationId }) {
  const { id } = useParams(); // Get from URL if not passed as prop
  const orgId = organizationId || id;
  const [organization, setOrganization] = useState(null);
  const [members, setMembers] = useState(null);
  const [invitations, setInvitations] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //const token = localStorage.getItem("access_token");

  const [inviteeEmail, setInviteeEmail] = useState("");
  async function handleInvitationFormSubmit() {
    try {
      const response = await axiosInstance.post(
        `/organizations/${orgId}/invite/`,
        { email: inviteeEmail },
      );
      //setOrganization(response.data);
      const newInvitation = response.data;

      // Update the invitations state by appending the new invitation
      setInvitations((prevInvitations) => [...prevInvitations, newInvitation]);

      // Optionally, reset the inviteeEmail state to clear the input field
      setInviteeEmail("");
    } catch (error) {
      console.error("Error fetching organization:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!orgId) return;

    //fetch invitations
    const fetchInvitations = async () => {
      try {
        const response = await axiosInstance.get(
          `/organizations/${orgId}/invitations`,
          //{
          //  headers: {
          //    Authorization: `Bearer ${token}`,
          //  },
          //},
        );
        setInvitations(response.data);
      } catch (error) {
        console.error("Error fetching organization:", error);
      } finally {
        setLoading(false);
      }
    };

    //fetch org. info
    const fetchOrganization = async () => {
      try {
        const response = await axiosInstance.get(
          `/organizations/organization/${orgId}/`,
          //{
          //  headers: {
          //    Authorization: `Bearer ${token}`,
          //  },
          //},
        );
        setOrganization(response.data);
      } catch (error) {
        console.error("Error fetching organization:", error);
      } finally {
        setLoading(false);
      }
    };

    //fetch members list
    const fetchMembers = async () => {
      try {
        const response = await axiosInstance.get(
          `organizations/organization/${orgId}/members/`,
          //{
          //  headers: {
          //    Authorization: `Bearer ${token}`,
          //  },
          //},
        );
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
    fetchMembers();
    fetchInvitations();
  }, [orgId]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this organization?"))
      return;

    try {
      //const token = localStorage.getItem("access_token");
      await axiosInstance.delete(
        `/organizations/organization/${orgId}/`,
        //{
        //  headers: {
        //    Authorization: `Bearer ${token}`,
        //  },
        //},
      );
      alert("Organization deleted successfully.");
      navigate("/manage-all"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!organization) return <p>Organization not found.</p>;

  return (
    <div className="w-full mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md grid grid-cols-1">
      <div className="grid grid-cols-2 border m-3 p-3">
        <div id="org-details" className=" p-3 m-3 border-l-current">
          <h2 className="text-2xl font-bold mb-4">{organization.name}</h2>
          <p className="text-gray-700">
            Created At: {new Date(organization.created_at).toLocaleDateString()}
          </p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => snavigate(`/organizations/edit/${orgId}`)}
              className="bg-blue-400 text-md border text-black px-4 py-2 rounded-sm hover:bg-blue-500"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-400 text-black bold-md border px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>

        <div>
          <p className="text-lg pt-5">Members</p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">First Name</th>
                  <th className="py-3 px-6 text-left">Last Name</th>
                  <th className="py-3 px-6 text-left">Role</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {members && members.length > 0 ? (
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
                    <td colSpan="5" className="py-3 px-6 text-center">
                      No members available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="border m-3 p-3 grid grid-cols-1">
        <div id="invitations" className="w-full mb-0 pb-0">
          <div
            id="invitation-form"
            className="grid grid-cols-6  items-center justify-center "
          >
            <p className="col-span-4 text-lg ">Invitations</p>
            <div className="flex gap-2">
              <input
                type="text"
                id="email"
                onChange={(e) => setInviteeEmail(e.target.value)}
                className="border"
                value={inviteeEmail}
                placeholder="email for invitation"
              />

              <button onClick={handleInvitationFormSubmit} className="border">
                {" "}
                Invite
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-0 pt-0">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Expiration Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {invitations && invitations.length > 0 ? (
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
  );
}

export default OrganizationDetails;
