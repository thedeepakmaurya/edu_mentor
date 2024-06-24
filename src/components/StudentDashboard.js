import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useFirebase } from '../utils/Firebase';
import Unauthorized from './Unauthorized';

const StudentDashboard = () => {

  //state variables
  const firebase = useFirebase();
  const [search, setSearch] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [filterdTeachers, setFilterdTeachers] = useState([]);
  const [date, setDate] = useState({});

  // function to get teacher and student list 
  useEffect(() => {
    firebase.listAllTeachers().then((teachers) => { setTeachers(teachers.docs); setFilterdTeachers(teachers.docs) })
  }, [firebase])

  // function to filter teachers
  useEffect(() => {
    setFilterdTeachers(teachers.filter((teacher) => teacher.data().firstname.toLowerCase().includes(search.toLowerCase()) || teacher.data().lastname.toLowerCase().includes(search.toLowerCase()) || teacher.data().department.toLowerCase().includes(search.toLowerCase()) || teacher.data().subject.toLowerCase().includes(search.toLowerCase())))
  },[search, teachers])

  // Function to handle date change for a specific teacher
  const handleDateChange = (teacherId, newDate) => {
    setDate((prevDates) => ({
      ...prevDates,
      [teacherId]: newDate,
    }));
  };


  // Function to schedule appointment
  const handleAppointment = (teacherId, e) => {
    e.preventDefault();
    firebase.scheduleAppointments(teacherId, date[teacherId]);
  }


  return (

    firebase.role === 'student' ?

      (<div>
        <Header />

        {/* Search bar */}
        <div className='flex items-center justify-center flex-col m-5'>
          <div className='flex items-center justify-center h-14 rounded-lg  shadow-lg shadow-gray-400 w-[60%] bg-oxfordBlue gap-5 '>
          <input className='w-[70%] text-white border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange outline-none' type='text' name='search' onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Serch mentor/ subject/ department' required />
        </div>

          {/* teacher list */}
          <div className=' w-full m-5 bg-white h-60 overflow-scroll rounded-lg p-5 shadow-lg shadow-gray-400'>
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
                      <form className='flex items-center gap-10 text-nowrap'>
                        <input className='w-5' value={index + 1} readOnly />
                        <input className='w-24' value={teacher.data().firstname} readOnly />
                        <input className='w-24' value={teacher.data().lastname} readOnly />
                        <input className='w-24' value={teacher.data().department} readOnly />
                        <input className='w-24' value={teacher.data().subject} readOnly />
                        <input className='w-auto outline-none' type='date' onChange={(e) => handleDateChange(teacher.id, e.target.value)} value={date[teacher.id]} required />
                        <button type='submit' className='border-b border-b-oxfordBlue hover:border-b-orange w-20 rounded-sm' onSubmit={() => handleAppointment(teacher.id)}>Schedule</button>
                      </form>
                    </div>
                  );
                })
              }
            </div>
          </div>

        </div>
      </div>)
      :
      (
        <Unauthorized />
      )
  )
}

export default StudentDashboard