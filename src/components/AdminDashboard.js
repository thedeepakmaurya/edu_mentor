import React, { useState } from 'react'
import Header from './Header'
import { useFirebase } from '../utils/Firebase';

const AdminDashboard = () => {

  const [teacherData, setTeacherData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    department: '',
    gender: '',
    subject: '',
    password: '',
  });


  const firebase = useFirebase();

  const handleChange = (e) => {
    setTeacherData({...teacherData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleAddTeacher(teacherData.firstname, teacherData.lastname, teacherData.email, teacherData.password, teacherData.department, teacherData.subject, teacherData.gender);
  }

  return (
    <div>
      <Header />
      <div className='flex flex-1 m-5 gap-5'>
        <div className='w-1/3 bg-white h-96 rounded-3xl p-5'>
          <h1 className='font-bold text-xl'>Add Teachers</h1>
          <form onSubmit={handleSubmit} className='mt-3'>
            <div className='flex w-full gap-2'>
              <div className='flex flex-col w-1/2'>
                <label className='font-bold text-md'>First Name</label>
                <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg  ' name='firstname' placeholder='Enter first name' onChange={handleChange} value={teacherData.firstname} required />
              </div>
              <div className='w-1/2 flex flex-col'>
                <label className='font-bold text-md'>Last Name</label>
                <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg  ' name='lastname' placeholder='Enter last name' onChange={handleChange} value={teacherData.lastname} required />
              </div>
            </div>
            <div className='flex flex-col w-full mt-2 '>
              <label className='font-bold text-md'>Email</label>
              <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg  ' name='email' placeholder='Enter email' onChange={handleChange} value={teacherData.email} required />
            </div>
            <div className='flex w-full gap-2 mt-2'>
              <div className='flex flex-col w-1/2'>
                <label className='font-bold text-md'>Department</label>
                <input type='text' className='outline-none focus:border-oxfordBlue  pl-2 h-8 border border-platinum rounded-lg  ' name='department' placeholder='Enter department' onChange={handleChange} value={teacherData.department} required />
              </div>
              <div className='w-1/2 flex flex-col'>
                <label className='font-bold text-md'>Subject</label>
                <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg  ' name='subject' placeholder='Enter subject' onChange={handleChange} value={teacherData.subject} required />
              </div>
            </div>
            <div className='flex w-full gap-2 mt-2'>
              <div className='flex flex-col w-1/2'>
                <label className='font-bold text-md'>Gender</label>
                <input type='text' className='outline-none focus:border-oxfordBlue  pl-2 h-8 border border-platinum rounded-lg  ' name='gender' placeholder='Enter gender' onChange={handleChange} value={teacherData.gender} required />
              </div>
              <div className='w-1/2 flex flex-col'>
                <label className='font-bold text-md'>Password</label>
                <input type='text' className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg  ' name='password' placeholder='Enter password' onChange={handleChange} value={teacherData.password} required />
              </div>
            </div>
            <div className='flex items-center justify-center  rounded-xl mt-4 bg-orange'>
              <button className='text-white w-full font-bold p-1'>Save</button>
            </div>
          </form>
        </div>
        <div className='w-2/3 bg-white h-96 rounded-3xl p-5'>
          <h1 className='font-bold text-xl'>Teachers List</h1>
        </div>
      </div>
      <div className='rounded-3xl bg-white m-5 flex-1 h-48'>
        <h1 className='font-bold text-xl p-5' >Student Registrations</h1>
      </div>
    </div>
  )
}

export default AdminDashboard