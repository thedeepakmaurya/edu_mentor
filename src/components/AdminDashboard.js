import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useFirebase } from "../utils/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import Unauthorized from "./Unauthorized";
import { Toaster, toast } from "react-hot-toast";
import Loader from "./Loader";

const AdminDashboard = () => {
  const [teacherData, setTeacherData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    department: "",
    subject: "",
    password: "",
    role: "teacher",
  });

  const [editMode, setEditMode] = useState(false);
  const [currentTeacherId, setCurrentTeacherId] = useState(null);

  const firebase = useFirebase();
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const handleChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await handleUpdateTeacher(currentTeacherId);
      toast.success("Teacher data has successfully updated");
    } else {
      await firebase.signupTeacher(
        teacherData.email,
        teacherData.password,
        teacherData.role,
        teacherData.firstname,
        teacherData.lastname,
        teacherData.department,
        teacherData.subject
      );
      toast.success("Teacher has successfully registered");
    }
    setTeacherData({
      firstname: "",
      lastname: "",
      email: "",
      department: "",
      subject: "",
      password: "",
      role: "teacher",
    });
    setEditMode(false);
    setCurrentTeacherId(null);
    firebase.listAllTeachers().then((teachers) => setTeachers(teachers.docs));
  };

  // function to delete teacher data
  const handleDelete = async (id) => {
    await firebase.deleteTeacher(id);
    toast.success("Teacher deleted successfully");
    firebase.listAllTeachers().then((teachers) => setTeachers(teachers.docs));
  };

  // function to delete student data
  const handleStudentDelete = async (id) => {
    await firebase.deleteStudent(id);
    toast.success("Student deleted successfully");
    firebase.listAllStudents().then((students) => setStudents(students.docs));
  };

  // function to edit teacher data
  const handleEdit = (teacher) => {
    setTeacherData({
      firstname: teacher.data().firstname,
      lastname: teacher.data().lastname,
      email: teacher.data().email,
      department: teacher.data().department,
      subject: teacher.data().subject,
      password: "",
      role: teacher.data().role,
    });
    setEditMode(true);
    setCurrentTeacherId(teacher.id);
  };

  //function to update teacher data
  const handleUpdateTeacher = async (id) => {
    try {
      const teacherRef = doc(firebase.firestore, "teachers", id);
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
    firebase.listAllTeachers().then((teachers) => setTeachers(teachers.docs));
    firebase.listAllStudents().then((students) => setStudents(students.docs));
    firebase
      .listAllAppointments()
      .then((appointments) => setAppointments(appointments.docs));
  }, [firebase]);

  if (!firebase.user) {
    return <Loader />;
  }

  return firebase.role === "admin" ? (
    // if admin
    <div>
      {/* dashboard header */}
      <Header />
      <div className="flex flex-col m-5 gap-5">
        {/* Total Appointments & teachers */}
        <div className="flex w-full gap-5">
          <div className="flex flex-col items-center justify-center w-1/3 bg-orange h-20 rounded-lg shadow-lg shadow-gray-400 p-2">
            <h1 className="font-light text-lg text-white">TOTAL TEACHERS</h1>
            <p className="font-bold text-3xl text-white">{teachers.length}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3 bg-oxfordBlue h-20 rounded-lg shadow-lg shadow-gray-400 p-2">
            <h1 className="font-light text-lg text-white">TOTAL STUDENTS</h1>
            <p className="font-bold text-3xl text-white">{students.length}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3 bg-white h-20 rounded-lg shadow-lg shadow-gray-400 p-2">
            <h1 className="font-light text-lg ">TOTAL APPOINTMENTS</h1>
            <p className="font-bold text-3xl">{appointments.length}</p>
          </div>
        </div>

        {/* add teacher table */}
        <div className="w-full bg-oxfordBlue text-white pt-3 h-auto rounded-lg p-5 shadow-lg shadow-gray-400">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center mt-3 gap-2 "
          >
            <h1 className="font-bold text-center text-xs">
              {editMode ? "EDIT TEACHER" : "ADD TEACHER"}
            </h1>
            <input
              type="text"
              className=" text-sm outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm "
              name="firstname"
              placeholder="Enter first name"
              onChange={handleChange}
              value={teacherData.firstname}
              required
            />
            <input
              type="text"
              className=" text-sm outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm "
              name="lastname"
              placeholder="Enter last name"
              onChange={handleChange}
              value={teacherData.lastname}
              required
            />
            <input
              type="text"
              className=" text-sm outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm "
              name="department"
              placeholder="Enter department"
              onChange={handleChange}
              value={teacherData.department}
              required
            />
            <input
              type="text"
              className=" text-sm outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm "
              name="subject"
              placeholder="Enter subject"
              onChange={handleChange}
              value={teacherData.subject}
              required
            />
            <input
              type="text"
              className=" text-sm hidden outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm "
              name="role"
              placeholder="Enter Role"
              value={teacherData.role}
              readOnly
            />
            <h1 className="font-bold text-center text-xs">ACCOUNT</h1>
            <input
              type="text"
              className=" text-sm outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm "
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              value={teacherData.email}
              required
            />
            {!editMode && (
              <input
                type="text"
                className=" text-sm outline-none w-1/6 border-b border-b-oxfordBlueLight bg-oxfordBlue focus:border-b-orange pl-2 h-8 rounded-sm "
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                value={teacherData.password}
                required
              />
            )}
            <button
              type="submit"
              className="text-white bg-orange w-1/6 rounded-sm  py-1.5 "
            >
              {editMode ? "Update" : "Save"}
            </button>
          </form>
        </div>
      </div>

      {/* teacher list */}
      <div className="m-5 bg-white h-auto rounded-lg p-5 shadow-lg shadow-gray-400">
        <h1 className="font-light text-lg mb-2">TEACHER LIST</h1>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="font-medium border-b">
                <th className="px-4 py-3 ">No.</th>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={teacher.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 capitalize">{teacher.data().firstname}</td>
                  <td className="px-4 py-3 capitalize">{teacher.data().lastname}</td>
                  <td className="px-4 py-3 capitalize">{teacher.data().department}</td>
                  <td className="px-4 py-3 capitalize">{teacher.data().subject}</td>
                  <td className="px-4 py-3 capitalize flex gap-3">
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleEdit(teacher)}
                    >
                      <i className="bx bx-edit-alt bx-xs align-middle"></i>
                    </button>
                    <button
                      className="text-red-500 bx-xs hover:text-red-700"
                      onClick={() => handleDelete(teacher.id)}
                    >
                      <i className="bx bx-trash align-middle"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      {/* student list */}
      <div className="m-5 bg-white h-auto rounded-lg p-5 shadow-lg shadow-gray-400">
  <h1 className="font-light text-lg mb-2">STUDENTS LIST</h1>
  <table className="w-full text-sm text-left">
    <thead>
      <tr className="font-medium border-b">
        <th className="px-4 py-3">No.</th>
        <th className="px-4 py-3">First Name</th>
        <th className="px-4 py-3">Last Name</th>
        <th className="px-4 py-3">Email</th>
        <th className="px-4 py-3">Contact</th>
        <th className="px-4 py-3">Address</th>
        <th className="px-4 py-3">State</th>
        <th className="px-4 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      {students.map((student, index) => (
        <tr key={student.id} className="border-b hover:bg-gray-100">
          <td className="px-4 py-3">{index + 1}</td>
          <td className="px-4 py-3 capitalize">{student.data().firstname}</td>
          <td className="px-4 py-3 capitalize">{student.data().lastname}</td>
          <td className="px-4 py-3">{student.data().email}</td>
          <td className="px-4 py-3">{student.data().contact}</td>
          <td className="px-4 py-3 capitalize">{student.data().address}</td>
          <td className="px-4 py-3 capitalize">{student.data().state}</td>
          <td className="px-4 py-3 flex gap-3">
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleStudentDelete(student.id)}
            >
              <i className="bx bx-trash align-middle"></i>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      <Toaster />
    </div>
  ) : (
    //If not admin
    <Unauthorized />
  );
};

export default AdminDashboard;
