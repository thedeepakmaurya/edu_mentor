import React from 'react'
import secure  from '../assets/img/secure.svg'


const Unauthorized = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <img className='w-80 h-80' alt='unauthorized' src={secure}/>
        <h1 className='font-bold text-2xl text-oxfordBlue'><span className='text-orange'>Unauthorized</span> access!</h1>
      </div>
  )
}

export default Unauthorized