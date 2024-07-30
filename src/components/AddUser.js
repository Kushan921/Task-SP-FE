import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${API_BASE_URL}/user/add`, formData)
      .then((res) => {
        console.log(res);
        toast.success('User Added Successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined
        });
        setFormData({
          username: '',
          password: '',
          role: '' // Ensure role is also reset
        });
      })
      .catch((error) => {
        toast.error('Error submitting form data', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined
        });
      });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md w-96 h-2/3"
    >
      <h1 className='font-bold mb-8 text-3xl' style={{ color: "#095678" }}>Add User</h1>
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
      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          User Role
        </label>
        <select 
          name="role" 
          id="role" 
          onChange={handleChange} 
          value={formData.role} 
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          defaultValue="" // Prevent the initial placeholder from being submitted
        >
          <option value="" disabled>- User Role -</option>
          <option value="graphic">Graphic Designer</option>
          <option value="content">Content Writer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 mt-8 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddUser;
