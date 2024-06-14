import React from 'react'

const Login = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-[30%]  bg-white rounded-xl p-5 pb-7'>
      <h1 className='font-bold text-xl mb-4'>Let's start!</h1>
        <form>
          <div className='w-full mt-2 flex flex-col'>
            <label className='font-bold text-md  '>Email</label>
            <input className='outline-none focus:border-oxfordBlue pl-2 h-8  border border-platinum rounded-lg  ' name='email' placeholder='Enter registered email' required/>
          </div>
          <div className='w-full mt-2 flex flex-col'>
            <label className='font-bold text-md  '>Password</label>
            <input className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg  ' name='password' placeholder='Enter password' required/>
          </div>
        </form>
        <button className='mt-4 w-full bg-oxfordBlue text-white rounded-lg p-2 '>Login</button>
      </div>
    </div>
  )
}

export default Login