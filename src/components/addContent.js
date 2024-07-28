import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const AddContent = () => {

  const [formData,setFormData] = useState({
    
    date:'',
    content:''
    
  })

  function handleChange(e){
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault();
    const username = localStorage.getItem('username'); // Retrieve username from localStorage
    const dataToSend = {
      ...formData,
      username: username // Add username to the form data
    };
    console.log(dataToSend);
    axios.post('task-sp-production.up.railway.app/content/add', dataToSend)
      .then((res) => {
        console.log(res);
        toast.success('Content Added Successfully:', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        setFormData({
          date: '',
          content: ''
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
          progress: undefined,
        });
      });
  }
  

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-24 p-8 bg-white rounded-lg shadow-md h-96" style={{width:'40%'}}>
     
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          onChange={handleChange}
          value={formData.date}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="task" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          name="content"
          id="content"
          rows="6"
          placeholder="Enter Content"
          onChange={handleChange}
          value={formData.content}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddContent;
