import React from 'react'
import Header from './Header'
import Unauthorized from './Unauthorized'
import { useFirebase } from '../utils/Firebase';

const TeacherDashboard = () => {

  const firebase = useFirebase();

  return (

    firebase.role === 'teacher' ?

      (
        <div>
          <Header />
          <div>
            <h1>Student Dashboard</h1>

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


