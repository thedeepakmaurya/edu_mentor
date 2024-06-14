import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='bg-platinum flex-1'>
      <Header />
      <Outlet />
    </div>
  )
}

export default Body