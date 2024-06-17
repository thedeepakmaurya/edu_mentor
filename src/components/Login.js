import React, { useEffect, useState } from 'react'
import { useFirebase } from '../utils/Firebase'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const firebase = useFirebase();
  const navigate = useNavigate();
  console.log(firebase)

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
    if (firebase.isLoggedIn) {
      if (firebase.user === 'admin') {
        navigate('/admin')
      } else if (firebase.user === 'teacher') {
        navigate('/teacher')
      } else if (firebase.user === 'student') {
        navigate('/student')
      } else navigate('/')
    }
  }, [firebase, navigate])

  return (
    <div className='flex gap-5 items-center justify-center h-screen'>
      <div className='w-[30%]  bg-white rounded-xl p-5 pb-7'>
        <h1 className='font-bold text-xl mb-4'>Login!</h1>
        <form onSubmit={handleSubmit}>
          <div className='w-full mt-2 flex flex-col'>
            <label className='font-bold text-md  '>Email</label>
            <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8  border border-platinum rounded-lg  ' name='email' onChange={handleChange} value={formData.email} placeholder='Enter registered email' required />
          </div>
          <div className='w-full mt-2 flex flex-col'>
            <label className='font-bold text-md  '>Password</label>
            <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg  ' name='password' onChange={handleChange} value={formData.password} placeholder='Enter password' required />
          </div>
          <button className='mt-4 w-full bg-orange text-white rounded-lg p-2 '>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login