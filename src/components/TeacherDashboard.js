import React, { useEffect, useState } from 'react'
import Header from './Header'
import Unauthorized from './Unauthorized'
import { useFirebase } from '../utils/Firebase';
import Loader from './Loader';

const TeacherDashboard = () => {

  const firebase = useFirebase();

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // function to get teacher and student list 
  useEffect(() => {
    if (firebase.user && firebase.user.uid) {
      firebase.listAllStudents().then((students) => setStudents(students.docs))
      firebase.listAllTeachers().then((teachers) => { setTeachers(teachers.docs) })
      firebase.listAllAppointments().then((appointments) => { setAppointments(appointments.docs) })
      let appoint = []
      appoint = appointments.filter((appointments) => appointments.data().teacherId === firebase.user.uid);
      setFilteredAppointments(appoint)
    }
  }, [appointments, firebase])


  // Get teacher name by ID
  const getStudentNameById = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
      return `${student.data().firstname} ${student.data().lastname}`;
    }
    return 'Unknown';
  };

  // Get teacher name by ID
  const getSubjectByTeacherId = (teacherId) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    if (teacher) {
      return `${teacher.data().subject}`;
    }
    return 'Unknown';
  };


  if(!firebase.user){
    return <Loader/>
  }

  return (

    firebase.role === 'teacher' ?

      (
        <div>
          <Header />
          <div className='flex items-center justify-center flex-col m-5'>

            {/* Total Appointments & Students */}
            <div className='flex w-full gap-5'>
              <div className='flex flex-col items-center justify-center w-1/2 bg-orange h-20 rounded-lg shadow-lg shadow-gray-400 p-2'>
                <h1 className='font-light text-xl text-white'>APPOINTMENTS</h1>
                <p className='font-bold text-2xl text-white'>{filteredAppointments.length}</p>
              </div>
              <div className='flex flex-col items-center justify-center w-1/2 bg-oxfordBlue h-20 rounded-lg shadow-lg shadow-gray-400 p-2'>
                <h1 className='font-light text-xl text-white'>STUDENTS</h1>
                <p className='font-bold text-2xl text-white'>{students.length}</p>
              </div>
            </div>

            {/* Scheduled Appointment Details */}
            <div className=' w-full m-5 bg-white h-auto overflow-scroll rounded-lg p-5 shadow-lg shadow-gray-400'>
              <h1 className='font-light text-xl'>APPOINTMENTS LIST</h1>
              <div className='mt-2 w-full'>
                <div className='flex items-center gap-10 font-semibold'>
                  <h2 className='w-5'>No.</h2>
                  <h2 className='w-24'> Student</h2>
                  <h2 className='w-24'> Subject</h2>
                  <h2 className='w-24'> Date</h2>
                </div>
                {
                  Array.isArray(filteredAppointments) && filteredAppointments.map((appointment, index) => {
                    return (
                      <div className='flex gap-10' key={appointment.id} >
                        <form className='flex items-center gap-10 text-nowrap'>
                          <input className='w-5' value={index + 1} readOnly />
                          <input className='w-24' value={getStudentNameById(appointment.data().studentID)} readOnly />
                          <input className='w-24' value={getSubjectByTeacherId(appointment.data().teacherId)} readOnly />
                          <input className='w-24 outline-none' value={appointment.data().date} readOnly />
                        </form>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      )

      :

      (
        <Unauthorized />
      )
  )
}

export default TeacherDashboard


