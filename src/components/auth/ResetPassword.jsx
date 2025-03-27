
import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const ResetPassword = () => {
  const { uid, token } = useParams();
  const [message, setMessage] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate();

  const handleResetSubmit = (async () => {

       try {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/users/reset_password_confirm/`,
          //method: "POST",
          {uid: uid, token: token, new_password: newPassword},
          { headers: { "Content-Type": "application/json" }, }
        );
        //console.log(response)

        if (response.status == '204') {
          setMessage("Password changed!");
          //console.log("Account Verified")
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setMessage("Invalid or expired activation link.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      }

  })

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
      <input 
        type={showPassword ? "text" : "password"}
        name="new_password" 
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <div className='flex gap-3'>
        <input
          type="checkbox"
          id="show-password"
          checked={showPassword}
          onChange={() => setShowPassword((prev) => !prev)}
          className="cursor-pointer"
        />
        <label htmlFor="show-password" className="text-sm cursor-pointer">Show Password</label>
      </div>
      <button type="button" className='border bg-green-400' onClick={handleResetSubmit}> Reset </button>

    </div>
  );
};

export default ResetPassword;

