import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Avatar } from 'antd';
import checkIcon from '/check.png';
import { IoMdCreate, IoMdClose} from "react-icons/io";
import ManageAllSideMenu from './menu/ManageAllSideMenu'
import axios from 'axios';

import SettingsMenu from './menu/SettingsMenu';
import change_password from '../utils/change_password';
import { validatePassword } from '../utils/password_validate';
import check_correct_password from '../utils/checkCorrectPasword';
import Logout from './logout';


const Account = () => {
  const { user, fetchUserData, setUser } = useUser();
  const userName = user?.first_name || user?.email || 'x';
  const userInitial = userName.charAt(0).toUpperCase();
  const navigate = useNavigate();



  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: ''
  });



  const [passwordChangeMessage,setPasswordChangeMessage] = useState('');
  const [passwordFormData, setPasswordFormData] = useState({
    currentPass: '',
    newPass: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name || '',
        lastName: user.last_name || ''
      });
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }
  const handlePasswordChangeFormSubmit = (async (e) => {
    e.preventDefault();

    let response = validatePassword(passwordFormData.newPass);

    if (response){
      setPasswordChangeMessage(response)
      return
    }
    response = await check_correct_password(user.email, passwordFormData.currentPass)
    console.log(response)
    if(!response){
      setPasswordChangeMessage("The value for your current password is wrong!")
      return 
    }
    const accessToken = localStorage.getItem('access_token');
    response = await change_password(passwordFormData.currentPass, passwordFormData.newPass, accessToken)

    if (!response){
      navigate('/logout')
    }else{
      setPasswordChangeMessage("Unexpected response. Please try again.")
    }

  })

  //TODO: Refactor this method
  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/myauth/user/`, {
        first_name: formData.firstName,  
        last_name: formData.lastName 
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      // Fetch updated user data to ensure we have all fields
      const accessToken = localStorage.getItem('access_token');
      const updatedUserData = await fetchUserData(accessToken);
      setUser(updatedUserData);

      console.log(updatedUserData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  return (

    <div className='grid grid-cols-6 bg-gray-100 h-full'> 
      <div className=" col-span-5 border w-full max-w-screen-lg mt-5 p-4 rounded-lg shadow-md w-full ">
      <h1 className="text-xl mb-4">Account Information</h1>
      <div className='flex flex-col border items-center justify-start px-5'>

      <Avatar 
            style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} 
            size={300}
            className="cursor-pointer"
        >
            <span className="text-5xl">{userInitial}</span>
        </Avatar>
      {isEditing ? (
        <div className="w-full max-w-md mt-4">
          <form className="space-y-4" onSubmit={handleUpdateFormSubmit}>
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your last name"
              />
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : ( 
      
    
        <div className='flex flex-col ml-4 border w-75'>
          <div className='flex justify-between'>
            <span className="font-medium">{user.first_name} {user.last_name}</span>
            <IoMdCreate className="inline-block ml-2 text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => setIsEditing(true)} />
          </div>
          <div className='block'>
            {user.email}
          </div>
        </div>
        
      )}
      </div>



      <h1 className="text-xl mb-4">Change Password</h1>
      <div className='flex flex-col border items-center justify-start px-5 '>
          <p className='text-sm text-red-200'>{passwordChangeMessage}</p>
        <form className='grid grid-cols-1 gap-3' onSubmit={handlePasswordChangeFormSubmit }>
            <input 
              type={showPassword ? "text" : "password"}
              name="current_password" 
              onChange={(e) => setPasswordFormData({ ...passwordFormData, currentPass: e.target.value })}
            />
            <input 
              type={showPassword ? "text" : "password"}
              name="new_password" 
              onChange={(e) => setPasswordFormData({ ...passwordFormData, newPass: e.target.value })}
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
            <button type="submit" className='border bg-red-400'> Finish </button>
        </form>
      </div>
      
      
      <div className="space-y-2 mb-8">
   
     
       

      </div>
    
      <button
        onClick={() => navigate('/logout')}
        className="bg-red-300 mx-5 px-5 text-white px-4 py-2 rounded-sm hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
    </div>
    
  );
};

export default Account;
