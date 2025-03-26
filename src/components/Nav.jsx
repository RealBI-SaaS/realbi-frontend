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
        <nav className="border fixed w-full grid grid-cols-2">
            <div className='bg-blue-600'>
                <button onClick={() => {navigate('/home')}} className="mr-4 block hover:translate-y-1 cursor-pointer py-1.5 text-base text-red-800 font-semibold hover:text-sky-600">
                     <HomeOutlined className="text-lg hover:text-sky-600"/> Home
                </button>

            </div>


            <div className='bg-red-600'>
                {user && (
                    <Avatar 
                    style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} 
                    size="large"
                    onClick={() => navigate('/account')}
                    className="cursor-pointer"
                >
                    {userInitial}
>>>>>>> e771b47 (sign in, up ... css started)
                    </Avatar>
                )   }
                {!user && (
                    <button onClick={() => navigate('/login')} className="mr-4 block hover:translate-y-1 cursor-pointer py-1.5 text-base text-slate-800 font-semibold hover:text-sky-600">
                        Login
                    </button>
                )}

            </div>

            <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
                                                    
           </div>
        </nav>
    )
}

export default Nav;
