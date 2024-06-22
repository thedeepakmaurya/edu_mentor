import React from 'react'
import secure  from '../assets/img/secure.svg'


const Unauthorized = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <img className='w-96 h-96 ' alt='unauthorized' src={secure}/>
      </div>
  )
}

export default Unauthorized