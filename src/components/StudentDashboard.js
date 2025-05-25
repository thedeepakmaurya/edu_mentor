import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useFirebase } from '../utils/Firebase';
import Unauthorized from './Unauthorized';
import { Toaster, toast } from 'react-hot-toast';
import Loader from './Loader';

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


  if(!firebase.user){
    return <Loader/>
  }

  return (

    firebase.role === 'student' ?

      (<div>
        <Header />

        <div className='flex items-center justify-center flex-col m-5'>

  {/* Total Appointments & Teachers */}
  <div className='flex w-full gap-5'>
    <div className='flex flex-col items-center justify-center w-1/2 bg-orange h-20 rounded-lg shadow-lg shadow-gray-400 p-2'>
      <h1 className='font-light text-lg text-white'>APPOINTMENTS</h1>
      <p className='font-bold text-3xl text-white'>{filteredAppointments.length}</p>
    </div>
    <div className='flex flex-col items-center justify-center w-1/2 bg-oxfordBlue h-20 rounded-lg shadow-lg shadow-gray-400 p-2'>
      <h1 className='font-light text-lg text-white'>TEACHERS</h1>
      <p className='font-bold text-3xl text-white'>{teachers.length}</p>
    </div>
  </div>

  {/* Search bar */}
  <div className='flex items-center justify-center h-14 rounded-lg shadow-lg shadow-gray-400 w-full bg-oxfordBlue gap-5 mt-5'>
    <input
      className='w-[70%] text-white text-sm border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange outline-none'
      type='text'
      name='search'
      onChange={(e) => setSearch(e.target.value)}
      value={search}
      placeholder='Search mentor/ subject/ department'
      required
    />
  </div>

  {/* Mentor list table */}
  <div className='w-full m-5 bg-white h-auto overflow-x-scroll rounded-lg p-5 shadow-lg shadow-gray-400'>
    <h1 className='font-light text-xl mb-2'>MENTOR LIST</h1>
    <table className='w-full text-sm text-left'>
      <thead>
        <tr className='font-medium border-b'>
          <th className='px-4 py-3'>No.</th>
          <th className='px-4 py-3'>First Name</th>
          <th className='px-4 py-3'>Last Name</th>
          <th className='px-4 py-3'>Department</th>
          <th className='px-4 py-3'>Subject</th>
          <th className='px-4 py-3'>Appointment Date</th>
          <th className='px-4 py-3'>Action</th>
        </tr>
      </thead>
      <tbody>
        {filterdTeachers.map((teacher, index) => (
          <tr key={teacher.id} className='border-b hover:bg-gray-100'>
            <td className='px-4 py-3'>{index + 1}</td>
            <td className='px-4 py-3 capitalize'>{teacher.data().firstname}</td>
            <td className='px-4 py-3 capitalize'>{teacher.data().lastname}</td>
            <td className='px-4 py-3 capitalize'>{teacher.data().department}</td>
            <td className='px-4 py-3 capitalize'>{teacher.data().subject}</td>
            <td className='px-4 py-3'>
              <input
                type='date'
                className='outline-none border rounded px-2 py-1'
                onChange={(e) => handleDateChange(teacher.id, e.target.value)}
                value={date[teacher.id] || ''}
                required
              />
            </td>
            <td className='px-4 py-3'>
              <button
                onClick={(e) => handleAppointment(e, teacher.id)}
                className='bg-orange text-white px-3 py-1 rounded hover:bg-orange-600'
              >
                Schedule
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Scheduled Appointments table */}
  <div className='w-full m-5 bg-white h-auto overflow-x-scroll rounded-lg p-5 shadow-lg shadow-gray-400'>
    <h1 className='font-light text-xl mb-2'>SCHEDULED APPOINTMENTS</h1>
    <table className='w-full text-sm text-left'>
      <thead>
        <tr className='font-medium border-b'>
          <th className='px-4 py-3'>No.</th>
          <th className='px-4 py-3'>Mentor</th>
          <th className='px-4 py-3'>Subject</th>
          <th className='px-4 py-3'>Date</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(filteredAppointments) && filteredAppointments.map((appointment, index) => (
          <tr key={appointment.id} className='border-b hover:bg-gray-100'>
            <td className='px-4 py-3'>{index + 1}</td>
            <td className='px-4 py-3 capitalize'>{getTeacherNameById(appointment.data().teacherId)}</td>
            <td className='px-4 py-3 capitalize'>{getSubjectByTeacherId(appointment.data().teacherId)}</td>
            <td className='px-4 py-3'>{appointment.data().date}</td>
          </tr>
        ))}
      </tbody>
    </table>
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


