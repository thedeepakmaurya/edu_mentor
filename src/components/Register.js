import React, { useState } from 'react'
import { useFirebase } from './utils/context/Firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const firebase = useFirebase();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    contact: '',
    addresss: '',
    state: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.signupUser(formData.email, formData.password);
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-[50%]  rounded-2xl p-10 h-[450px] bg-white'>
        <h1 className='font-bold text-xl mb-2'>Student Registration</h1>
        <form className=' flex flex-col' onSubmit={handleSubmit}>
          <div className='flex gap-10 w-full mt-2'>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md '>First Name</label>
              <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg ' name='firstname' placeholder='Enter first name'  value={formData.firstname} onChange={handleChange} required />
            </div>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md '>Last Name</label>
              <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg ' name='lastname' placeholder='Enter last name' value={formData.lastname} onChange={handleChange} required />
            </div>
          </div>
          <div className='w-full mt-2 flex flex-col'>
            <label className='font-bold text-md  '>Email</label>
            <input type='email' className='outline-none focus:border-oxfordBlue pl-2 h-8 w-[47%] border border-platinum rounded-lg ' name='email' placeholder='Enter email' value={formData.email} onChange={handleChange} required />
          </div>
          <div className='w-full mt-2 flex flex-col'>
            <label className='font-bold text-md '>Contact Number</label>
            <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 w-[47%] border border-platinum rounded-lg ' name='contact' placeholder='Enter contact number' value={formData.contact} onChange={handleChange} required />
          </div>
          <div className='flex w-full mt-2 gap-10'>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md  '>Address</label>
              <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg ' name='address' placeholder='Enter address detail' value={formData.address} onChange={handleChange} required />
            </div>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md  '>State</label>
              <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg ' name='state' placeholder='Enter state' value={formData.state} onChange={handleChange} required />
            </div>
          </div>
          <div className='flex w-full mt-2 gap-10 items-center'>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md'>Password</label>
              <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg ' name='password' placeholder='Enter password' value={formData.password} onChange={handleChange} required />
            </div>
            <div className='w-1/2'>
              <button className='bg-oxfordBlue p-2 mt-2 pl-9 pr-9 rounded-lg text-white'>Create Account</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Register