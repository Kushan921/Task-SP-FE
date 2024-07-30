import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);

    axios.post(`${API_BASE_URL}/user/login`, formData)
      .then((res) => {
        const role = res.data.role;
        toast.success('Login successful');
        localStorage.setItem("username", formData.username);

        if (role === 'graphic') {
          navigate("/designerdashboard"); 
        } else if (role === 'content') {
          navigate("/contentDashboard"); 
        } else if(role === 'admin') {
          navigate("/dashboard"); 
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Login failed');
      });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-44 max-w-md mt-32 mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className='font-bold mb-8 text-3xl' style={{color:"#095678"}}>Login</h1>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={formData.username}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={formData.password}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
