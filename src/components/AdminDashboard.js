import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useFirebase } from '../utils/Firebase';
import { doc, updateDoc } from 'firebase/firestore';

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

  const [editMode, setEditMode] = useState(false);
  const [currentTeacherId, setCurrentTeacherId] = useState(null);

  const firebase = useFirebase();
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await handleUpdateTeacher(currentTeacherId);
    } else {
      await firebase.signupTeacher(teacherData.email, teacherData.password, teacherData.role, teacherData.firstname, teacherData.lastname, teacherData.department, teacherData.subject);
    }
    setTeacherData({
      firstname: '',
      lastname: '',
      email: '',
      department: '',
      subject: '',
      password: '',
      role: 'teacher',
    });
    setEditMode(false);
    setCurrentTeacherId(null);
    firebase.listAllTeachers().then((teachers) => setTeachers(teachers.docs))
  };


  const handleDelete = async (id) => {
      await firebase.deleteTeacher(id)
      firebase.listAllTeachers().then((teachers) => setTeachers(teachers.docs))
  }

  const handleEdit = (teacher) => {
    setTeacherData({
      firstname: teacher.data().firstname,
      lastname: teacher.data().lastname,
      email: teacher.data().email,
      department: teacher.data().department,
      subject: teacher.data().subject,
      password: '', // Password won't be edited for security reasons
      role: teacher.data().role,
    });
    setEditMode(true);
    setCurrentTeacherId(teacher.id);
  };

  const handleUpdateTeacher = async (id) => {
    try {
      const teacherRef = doc(firebase.firestore, 'teachers', id);
      await updateDoc(teacherRef, {
        firstname: teacherData.firstname,
        lastname: teacherData.lastname,
        email: teacherData.email,
        department: teacherData.department,
        subject: teacherData.subject,
        role: teacherData.role,
      });
    } catch (error) {
      console.error("Error updating teacher: ", error);
    }
  };

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
            <h1 className='font-bold text-center text-xs'>{editMode ? 'EDIT TEACHER' : 'ADD TEACHER'}</h1>
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm ' name='firstname' placeholder='Enter first name' onChange={handleChange} value={teacherData.firstname} required />
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm ' name='lastname' placeholder='Enter last name' onChange={handleChange} value={teacherData.lastname} required />
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm ' name='department' placeholder='Enter department' onChange={handleChange} value={teacherData.department} required />
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm ' name='subject' placeholder='Enter subject' onChange={handleChange} value={teacherData.subject} required />
            <input type='text' className='hidden outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm ' name='role' placeholder='Enter Role' value={teacherData.role} readOnly/>
            <h1 className='font-bold text-center text-xs'>ACCOUNT</h1>
            <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm ' name='email' placeholder='Enter email' onChange={handleChange} value={teacherData.email} required />
            {!editMode && (
              <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm ' name='password' placeholder='Enter password' onChange={handleChange} value={teacherData.password} required />
            )}
            <button className='text-white bg-orange w-1/6 rounded-sm font-bold p-1 '>{editMode ? 'Update' : 'Save'}</button>
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
              return (
                <div key={teacher.id} className='flex items-center gap-10 text-nowrap'>
                  <p className='w-5'>{index + 1}</p>
                  <p className='w-24'>{teacher.data().firstname}</p>
                  <p className='w-24'>{teacher.data().lastname}</p>
                  <p className='w-24'>{teacher.data().department}</p>
                  <p className='w-24'>{teacher.data().subject}</p>
                  <p className='text-green-500 cursor-pointer' onClick={() => handleEdit(teacher)}><i className='bx bx-edit-alt align-middle'></i></p>
                  <p className='text-red-500 cursor-pointer' onClick={() => handleDelete(teacher.id)}><i className='bx bx-trash align-middle'></i></p>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className=' m-5 bg-white flex-1 overflow-scroll rounded-lg p-5 shadow-lg shadow-gray-400'>
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