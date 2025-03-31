import { useState } from "react";
import { useLocation } from "react-router-dom";
import send_password_reset_email from "../../utils/auth/send_password_reset_email";

//a page for the user to ak for password reset email, attched on login form
const AskForPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = async () => {
    if (!email) {
      setMessage("empty email");
      return;
    }
    console.log(email);
    const response = await send_password_reset_email(email);
    if (response) {
      setMessage("Unexpected response, try later!");
    } else {
      setMessage("Reset email sent, Check your inbox.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="pt-20">{message}</h1>
      <p className="text-sm">{message}</p>
      <input
        type="text"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        className="border"
        placeholder="email for reset"
      />

      <button onClick={handleFormSubmit}> Reset</button>
    </div>
  );
};

export default AskForPasswordReset;
