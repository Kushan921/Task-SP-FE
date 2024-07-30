import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; // Import your custom CSS file

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    const uname = localStorage.getItem("username")
    console.log(uname); 
    axios.get(`API_BASE_URL/task/${uname}`)
      .then(response => {
        console.log("res",response.data);
        setTasks(response.data);    
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const tasksForSelectedDate = tasks.filter(task => moment(task.date).isSame(selectedDate, 'day'));

  return (
    <div className="container mx-auto">
      <div className="container">
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date }) => moment(date).isSame(selectedDate, 'day') ? 'selected' : ''}
          />
        </div>
        <div className="tasks-container">
          <h2 className="text-xl font-bold my-4 selected-date">Tasks for {moment(selectedDate).format('MMMM D, YYYY')}</h2>
          <ul className="tasks-list">
            {tasksForSelectedDate.map(task => (
              <li key={task._id} className="my-2">
                {task.task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserTasks;
