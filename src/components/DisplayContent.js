import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DisplayContent = () => {
  const [contents, setContents] = useState([]);
  const [pickedTasks, setPickedTasks] = useState({});

  useEffect(() => {
    fetchContentsForToday();
  }, []);

  useEffect(() => {
    const savedPickedTasks = JSON.parse(localStorage.getItem('pickedTasks')) || {};
    setPickedTasks(savedPickedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('pickedTasks', JSON.stringify(pickedTasks));
  }, [pickedTasks]);

  const fetchContentsForToday = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/content/`);
      setContents(response.data);
    } catch (error) {
      console.error('Error fetching contents:', error);
      // Optionally display an error message to the user
    }
  };

  const handleCheckboxChange = (contentId) => {
    const designerName = localStorage.getItem('username') || 'Unknown Designer';
    setPickedTasks(prevState => ({
      ...prevState,
      [contentId]: pickedTasks[contentId] ? null : designerName
    }));
  };

  return (
    <div className="p-4 space-y-8">
      <div className="space-y-4">
        <h2 className='font-bold text-red-500 text-lg'>Contents for Today</h2>
        <ul className="space-y-2">
          {contents.map(content => (
            <li key={content._id} className="border p-4 rounded-lg shadow-sm">
              <p>{content.content}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <h2 className='font-bold text-red-500 text-lg'>Designer Name</h2>
        <ul className="space-y-2">
          {contents.map(content => (
            <li key={content._id} className="border p-4 rounded-lg shadow-sm">
              <span className="text-green-500 font-bold">
                Picked by {pickedTasks[content._id] || 'Not Picked'}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <h2 className='font-bold text-red-500 text-lg'>Pick Task</h2>
        <ul className="space-y-2">
          {contents.map(content => (
            <li key={content._id} className="flex items-center border p-4 rounded-lg shadow-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!!pickedTasks[content._id]}
                  onChange={() => handleCheckboxChange(content._id)}
                  className="form-checkbox"
                />
                <span className="ml-2">Select</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisplayContent;
