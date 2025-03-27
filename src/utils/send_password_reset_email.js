import axios from "axios"

const send_password_reset_email = async (email) => {
  console.log(email)
  try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/users/reset_password/`, 
        { email: email },
        { headers: { "Content-Type": "application/json" }}
      )
      if (response.status === 204) {
        console.log("Verification email resent successfully! Check your inbox.");
        return null
      } else {
        console.log("Unexpected response. Please try again.");
        return true
      }
  } catch (error) {
      return true
      console.error("Error resending email:", error);
  }

}

export default send_password_reset_email;
