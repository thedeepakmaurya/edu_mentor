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
          <p>Under maintainance...</p>

        </div>
      )

      :

      (
        <Unauthorized />
      )
  )
}

export default TeacherDashboard