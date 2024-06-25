import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useFirebase } from '../utils/Firebase';
import { doc, updateDoc } from 'firebase/firestore';
import Unauthorized from './Unauthorized';
import { Toaster, toast } from 'react-hot-toast';
import Loader from './Loader';

const AdminDashboard = () => {

  //state variables
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
  const [appointments, setAppointments] = useState([]);

  //function to change input value
  const handleChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  }

  //function to add teacher data
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


  // function to delete teacher data
  const handleDelete = async (id) => {
    await firebase.deleteTeacher(id)
    toast.success('Teacher deleted successfully')
    firebase.listAllTeachers().then((teachers) => setTeachers(teachers.docs))
  }

  // function to delete student data
  const handleStudentDelete = async (id) => {
    await firebase.deleteStudent(id)
    toast.success('Student deleted successfully')
    firebase.listAllStudents().then((students) => setStudents(students.docs))
  }

  // function to edit teacher data
  const handleEdit = (teacher) => {
    setTeacherData({
      firstname: teacher.data().firstname,
      lastname: teacher.data().lastname,
      email: teacher.data().email,
      department: teacher.data().department,
      subject: teacher.data().subject,
      password: '',
      role: teacher.data().role,
    });
    setEditMode(true);
    setCurrentTeacherId(teacher.id);
  };

  //function to update teacher data
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

  // function to get teacher and student list 
  useEffect(() => {
    firebase.listAllTeachers().then((teachers) => setTeachers(teachers.docs))
    firebase.listAllStudents().then((students) => setStudents(students.docs))
    firebase.listAllAppointments().then((appointments) => setAppointments(appointments.docs))
  }, [firebase])

  if(!firebase.user){
    return <Loader/>
  }

  return (
    firebase.role === 'admin' ?

      // if admin
      (<div>
        {/* dashboard header */}
        <Header />
        <div className='flex flex-col m-5 gap-5'>

        {/* Total Appointments & teachers */}
        <div className='flex w-full gap-5'>
              <div className='flex flex-col items-center justify-center w-1/3 bg-orange h-20 rounded-lg shadow-lg shadow-gray-400 p-2'>
                <h1 className='font-light text-xl text-white'>TOTAL TEACHERS</h1>
                <p className='font-bold text-2xl text-white'>{teachers.length}</p>
              </div>
              <div className='flex flex-col items-center justify-center w-1/3 bg-oxfordBlue h-20 rounded-lg shadow-lg shadow-gray-400 p-2'>
                <h1 className='font-light text-xl text-white'>TOTAL STUDENTS</h1>
                <p className='font-bold text-2xl text-white'>{students.length}</p>
              </div>
              <div className='flex flex-col items-center justify-center w-1/3 bg-white h-20 rounded-lg shadow-lg shadow-gray-400 p-2'>
                <h1 className='font-light text-xl '>TOTAL APPOINTMENTS</h1>
                <p className='font-bold text-2xl'>{appointments.length}</p>
              </div>
            </div>

          {/* add teacher table */}
          <div className='w-full bg-oxfordBlue text-white pt-3 h-auto rounded-lg p-5 shadow-lg shadow-gray-400'>
            <form onSubmit={handleSubmit} className='flex items-center justify-center mt-3 gap-2 '>
              <h1 className='font-bold text-center text-xs'>{editMode ? 'EDIT TEACHER' : 'ADD TEACHER'}</h1>
              <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm ' name='firstname' placeholder='Enter first name' onChange={handleChange} value={teacherData.firstname} required />
              <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm ' name='lastname' placeholder='Enter last name' onChange={handleChange} value={teacherData.lastname} required />
              <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm ' name='department' placeholder='Enter department' onChange={handleChange} value={teacherData.department} required />
              <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm ' name='subject' placeholder='Enter subject' onChange={handleChange} value={teacherData.subject} required />
              <input type='text' className='hidden outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm ' name='role' placeholder='Enter Role' value={teacherData.role} readOnly />
              <h1 className='font-bold text-center text-xs'>ACCOUNT</h1>
              <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm ' name='email' placeholder='Enter email' onChange={handleChange} value={teacherData.email} required />
              {!editMode && (
                <input type='text' className='outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm ' name='password' placeholder='Enter password' onChange={handleChange} value={teacherData.password} required />
              )}
              <button type='submit' className='text-white bg-orange w-1/6 rounded-sm font-bold p-1 '  >{editMode ? 'Update' : 'Save'}</button>
            </form>
          </div>
        </div>

        {/* teacher list */}
        <div className=' m-5 bg-white h-60 overflow-scroll rounded-lg p-5 shadow-lg shadow-gray-400'>
          <h1 className='font-light text-xl'>TEACHER LIST</h1>
          <div className='mt-2 w-full'>
            <div className='flex items-center gap-10 font-semibold'>
              <h2 className='w-5'>No.</h2>
              <h2 className='w-24'> First Name</h2>
              <h2 className='w-24'> Last Name</h2>
              <h2 className='w-24'> Department</h2>
              <h2 className='w-24'> Subject</h2>
            </div>
            {
              teachers.map((teacher, index) => {
                return (
                  <div className='flex gap-10' key={teacher.id} >
                    <form className='flex items-center gap-10 text-nowrap'>
                      <input className='w-5' value={index + 1} readOnly />
                      <input className='w-24' value={teacher.data().firstname} readOnly />
                      <input className='w-24' value={teacher.data().lastname} readOnly />
                      <input className='w-24' value={teacher.data().department} readOnly />
                      <input className='w-24' value={teacher.data().subject} readOnly />
                    </form>
                    <p className='text-green-500 cursor-pointer' onClick={() => handleEdit(teacher)}><i className='bx bx-pencil align-middle'></i></p>
                    <p className='text-red-500 cursor-pointer' onClick={() => handleDelete(teacher.id)}><i className='bx bx-trash  align-middle'></i></p>
                  </div>
                );
              })
            }
          </div>
        </div>

        {/* student list */}
        <div className=' m-5 bg-white flex-1 overflow-scroll rounded-lg p-5 shadow-lg shadow-gray-400'>
          <h1 className='font-light text-xl'>STUDENTS LIST</h1>
          <div className='mt-2 w-full'>
            <div className='flex items-center gap-10 font-semibold'>
              <h2 className='w-5'>No.</h2>
              <h2 className='w-24'> First Name</h2>
              <h2 className='w-24'> Last Name</h2>
              <h2 className='w-36'> Email</h2>
              <h2 className='w-24'> Contact</h2>
              <h2 className='w-24'> Address</h2>
              <h2 className='w-24'> State</h2>
            </div>
            {
              students.map((student, index) => {
                return (
                  <div className='flex gap-10' key={student.id}>
                    <form className='flex items-center gap-10 text-nowrap'>
                      <input className='w-5' value={index + 1} readOnly />
                      <input className='w-24' value={student.data().firstname} readOnly />
                      <input className='w-24' value={student.data().lastname} readOnly />
                      <input className='w-36' value={student.data().email} readOnly />
                      <input className='w-24' value={student.data().contact} readOnly />
                      <input className='w-24' value={student.data().address} readOnly />
                      <input className='w-24' value={student.data().state} readOnly />
                    </form>
                    <p className='text-red-500 cursor-pointer' onClick={() => handleStudentDelete(student.id)}><i className='bx bx-trash align-middle' ></i></p>
                  </div>
                )
              })
            }
          </div>
        </div>
        <Toaster />
      </div>) :

      //If not admin
      (
          <Unauthorized />
      )
  )
}

export default AdminDashboard