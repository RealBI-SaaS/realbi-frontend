import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axiosInstance from "../../axios/axiosInstance";
const AcceptInvitation = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const acceptInvitation = async () => {
      try {
        const response = await axiosInstance.post(
          `/organizations/invitations/accept/${token}/`,
        );
        //console.log(response)

        if (response.status == "200") {
          setMessage("Invitation Accepted");
          //console.log("Account Verified")
          setTimeout(() => navigate("/manage-all"), 3000);
        } else {
          console.log(response);
          setMessage("Invalid or expired invitation link.");
        }
      } catch (error) {
        console.log(error);
        setMessage("An error occurred. Please try again.");
      }
    };

    if (token) {
      acceptInvitation();
    }
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default AcceptInvitation;
