import React from 'react';
import { Avatar } from 'antd';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const { user } = useUser();
    const userName = user?.firstName || user?.email || 'x';
    const userInitial = userName.charAt(0).toUpperCase();

    const navigate = useNavigate();

    return (   
        <div className="nav  h-16 bg-white shadow-md flex items-center justify-between px-4">
            <h1 onClick={() => navigate('/home')} className="text-xl font-semibold  h-full flex flex-col justify-center">HOME</h1>

            <Avatar 
                style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} 
                size="large"
                onClick={() => navigate('/account')}
                className="justify-self-end"
            >
                {userInitial}
            </Avatar>
        </div>
    )
}

export default Nav;