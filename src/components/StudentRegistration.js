import React, { useState } from "react";
import { useFirebase } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    address: "",
    state: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.signupStudent(
      studentData.email,
      studentData.password,
      studentData.role,
      studentData.firstname,
      studentData.lastname,
      studentData.contact,
      studentData.address,
      studentData.state
    );
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[50%]  rounded-lg p-5 h-auto bg-white shadow-lg shadow-gray-400">
        <h1 className="font-medium text-lg mb-4">Student Registration!</h1>
        <form className=" flex flex-col" onSubmit={handleSubmit}>
          <div className="flex gap-10 w-full mt-2">
            <div className="w-1/2 flex flex-col">
              <label className="text-sm ">First Name</label>
              <input
                type="text"
                className="outline-none text-sm focus:border-oxfordBlue pl-2 h-8  border border-platinum rounded-md "
                name="firstname"
                placeholder="Enter first name"
                value={studentData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2 flex flex-col">
              <label className="text-sm ">Last Name</label>
              <input
                type="text"
                className="outline-none text-sm focus:border-oxfordBlue pl-2 h-8  border border-platinum rounded-md "
                name="lastname"
                placeholder="Enter last name"
                value={studentData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="w-full mt-2 flex flex-col">
            <label className="text-sm  ">Email</label>
            <input
              type="email"
              className="outline-none text-sm focus:border-oxfordBlue w-[47%] pl-2 h-8  border border-platinum rounded-md "
              name="email"
              placeholder="Enter email"
              value={studentData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full mt-2 flex flex-col">
            <label className="text-sm ">Contact Number</label>
            <input
              type="text"
              className="outline-none text-sm focus:border-oxfordBlue pl-2 h-8 w-[47%]  border border-platinum rounded-md "
              name="contact"
              placeholder="Enter contact number"
              value={studentData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex w-full mt-2 gap-10">
            <div className="w-1/2 flex flex-col">
              <label className="text-sm  ">Address</label>
              <input
                type="text"
                className="outline-none text-sm focus:border-oxfordBlue pl-2 h-8  border border-platinum rounded-md "
                name="address"
                placeholder="Enter address detail"
                value={studentData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2 flex flex-col">
              <label className="text-sm  ">State</label>
              <input
                type="text"
                className="outline-none text-sm focus:border-oxfordBlue pl-2 h-8  border border-platinum rounded-md "
                name="state"
                placeholder="Enter state"
                value={studentData.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex w-full mt-2 gap-10 items-center">
            <div className="w-1/2 mb-3 flex flex-col">
              <label className="text-sm">Password</label>
              <input
                type="text"
                className="outline-none text-sm focus:border-oxfordBlue pl-2 h-8  border border-platinum rounded-md "
                name="password"
                placeholder="Enter password"
                value={studentData.password}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="hidden outline-none text-sm focus:border-oxfordBlue pl-2 h-8  border border-platinum rounded-md "
                name="role"
                placeholder="Enter role"
                value={studentData.role}
                readOnly
              />
            </div>
            <div className="w-1/2">
              <button className="bg-oxfordBlue py-1.5 mt-2 pl-9 pr-9 rounded-md  text-white">
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
