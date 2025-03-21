import React from 'react';
import { Avatar } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const { user } = useUser();
    const userName = user?.firstName || user?.email || 'x';
    const userInitial = userName.charAt(0).toUpperCase();

    const navigate = useNavigate();

    return (   
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 mb-10 w-full max-w-screen-lg px-4 py-2 mx-auto bg-white shadow-lg rounded-xl lg:px-8 lg:py-3 z-50">            <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
                <button onClick={() => {navigate('/home')}} className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold">
                     <HomeOutlined className="text-lg"/> Home
                </button>
                    {user && (
                        <Avatar 
                        style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} 
                        size="large"
                        onClick={() => navigate('/account')}
                        className="cursor-pointer"
                    >
                        {userInitial}
                    </Avatar>
                    )   }
                    {!user && (
                        <button onClick={() => navigate('/login')} className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold">
                            Login
                        </button>
                    )}
                
           </div>
        </nav>
    )
}

export default Nav;