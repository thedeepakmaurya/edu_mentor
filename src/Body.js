import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='bg-[#E5E5E5] flex-1'>
      <Header />
      <Outlet />
    </div>
  )
}

export default Body