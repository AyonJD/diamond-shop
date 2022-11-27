import React from 'react';
import { IoIosMail } from 'react-icons/io';
import { BsFillLockFill } from 'react-icons/bs';
import freeFire from '../../Asset/three.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState(null)
    const navigate = useNavigate();

    // useEffect(() => {
    //     setToken(localStorage.getItem('access_token'))
    //     if (token) {
    //         navigate('/', { replace: true });
    //     }
    // }, [token]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: email,
            password,
            grant_type: 'password'
        }

                navigate('/admin');
                setToken(data.access_token)
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
            
    };
    return (
        <div className='login_wrapper flex items-center justify-center md:h-[100vh]'>
            <div className='md:flex w-[95vw] m-auto md:w-[70%] overflow-hidden md:h-[343px] h-full p-1 my-4 bg-white'>
                <img className='max-w-[100%] overflow-hidden' src={freeFire} alt="" />
                <div className='w-full md:w-[50%] md:h-full p-4'>
                    <form onSubmit={(e) => { handleFormSubmit(e) }} className='login_form'>
                        <h1 className='text-xl font-semibold text-[#495055] mb-2'>Sign In</h1>
                        <p className='text-sm text-[#495055] mb-2'>User Name or Email Address</p>
                        <div className="flex items-center relative">
                            <IoIosMail className='absolute text-xl text-[#495055] left-3' />
                            <input type="text" onChange={e => { setEmail(e.target.value) }} placeholder='User Name or Email Address' className='w-full focus:outline-none focus:border-[#0B5ED7] border border-slate-300 rounded-full p-2 pl-10' />
                        </div>

                        <p className='text-sm text-[#495055] mb-2 mt-5'>Enter Password</p>
                        <div className="flex items-center relative">
                            <BsFillLockFill className='absolute text-xl text-[#495055] left-3' />
                            <input type="password" onChange={e => { setPassword(e.target.value) }} placeholder='Enter Password' className='w-full focus:outline-none focus:border-[#0B5ED7] border border-slate-300 rounded-full p-2 pl-10' />
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className=' text-[#000] text-sm font-semibold mt-4 cursor-pointer'>Don't have an account? <span onClick={()=> navigate('/signup')} className="text-[#0B5ED7]"> Sign Up</span></p>
                            <p className=' text-[#0B5ED7] text-sm font-semibold mt-4 cursor-pointer'>Forgot Password?</p>
                        </div>
                        
                        <input className='bg-[#3461ff] hover:bg-[#0B5ED7] transition-all delay-100 cursor-pointer mt-4 w-full rounded-full p-2 font-medium text-white' type="submit" value="Sign In" />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;