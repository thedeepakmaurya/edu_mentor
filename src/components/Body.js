import React from 'react'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='bg-platinum flex-1'>
      <Outlet />
    </div>
  )
}

export default Body