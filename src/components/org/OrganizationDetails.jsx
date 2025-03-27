
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function OrganizationDetails({ organizationId }) {
  const { id } = useParams(); // Get from URL if not passed as prop
  const orgId = organizationId || id;
  const [organization, setOrganization] = useState(null);
  const [members, setMembers] = useState(null);
  const [invitations, setInvitations] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");


  const [inviteeEmail, setInviteeEmail] = useState(null);
  async function handleInvitationFormSubmit () {
     try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/invite/`,
          { email:inviteeEmail },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrganization(response.data);
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
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/invitations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInvitations(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching organization:", error);
      } finally {
        setLoading(false);
      }
    };



    //fetch org. info
    const fetchOrganization = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/organizations/organization/${orgId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/organizations/organization/${orgId}/members/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
    if (!window.confirm("Are you sure you want to delete this organization?")) return;

    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/organizations/organization/${orgId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Organization deleted successfully.");
      navigate("/dashboard"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!organization) return <p>Organization not found.</p>;

  return (
    <div className="w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-md grid grid-cols-2">
      <div>
        <h2 className="text-2xl font-bold mb-4">{organization.name}</h2>
        <p className="text-gray-700">Created At: {new Date(organization.created_at).toLocaleDateString()}</p>
        <p className="text-gray-700">Updated At: {new Date(organization.updated_at).toLocaleDateString()}</p>


      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate(`/organizations/edit/${orgId}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>

        </div>

      </div>

      <div>

        <p>members</p>
          
          {members && members.map((member, index) => (
            <div>
              <p>{member.id}</p>
              <p>{member.email}</p>
              <p>{member.first_name}</p>
              <p>{member.last_name}</p>
              <p>{member.role}</p>
            </div>
          ))}

      </div>


       <div>

        <p>invitations</p>
          
          {invitations && invitations.map((invitation, index) => (
            <div>
              <p>{invitation.id}</p>
              <p>{invitation.invitee_email}</p>
              <p>{invitation.role}</p>
              <p>{invitation.expires_at}</p>
            </div>
          ))}

      </div>



       <div className="flex flex-col items-center justify-center ">
        <input
          type="text"
          id="email"
          onChange={(e) => setInviteeEmail(e.target.value)}
          className="border"
          placeholder="email for invitation"
        />

        <button onClick={handleInvitationFormSubmit} > Invite</button>
    </div>
    </div>
  );
}

export default OrganizationDetails;
