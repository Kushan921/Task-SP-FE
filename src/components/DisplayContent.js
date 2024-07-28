import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Content.css'; 

const DisplayContent = () => {
  const [contents, setContents] = useState([]);
  const [pickedTasks, setPickedTasks] = useState({});

  useEffect(() => {
    // Fetch contents for today from the backend when the component mounts
    fetchContentsForToday();
  }, []);

  useEffect(() => {
    // Load picked tasks from localStorage on component mount
    const savedPickedTasks = JSON.parse(localStorage.getItem('pickedTasks'));
    if (savedPickedTasks) {
      setPickedTasks(savedPickedTasks);
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever pickedTasks changes
    localStorage.setItem('pickedTasks', JSON.stringify(pickedTasks));
  }, [pickedTasks]);

  const fetchContentsForToday = async () => {
    try {
      // Make a GET request to fetch contents for today
      const response = await axios.get('task-sp-production.up.railway.app/content/');
      setContents(response.data);
    } catch (error) {
      console.error('Error fetching contents:', error);
    }
  };

  const handleCheckboxChange = (contentId) => {
    
    const designerName = localStorage.getItem('username');
    console.log(designerName);
    // Update the pickedTasks state with the content ID and designer's name
    setPickedTasks(prevState => ({
      ...prevState,
      [contentId]: designerName
    }));
  };

  return (
    <div className="content-container ml-10">
      <div className="content-list-container">
        <h2 className='font-bold text-red-500 mt-4 text-lg mb-10'>Contents for Today</h2>
        <ul className="content-list">
          {contents.map(content => (
            <li key={content._id} className="content-item">
              <p>
                {content.content}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="designer-name-container">
        <h2 className='font-bold text-red-500 mt-4 text-lg mb-10'>Designer Name</h2>
        <ul className="designer-name-list">
          {contents.map(content => (
            <li key={content._id} className="designer-name-item">
              <span className="designer-name text-green-500 font-bold gap-3">
                Picked by {pickedTasks[content._id] || 'Not Picked'}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="checkbox-container">
        <h2 className='font-bold text-red-500 mt-4 text-lg mb-10'>Pick Task</h2>
        <ul className="checkbox-list">
          {contents.map(content => (
            <li key={content._id} className="checkbox-item">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(content._id)}
                />
                <span className="checkmark"></span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisplayContent;
