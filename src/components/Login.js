import React, { useState, useEffect } from 'react'
import { useFirebase } from '../utils/Firebase'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const firebase = useFirebase();
  const navigate = useNavigate(' ');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.signinUser(formData.email, formData.password);

  }

  useEffect(() => {
    switch (firebase.role) {
      case 'admin':
        navigate('/admin')
        break;
      case 'student':
        navigate('/student')
        break;
      case 'teacher':
        navigate('/teacher')
        break;
      default:
    }

  }, [firebase.role, navigate])


  return (
    <div className='flex gap-5 items-center justify-center h-screen'>
      <div className='w-[30%]  bg-white rounded-md p-5 pb-7 shadow-lg shadow-gray-400'>
        <h1 className='font-bold text-xl mb-4'>Login!</h1>
        <form onSubmit={handleSubmit}>
          <div className='w-full mt-2 flex flex-col'>
            <label className='font-bold text-md  '>Email</label>
            <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8  border border-platinum rounded-sm  ' name='email' onChange={handleChange} value={formData.email} placeholder='Enter registered email' required />
          </div>
          <div className='w-full mt-2 flex flex-col'>
            <label className='font-bold text-md  '>Password</label>
            <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-sm  ' name='password' onChange={handleChange} value={formData.password} placeholder='Enter password' required />
          </div>
          <button className='mt-4 w-full bg-orange text-white rounded-sm p-2 '>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login