import React from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-[50%]  rounded-2xl p-10 h-[450px] bg-white'>
        <h1 className='font-bold text-xl mb-2'>Student Registration</h1>
        <form className=' flex flex-col'>
          <div className='flex gap-10 w-full mt-2'>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md '>First Name</label>
              <input className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg required ' name='firstname' placeholder='Enter first name'/>
            </div>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md  '>Last Name</label>
              <input className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg required ' name='lastname' placeholder='Enter last name'/>
            </div>
          </div>
          <div className='w-full mt-2 flex flex-col'>
            <label className='font-bold text-md  '>Email</label>
            <input className='outline-none focus:border-oxfordBlue pl-2 h-8 w-[47%] border border-platinum rounded-lg required ' name='email' placeholder='Enter email'/>
          </div>
          <div className='w-full mt-2 flex flex-col'>
            <label className='font-bold text-md '>Contact Number</label>
            <input className='outline-none focus:border-oxfordBlue pl-2 h-8 w-[47%] border border-platinum rounded-lg required ' name='contact' placeholder='Enter contact number'/>
          </div>
          <div className='flex w-full mt-2 gap-10'>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md  '>Address</label>
              <input className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg required ' name='address' placeholder='Enter address detail'/>
            </div>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md  '>State</label>
              <input className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg required ' name='state' placeholder='Enter state'/>
            </div>
          </div>
          <div className='flex w-full mt-2 gap-10 items-center'>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md'>Password</label>
              <input className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg required ' name='password' placeholder='Enter password'/>
            </div>
            <div className='w-1/2'>
              <button className='bg-oxfordBlue p-2 mt-2 pl-9 pr-9 rounded-lg text-white' onClick={handleSubmit}>Continue</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Register