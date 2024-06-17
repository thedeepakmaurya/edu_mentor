import React, { useState } from 'react'
import { useFirebase } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const firebase = useFirebase();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    firstname: '',
    lastname: '',
    contact: '',
    address: '',
    state: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.studentData(studentData.firstname, studentData.lastname, studentData.email, studentData.contact, studentData.address, studentData.state, studentData.phone, studentData.password)
    await firebase.signupUser(studentData.email, studentData.password);
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-[50%]  rounded-lg p-5 h-auto bg-white shadow-lg shadow-gray-400'>
        <h1 className='font-bold text-xl mb-2'>Student Registration!</h1>
        <student className=' flex flex-col' onSubmit={handleSubmit}>
          <div className='flex gap-10 w-full mt-2'>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md '>First Name</label>
              <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-sm ' name='firstname' placeholder='Enter first name' value={studentData.firstname} onChange={handleChange} required />
            </div>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md '>Last Name</label>
              <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-sm ' name='lastname' placeholder='Enter last name' value={studentData.lastname} onChange={handleChange} required />
            </div>
          </div>
          <div className='w-full mt-2 flex flex-col'>
            <label className='font-bold text-md  '>Email</label>
            <input type='email' className='outline-none focus:border-oxfordBlue pl-2 h-8 w-[47%] border border-platinum rounded-sm ' name='email' placeholder='Enter email' value={studentData.email} onChange={handleChange} required />
          </div>
          <div className='w-full mt-2 flex flex-col'>
            <label className='font-bold text-md '>Contact Number</label>
            <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 w-[47%] border border-platinum rounded-sm ' name='contact' placeholder='Enter contact number' value={studentData.contact} onChange={handleChange} required />
          </div>
          <div className='flex w-full mt-2 gap-10'>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md  '>Address</label>
              <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-sm ' name='address' placeholder='Enter address detail' value={studentData.address} onChange={handleChange} required />
            </div>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md  '>State</label>
              <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-sm ' name='state' placeholder='Enter state' value={studentData.state} onChange={handleChange} required />
            </div>
          </div>
          <div className='flex w-full mt-2 gap-10 items-center'>
            <div className='w-1/2 mb-3 flex flex-col'>
              <label className='font-bold text-md'>Password</label>
              <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-sm ' name='password' placeholder='Enter password' value={studentData.password} onChange={handleChange} required />
            </div>
            <div className='w-1/2'>
              <button className='bg-oxfordBlue p-2 mt-2 pl-9 pr-9 rounded-sm text-white'>Create Account</button>
            </div>
          </div>
        </student>
      </div>

    </div>
  )
}

export default Register