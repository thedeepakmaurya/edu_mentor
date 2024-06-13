import React from 'react'
import logo from '../assets/img/logo.png'

const SideMenu = () => {

    return (
        <div className='flex flex-col bg-black items-center text-white h-screen w-52'>
            <div className='w-full flex items-center justify-center'>
                <img className='w-44 mt-5 mb-5' alt='logo' src={logo} />
            </div>
            <div className='flex flex-col gap-2 w-full pl-6'>
                <h2 className='font-semibold text-lg'><i className='bx bxs-user pr-3'></i> <a href='/login'>Login</a></h2>
                <h2 className='font-semibold text-lg'><i className='bx bxs-user-plus pr-3'></i> <a href='/register'>Register</a></h2>
                <h2 className='font-semibold text-lg'><i className='bx bxs-info-circle pr-3'></i> <a href='/about'>About</a></h2>
            </div>
            <div className='w-52 pl-6  bottom-5 fixed'>
                <h2 className='font-semibold text-lg'><i className='bx bx-log-out pr-3'></i> Logout</h2>
            </div>
        </div>
    )
}

export default SideMenu