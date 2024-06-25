import React from 'react'
import { NavLink } from 'react-router-dom'


const Header = () => {

  return (
    <div className='flex justify-between h-14 sticky top-0 bg-white items-center '>
      <h1 className='flex text-black font-bold text-3xl pl-3'>Dashboard</h1>
      <NavLink to='/user'><i className='bx bx-user-circle bx-md pr-3 cursor-pointer'></i></NavLink>
    </div>
  )
}

export default Header