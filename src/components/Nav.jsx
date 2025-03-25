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
        <nav className="border fixed top-4 left-1/2 transform -translate-x-1/2 mb-10 w-full max-w-screen-lg px-4 py-2 mx-auto bg-white shadow-lg rounded-xl lg:px-8 lg:py-3 z-50">            <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
                <button onClick={() => {navigate('/home')}} className="mr-4 block hover:translate-y-1 cursor-pointer py-1.5 text-base text-red-800 font-semibold hover:text-sky-600">
                     <HomeOutlined className="text-lg hover:text-sky-600"/> Home
                </button>
                    {user && (
                        <Avatar 
                        style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} 
                        size="large"
                        onClick={() => navigate('/manage-all')}
                        className="cursor-pointer"
                    >
                        {userInitial}
                    </Avatar>
                    )   }
                    {!user && (
                        <button onClick={() => navigate('/login')} className="mr-4 block hover:translate-y-1 cursor-pointer py-1.5 text-base text-slate-800 font-semibold hover:text-sky-600">
                            Login
                        </button>
                    )}
                
           </div>
        </nav>
    )
}

export default Nav;