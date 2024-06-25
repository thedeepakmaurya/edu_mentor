import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useFirebase } from '../utils/Firebase';
import Unauthorized from './Unauthorized';
import { Toaster, toast } from 'react-hot-toast';

const StudentDashboard = () => {

  //state variables
  const firebase = useFirebase();
  const [search, setSearch] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [filterdTeachers, setFilterdTeachers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [date, setDate] = useState({});


  // function to get teacher and appointment list 
  useEffect(() => {
    if (firebase.user && firebase.user.uid) {
      firebase.listAllTeachers().then((teachers) => { setTeachers(teachers.docs); setFilterdTeachers(teachers.docs) })
      setFilterdTeachers(teachers.filter((teacher) => teacher.data().firstname.toLowerCase().includes(search.toLowerCase()) || teacher.data().lastname.toLowerCase().includes(search.toLowerCase()) || teacher.data().department.toLowerCase().includes(search.toLowerCase()) || teacher.data().subject.toLowerCase().includes(search.toLowerCase())))
      firebase.listAllAppointments().then((appointments) => { setAppointments(appointments.docs) })
      let appoint = []
      appoint = appointments.filter((appointments) => appointments.data().studentID === firebase.user.uid);
      setFilteredAppointments(appoint)
    }
  }, [appointments, search, firebase, teachers])



  // Function to handle date change for a specific teacher
  const handleDateChange = (teacherId, newDate) => {
    setDate((prevDates) => ({
      ...prevDates,
      [teacherId]: newDate,
    }));
  };


  // Function to schedule appointment
  const handleAppointment = (e, teacherId) => {
    e.preventDefault();
    const selectedDate = date[teacherId];
    firebase.scheduleAppointments(teacherId, selectedDate);
    toast.success('Appointment scheduled successfully!');
  };

  // Get teacher name by ID
  const getTeacherNameById = (teacherId) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    if (teacher) {
      return `${teacher.data().firstname} ${teacher.data().lastname}`;
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


  return (

    firebase.role === 'student' ?

      (<div>
        <Header />

        <div className='flex items-center justify-center flex-col m-5'>

          {/* Total Appointments & Students */}
          <div className='flex w-full gap-5'>
            <div className='flex flex-col items-center justify-center w-1/2 bg-orange h-20 rounded-lg shadow-lg shadow-gray-400 p-2'>
              <h1 className='font-light text-xl text-white'>APPOINTMENTS</h1>
              <p className='font-bold text-2xl text-white'>{filteredAppointments.length}</p>
            </div>
            <div className='flex flex-col items-center justify-center w-1/2 bg-oxfordBlue h-20 rounded-lg shadow-lg shadow-gray-400 p-2'>
              <h1 className='font-light text-xl text-white'>TEACHERS</h1>
              <p className='font-bold text-2xl text-white'>{teachers.length}</p>
            </div>
          </div>

          {/* Search bar */}
          <div className='flex items-center justify-center h-14 rounded-lg  shadow-lg shadow-gray-400 w-full bg-oxfordBlue gap-5 mt-5'>
            <input className='w-[70%] text-white border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange outline-none' type='text' name='search' onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search mentor/ subject/ department' required />
          </div>

          {/* teacher list */}
          <div className=' w-full m-5 bg-white h-auto overflow-scroll rounded-lg p-5 shadow-lg shadow-gray-400'>
            <h1 className='font-light text-xl'>MENTOR LIST</h1>
            <div className='mt-2 w-full'>
              <div className='flex items-center gap-10 font-semibold'>
                <h2 className='w-5'>No.</h2>
                <h2 className='w-24'> First Name</h2>
                <h2 className='w-24'> Last Name</h2>
                <h2 className='w-24'> Department</h2>
                <h2 className='w-24'> Subject</h2>
                <h2 className='w-auto'> Appointment</h2>
              </div>
              {
                filterdTeachers.map((teacher, index) => {
                  return (
                    <div className='flex gap-10' key={teacher.id} >
                      <form onSubmit={(e) => handleAppointment(e, teacher.id)} className='flex items-center gap-10 text-nowrap'>
                        <input className='w-5' value={index + 1} readOnly />
                        <input className='w-24' value={teacher.data().firstname} readOnly />
                        <input className='w-24' value={teacher.data().lastname} readOnly />
                        <input className='w-24' value={teacher.data().department} readOnly />
                        <input className='w-24' value={teacher.data().subject} readOnly />
                        <input className='w-auto outline-none' type='date' onChange={(e) => handleDateChange(teacher.id, e.target.value)} value={date[teacher.id] || ' '} required />
                        <button type='submit' className='border-b border-b-oxfordBlue hover:border-b-orange w-20 rounded-sm'>Schedule</button>
                      </form>
                    </div>
                  )
                })
              }
            </div>
          </div>

          {/* Scheduled Appointment Details */}
          <div className=' w-full m-5 bg-white h-auto overflow-scroll rounded-lg p-5 shadow-lg shadow-gray-400'>
            <h1 className='font-light text-xl'>SCHEDULED APPOINTMENTS</h1>
            <div className='mt-2 w-full'>
              <div className='flex items-center gap-10 font-semibold'>
                <h2 className='w-5'>No.</h2>
                <h2 className='w-24'> Mentor</h2>
                <h2 className='w-24'> Subject</h2>
                <h2 className='w-24'> Date</h2>
              </div>
              {
                Array.isArray(filteredAppointments) && filteredAppointments.map((appointment, index) => {
                  return (
                    <div className='flex gap-10' key={appointment.id} >
                      <form className='flex items-center gap-10 text-nowrap'>
                        <input className='w-5' value={index + 1} readOnly />
                        <input className='w-24' value={getTeacherNameById(appointment.data().teacherId)} readOnly />
                        <input className='w-24' value={getSubjectByTeacherId(appointment.data().teacherId)} readOnly />
                        <input className='w-24 outline-none' value={appointment.data().date} readOnly />
                      </form>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <Toaster />
        </div>
      </div>)
      :
      (
        <Unauthorized />
      )
  )
}

export default StudentDashboard


