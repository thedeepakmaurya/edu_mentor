import React, { useEffect, useState } from "react";
import Header from "./Header";
import Unauthorized from "./Unauthorized";
import { useFirebase } from "../utils/Firebase";
import Loader from "./Loader";

const TeacherDashboard = () => {
  const firebase = useFirebase();

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // function to get teacher and student list
  useEffect(() => {
    if (firebase.user && firebase.user.uid) {
      firebase.listAllStudents().then((students) => setStudents(students.docs));
      firebase.listAllTeachers().then((teachers) => {
        setTeachers(teachers.docs);
      });
      firebase.listAllAppointments().then((appointments) => {
        setAppointments(appointments.docs);
      });
      let appoint = [];
      appoint = appointments.filter(
        (appointments) => appointments.data().teacherId === firebase.user.uid
      );
      setFilteredAppointments(appoint);
    }
  }, [appointments, firebase]);

  // Get teacher name by ID
  const getStudentNameById = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
      return `${student.data().firstname} ${student.data().lastname}`;
    }
    return "Unknown";
  };

  // Get teacher name by ID
  const getSubjectByTeacherId = (teacherId) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    if (teacher) {
      return `${teacher.data().subject}`;
    }
    return "Unknown";
  };

  if (!firebase.user) {
    return <Loader />;
  }

  return firebase.role === "teacher" ? (
    <div>
      <Header />
      <div className="flex items-center justify-center flex-col m-5">
        {/* Total Appointments & Students */}
        <div className="flex w-full gap-5">
          <div className="flex flex-col items-center justify-center w-1/2 bg-orange h-20 rounded-lg shadow-lg shadow-gray-400 p-2">
            <h1 className="font-light text-lg text-white">APPOINTMENTS</h1>
            <p className="font-bold text-3xl text-white">
              {filteredAppointments.length}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2 bg-oxfordBlue h-20 rounded-lg shadow-lg shadow-gray-400 p-2">
            <h1 className="font-light text-lg text-white">STUDENTS</h1>
            <p className="font-bold text-3xl text-white">{students.length}</p>
          </div>
        </div>

        {/* Scheduled Appointment Details */}
        <div className=" w-full m-5 bg-white h-auto  rounded-lg p-5 shadow-lg shadow-gray-400">
          <h1 className="font-light text-lg">APPOINTMENTS LIST</h1>
          <div className="mt-2 w-full">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="font-medium border-b">
                  <th className="px-4 py-3">No.</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredAppointments) &&
                  filteredAppointments.map((appointment, index) => (
                    <tr
                      key={appointment.id}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 capitalize">
                        {getStudentNameById(appointment.data().studentID)}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {getSubjectByTeacherId(appointment.data().teacherId)}
                      </td>
                      <td className="px-4 py-3">{appointment.data().date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Unauthorized />
  );
};

export default TeacherDashboard;
