import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import CompanyInfo from './CompanyInfo';
import { Avatar } from 'antd';
import checkIcon from '/check.png';
import SideMenu from './menu/SideMenu';

const Account = () => {
  const { user } = useUser();
  const userName = user?.firstName || user?.email || 'x';
  const userInitial = userName.charAt(0).toUpperCase();
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid grid-cols-6 h-full'> 
      <SideMenu  />
      <div className=" col-span-5 border w-full max-w-screen-lg mt-5 p-4 rounded-lg shadow-md w-full ">
      <h1 className="text-xl mb-4">Account Information</h1>
      <div className='flex items-center justify-start px-5'>
        <Avatar 
            style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} 
            size={60}
            className="cursor-pointer"
        >
            {userInitial}
        </Avatar>
        <div className='flex flex-col ml-4'>
          <div>
            <span className="font-medium">{user.firstName} {user.lastName}</span>
          </div>
          <div className='block'>
            {user.email}
              {user.isEmailVerified ? (
                  <img src={checkIcon} alt="verified" className="w-4 h-4 ml-1" />
              ) : 'not verified'}
          </div>
        </div>
        
      </div>
      
      
      <div className="space-y-2 mb-8">
   
     
       

      </div>
      <hr className='my-5' />

      <CompanyInfo />


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
