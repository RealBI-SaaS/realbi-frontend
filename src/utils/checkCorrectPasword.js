import axios from "axios"

const check_correct_password = async (email, password) => {
  try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/jwt/create/`, 
        { email, password},
        { headers: { "Content-Type": "application/json" }}
      )
      if (response.status === 200) {
        console.log("password is correct");
        return true
      } else {
        console.log("incorrect password");
        return false
      }
  } catch (error) {
    if (!error.response.status == '401'){
      console.error("Error  checking password:", error);
    }
    return false

  }

}

export default check_correct_password;
