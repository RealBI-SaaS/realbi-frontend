import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import CompanyInfo from './CompanyInfo';
import { Avatar } from 'antd';
import checkIcon from '/check.png';
import SideMenu from './menu/ManageAllSideMenu';
import { IoMdCheckmark, IoMdClose, IoMdCreate } from "react-icons/io";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
  const { user, fetchUserData, setUser } = useUser();
  const userName = user?.first_name || user?.email || 'x';
  const userInitial = userName.charAt(0).toUpperCase();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: ''
  });

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

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/auth/user/`, {
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
    <div className='grid grid-cols-6 h-full'> 
      {/* account info  */}
      <div className=" col-span-5 border w-full max-w-screen-lg ml-5 p-4 rounded-lg shadow-md w-full ">
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
      
      // <div className='flex flex-col border items-center justify-start px-5'>
      //   <Avatar 
      //       style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} 
      //       size={300}
      //       className="cursor-pointer"
      //   >
            // <span className="text-5xl">{userInitial}</span>
        // </Avatar>
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


      {/* email status  */}

      <h1 className="text-xl mb-4">Email Status</h1>
      <div className='flex flex-col border items-center justify-start px-5'>
       
        <div className='flex flex-col ml-4 border'>
          
          <div className='block-inline'>
              {user.isEmailVerified ? (
                  <span className='text-green-500'>Email is successfully verified!<IoMdCheckmark /></span>
              ) : (
                <div>
                  <span className='text-red-500 flex'>email is not verified<IoMdClose /></span>
                  <button className='bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition-colors'>Verify Email</button>
                </div>
              )}
          </div>
        </div>
        
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
