import React, { useState } from 'react'
import logo from '../assets/img/logo.png'
import { useFirebase } from '../utils/Firebase'
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const SideMenu = () => {

    const firebase = useFirebase();
    const navigate = useNavigate();

    const [isDropdown, setIsDropdown] = useState(false);

    const handleClick = () => {
        setIsDropdown(!isDropdown);
    }

    return (
        <div className='flex flex-col bg-black items-center text-white h-screen w-[15%]'>
            <div className='w-full flex justify-center'>
                <img className='w-44 mt-5 mb-5' alt='logo' src={logo} />
            </div>
            <div className='flex flex-col gap-2 w-full pl-6'>
                <h2 className='font-semibold  '><i className='bx bx-home-alt-2 pr-3 align-middle'></i> <Link to='/'>Home</Link></h2>
                {
                    firebase.isLoggedIn && (<div onClick={handleClick} >
                        <h2 className='font-semibold  cursor-pointer'><i className='bx bx-stats pr-3 align-middle'></i> Dashboard<i className='bx bx-chevron-down align-middle pl-5'></i></h2>
                        {
                            isDropdown &&
                            (
                                <div className='pl-7 mt-2 w-full'>
                                    <h2 className='font-semibold  '><i className='bx bx-cog pr-3 align-middle'></i> <Link to='/admin'>Admin</Link></h2>
                                    <h2 className='font-semibold  '><i className='bx bx-laptop pr-3 align-middle'></i> <Link to='/teacher'>Teacher</Link></h2>
                                    <h2 className='font-semibold  '><i className='bx bx-book-reader pr-3 align-middle'></i> <Link to='/student'>Student</Link></h2>
                                </div>
                            )
                        }
                    </div>)
                }
                {!firebase.isLoggedIn && (
                    <>
                        <h2 className='font-semibold  '><i className='bx bx-user pr-3 align-middle'></i> <Link to='/login'>Login</Link></h2>
                        <h2 className='font-semibold '><i className='bx bx-user-plus pr-3 align-middle'></i> <Link to='/register'>Register</Link></h2>
                    </>
                )}
            </div>

            <div className='w-[14%] pl-6  bottom-5 fixed'>
                {firebase.isLoggedIn && <h2 className='font-semibold  cursor-pointer' onClick={() => { firebase.signOutUser(); toast.success('Logout Successfully'); navigate('/'); }}><i className='bx bx-log-out pr-3 align-middle'></i> Logout</h2>}
                <Toaster />
            </div>
        </div>
    )
}

export default SideMenu