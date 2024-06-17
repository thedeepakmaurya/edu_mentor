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
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleAddTeacher(teacherData.firstname, teacherData.lastname, teacherData.email, teacherData.password, teacherData.department, teacherData.subject, teacherData.gender);
    await firebase.signupUser(teacherData.email, teacherData.password);

  }

  return (
    <div>
      <Header />
      <div className='flex flex-1 m-5 gap-5'>
        <div className='w-full bg-oxfordBlue text-white pt-3 h-auto rounded-lg p-5 shadow-lg shadow-gray-400'>
          <form onSubmit={handleSubmit} className='flex mt-3 gap-2 '>
            <h1 className='font-bold text-center text-xs'>ADD TEACHER</h1>
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange  pl-2 h-8 rounded-sm ' name='firstname' placeholder='Enter first name' onChange={handleChange} value={teacherData.firstname} required />
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange  pl-2 h-8  rounded-sm  ' name='lastname' placeholder='Enter last name' onChange={handleChange} value={teacherData.lastname} required />
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange  pl-2 h-8  rounded-sm  ' name='email' placeholder='Enter email' onChange={handleChange} value={teacherData.email} required />
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange  pl-2 h-8  rounded-sm  ' name='gender' placeholder='Enter gender' onChange={handleChange} value={teacherData.gender} required />
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange   pl-2 h-8  rounded-sm  ' name='department' placeholder='Enter department' onChange={handleChange} value={teacherData.department} required />
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange  pl-2 h-8  rounded-sm  ' name='subject' placeholder='Enter subject' onChange={handleChange} value={teacherData.subject} required />
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange  pl-2 h-8  rounded-sm  ' name='password' placeholder='Enter password' onChange={handleChange} value={teacherData.password} required />
            <button className='text-white bg-orange w-1/6 rounded-sm font-bold p-1 '>Save</button>
          </form>
        </div>
      </div>
      <div className=' m-5 bg-white h-auto rounded-lg p-5 shadow-lg shadow-gray-400'>
        <h1 className='font-bold text-xl'>Teachers List!</h1>
      </div>
      <div className='rounded-lg bg-white m-5 flex-1 h-auto shadow-lg shadow-gray-400'>
        <h1 className='font-bold text-xl p-5' >Student Requests!</h1>
      </div>
    </div>
  )
}

export default AdminDashboard