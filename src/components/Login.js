import React, { useState, useEffect } from "react";
import { useFirebase } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate(" ");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData?.email || !formData?.password) {
      toast.error("Please provide both email and password.");
      return;
    }

    const userCredential = await firebase.signinUser(
      formData.email,
      formData.password
    );

    if (userCredential) {
      toast.success("Login Successfull");
    } else {
      toast.error("Invalid Credential");
    }
  };

  useEffect(() => {
    switch (firebase.role) {
      case "admin":
        navigate("/admin");
        break;
      case "student":
        navigate("/student");
        break;
      case "teacher":
        navigate("/teacher");
        break;
      default:
    }
  }, [firebase.role, navigate]);

  return (
    <div className="flex gap-5 items-center justify-center h-screen">
      <div className="w-[30%]  bg-white rounded-lg p-5 pb-7 shadow-lg shadow-gray-400">
        <h1 className="font-medium text-lg mb-4">
          Enter credential to continue!
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-2 flex flex-col">
            <label className=" text-sm  ">Email</label>
            <input
              type="text"
              className="outline-none text-sm focus:border-oxfordBlue pl-2 h-8  border border-platinum rounded-md  "
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter registered email"
              required
            />
          </div>
          <div className="w-full mt-2 flex flex-col">
            <label className=" text-sm  ">Password</label>
            <input
              type="text"
              className="outline-none text-sm focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-md  "
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Enter password"
              required
            />
          </div>
          <button className="mt-4 w-full bg-orange text-white rounded-md px-2 py-1.5 ">
            Login
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
