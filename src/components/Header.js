import React from 'react'
import { NavLink } from 'react-router-dom'
import { useFirebase } from '../utils/Firebase'


const Header = () => {

  const firebase = useFirebase()

  const userDashboard = () => {
    if (firebase.role === 'admin') {
      return 'ADMIN'
    } else if (firebase.role === 'teacher') {
      return 'MENTOR'
    } else if (firebase.role ==='student') {
      return 'STUDENT'
    } else {
      return ' '
    }
  }

  return (
    <div className='flex justify-between h-14 sticky top-0 bg-white items-center '>
      <h1 className='text-black font-medium text-3xl pl-3'>{userDashboard()}</h1>
      <NavLink to='/user'><i className='bx bxs-user-detail bx-md pr-3 cursor-pointer'></i></NavLink>
    </div>
  )
}

export default Header