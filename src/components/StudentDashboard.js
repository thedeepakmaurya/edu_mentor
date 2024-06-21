import React from 'react'
import Header from './Header'
import StudentAppointForm from './StudentAppointmentForm'
import { useFirebase } from '../utils/Firebase'
import Unauthorized from './Unauthorized'

const StudentDashboard = () => {

  //state variable
  const firebase = useFirebase()

  return (
      firebase.role === 'student' ?

        (<div>
          <Header />
          <StudentAppointForm />
          <p>Under maintainance...</p>
        </div>)

    :
    (
      <Unauthorized/>
    )
      
  )
}

export default StudentDashboard