import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useFirebase } from '../utils/Firebase';

const AdminDashboard = () => {

  const [teacherData, setTeacherData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    department: '',
    subject: '',
    password: '',
    role: 'teacher',
  });

  const firebase = useFirebase();
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleAddTeacher(teacherData.firstname, teacherData.lastname, teacherData.email, teacherData.password, teacherData.department, teacherData.subject, teacherData.role);
    await firebase.signupUser(teacherData.email, teacherData.password);
    setTeacherData({
      firstname: '',
      lastname: '',
      email: '',
      department: '',
      subject: '',
      password: '',
    });
  }

  const handleDelete = async (id) => {
      await firebase.deleteTeacher(id)
      firebase.listAllTeachers().then((teachers) => setTeachers(teachers.docs))
  }

  useEffect(() => {
    firebase.listAllTeachers().then((teachers) => setTeachers(teachers.docs))
    firebase.listAllStudents().then((students) => setStudents(students.docs))
  }, [firebase])

  return (
    <div>
      <Header />
      <div className='flex flex-1 m-5 gap-5'>
        <div className='w-full bg-oxfordBlue text-white pt-3 h-auto rounded-lg p-5 shadow-lg shadow-gray-400'>
          <form onSubmit={handleSubmit} className='flex items-center justify-center mt-3 gap-2 '>
            <h1 className='font-bold text-center text-xs'>ADD TEACHER</h1>
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange  pl-2 h-8 rounded-sm ' name='firstname' placeholder='Enter first name' onChange={handleChange} value={teacherData.firstname} required />
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange  pl-2 h-8  rounded-sm  ' name='lastname' placeholder='Enter last name' onChange={handleChange} value={teacherData.lastname} required />
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange   pl-2 h-8  rounded-sm  ' name='department' placeholder='Enter department' onChange={handleChange} value={teacherData.department} required />
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange  pl-2 h-8  rounded-sm  ' name='subject' placeholder='Enter subject' onChange={handleChange} value={teacherData.subject} required />
            <input type='text' className='hidden outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange  pl-2 h-8  rounded-sm  ' name='role' placeholder='Enter Role' value={teacherData.role} readOnly/>
            <h1 className='font-bold text-center text-xs'>ACCOUNT</h1>
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange  pl-2 h-8  rounded-sm  ' name='email' placeholder='Enter email' onChange={handleChange} value={teacherData.email} required />
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange  pl-2 h-8  rounded-sm  ' name='password' placeholder='Enter password' onChange={handleChange} value={teacherData.password} required />
            <button className='text-white bg-orange w-1/6 rounded-sm font-bold p-1 '>Save</button>
          </form>
        </div>
      </div>
      <div className=' m-5 bg-white h-60 overflow-scroll rounded-lg p-5 shadow-lg shadow-gray-400'>
        <h1 className='font-bold text-xl'>Teachers List!</h1>
        <div className='mt-2 w-full'>
          <div className='flex items-center gap-10 font-semibold'>
            <h2 className='w-5'>No.</h2>
            <h2 className='w-24'> First Name</h2>
            <h2 className='w-24'> Last Name</h2>
            <h2 className='w-24'> Department</h2>
            <h2 className='w-24'> Subject</h2>
            <hr className='border border-b'></hr>
          </div>
          {
            teachers.map((teacher, index) => {
              console.log(teacher)
              return (
                <div key={index} className='flex items-center gap-10 text-nowrap'>
                  <p className='w-5'>{index + 1}</p>
                  <p className='w-24'>{teacher.data().firstname}</p>
                  <p className='w-24'>{teacher.data().lastname}</p>
                  <p className='w-24'>{teacher.data().department}</p>
                  <p className='w-24'>{teacher.data().subject}</p>
                  <p className='text-green-500 cursor-pointer'><i className='bx bx-pencil align-middle'></i></p>
                  <p className='text-red-500 cursor-pointer' onClick={() => handleDelete(teacher.id)}><i className='bx bx-trash align-middle'></i></p>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className=' m-5 bg-white h-44 overflow-scroll rounded-lg p-5 shadow-lg shadow-gray-400'>
        <h1 className='font-bold text-xl'>Student Requests!</h1>
        <div className='mt-2 w-full'>
          <div className='flex items-center gap-10 font-semibold'>
            <h2 className='w-5'>No.</h2>
            <h2 className='w-24'> First Name</h2>
            <h2 className='w-24'> Last Name</h2>
            <h2 className='w-36'> Email</h2>
            <h2 className='w-24'> Contact</h2>
            <h2 className='w-24'> Address</h2>
            <h2 className='w-24'> State</h2>
            <hr className='border border-b'></hr>
          </div>
          {
            students.map((student, index) => {
              return (
                <div key={index} className='flex items-center gap-10 text-nowrap'>
                  <p className='w-5'>{index + 1}</p>
                  <p className='w-24'>{student.data().firstname}</p>
                  <p className='w-24'>{student.data().lastname}</p>
                  <p className='w-36'>{student.data().email}</p>
                  <p className='w-24'>{student.data().contact}</p>
                  <p className='w-24'>{student.data().address}</p>
                  <p className='w-24'>{student.data().state}</p>
                  <p className='text-green-500 cursor-pointer'><i className='bx bx-check align-middle' ></i></p>
                  <p className='text-red-500 cursor-pointer'><i className='bx bx-x align-middle' ></i></p>
                </div>
              )
            })
          }
          </div>
      </div>
    </div>
  )
}

export default AdminDashboard