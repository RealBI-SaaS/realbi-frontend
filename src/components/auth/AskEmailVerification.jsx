import resend_verification_email from "../../utils/resend_verification_email";
import { useLocation } from 'react-router-dom';

const AskEmailVerificatioin = (() => {
  const { state } = useLocation();
  const user_email = state.user_email || null;


  if (!user_email){
    return (
      <h1> No email </h1>
    )
  }
  console.log(user_email)

  return (
  <div>
      <h1>Check Your Inbox For Verification Email</h1>
      <button onClick={() => {resend_verification_email(user_email)}} >Resend Email</button>
  </div>
  )
})


export default AskEmailVerificatioin;
