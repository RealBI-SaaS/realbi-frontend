import axios from "axios"

const resend_verification_email = async (email) => {
  try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/users/resend_activation/`, 
        { email },
        { headers: { "Content-Type": "application/json" }}
      )
      if (response.status === 204) {
        console.log("Verification email resent successfully! Check your inbox.");
      } else {
        console.log("Unexpected response. Please try again.");
      }
  } catch (error) {
      console.error("Error resending email:", error);
  }

}

export default resend_verification_email;
