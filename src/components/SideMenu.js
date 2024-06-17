import React, { useState } from 'react'
import logo from '../assets/img/logo.png'
import { useFirebase } from '../utils/Firebase'

const SideMenu = () => {

    const firebase = useFirebase();

    const [isDropdown, setIsDropdown] = useState(false);

    const handleClick = () => {
        setIsDropdown(!isDropdown);
    }

    return (
        <div className='flex flex-col bg-black items-center text-white h-screen w-[14%]'>
            <div className='w-full flex justify-center'>
                <img className='w-44 mt-5 mb-5' alt='logo' src={logo} />
            </div>
            <div className='flex flex-col gap-2 w-full pl-6'>
                <h2 className='font-semibold text-lg '><i className='bx bx-home-alt-2 pr-3 align-middle'></i> <a href='/'>Home</a></h2>
                <div onClick={handleClick} >
                    <h2 className='font-semibold text-lg cursor-pointer'><i className='bx bx-stats pr-3 align-middle'></i> Dashboard<i className='bx bx-chevron-down align-middle pl-5'></i></h2>
                    {
                        isDropdown &&
                        (
                            <div className='pl-7 mt-2 w-full'>
                                <h2 className='font-semibold text-lg '><i className='bx bx-cog pr-3 align-middle'></i> <a href='/admin'>Admin</a></h2>
                                <h2 className='font-semibold text-lg '><i className='bx bx-laptop pr-3 align-middle'></i> <a href='/teacher'>Teacher</a></h2>
                                <h2 className='font-semibold text-lg '><i className='bx bx-book-reader pr-3 align-middle'></i> <a href='/student'>Student</a></h2>
                            </div>
                        )
                    }
                </div>
                {!firebase.isLoggedIn && (
                    <>
                        <h2 className='font-semibold text-lg '><i className='bx bx-user pr-3 align-middle'></i> <a href='/login'>Login</a></h2>
                        <h2 className='font-semibold text-lg'><i className='bx bx-edit-alt pr-3 align-middle'></i> <a href='/register'>Register</a></h2>
                    </>
                )}
            </div>

            <div className='w-[14%] pl-6  bottom-5 fixed'>
                {firebase.isLoggedIn && <h2 className='font-semibold text-lg cursor-pointer' onClick={() => firebase.signOutUser()}><i className='bx bx-log-out pr-3 align-middle'></i> Logout</h2>}
            </div>
        </div>
    )
}

export default SideMenu