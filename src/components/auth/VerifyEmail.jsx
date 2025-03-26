
import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const VerifyEmail = () => {
  const { uid, token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/users/activation/`,
          //method: "POST",
          {uid, token},
          { headers: { "Content-Type": "application/json" }, }
        );
        //console.log(response)

        if (response.status == '204') {
          setMessage("Email verified successfully! Redirecting...");
          //console.log("Account Verified")
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setMessage("Invalid or expired activation link.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      }
    };

    if (uid && token) {
      verifyEmail();
    }
  }, [uid, token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyEmail;

