import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TaskForm = () => {
  const [formData, setFormData] = useState({
    designer: '',
    date: '',
    task: '',
    page: ''
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.designer || !formData.date || !formData.task || !formData.page) {
      toast.error('Please fill in all fields', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/task/add`, formData);
      console.log(response);
      toast.success('Task Added Successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      setFormData({
        designer: '',
        date: '',
        task: '',
        page: ''
      });
    } catch (error) {
      toast.error('Error submitting form data', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md w-96 h-2/3">
      <div className="mb-4">
        <label htmlFor="designer" className="block text-sm font-medium text-gray-700">
          Designer
        </label>
        <select
          name="designer"
          id="designer"
          onChange={handleChange}
          value={formData.designer}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Designer</option>
          <option value="ushenya">Ushenya</option>
          <option value="ashen">Ashen</option>
          <option value="navindu">Navindu</option>
          <option value="chamodya">Chamodya</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="page" className="block text-sm font-medium text-gray-700">
          Page
        </label>
        <select
          name="page"
          id="page"
          onChange={handleChange}
          value={formData.page}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select FB Page</option>
          <option value="springpal">Spring Pal</option>
          <option value="yahana">Yahana</option>
          <option value="gotosleep">Go to Sleep</option>
        </select>
      </div>
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
          Task
        </label>
        <textarea
          name="task"
          id="task"
          rows="4"
          placeholder="Enter task details"
          onChange={handleChange}
          value={formData.task}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
