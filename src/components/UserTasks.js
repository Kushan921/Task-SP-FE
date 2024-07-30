import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; // Ensure this CSS file exists and is correctly applied

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const uname = localStorage.getItem("username");
    console.log(uname);
    try {
      const response = await axios.get(`${API_BASE_URL}/task/${uname}`);
      console.log("res", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const tasksForSelectedDate = tasks.filter(task => moment(task.date).isSame(selectedDate, 'day'));

  return (
    <div className="container mx-auto p-4">
      <div className="calendar-container mb-6">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date }) => moment(date).isSame(selectedDate, 'day') ? 'selected' : ''}
        />
      </div>
      <div className="tasks-container">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <h2 className="text-xl font-bold my-4">
              Tasks for {moment(selectedDate).format('MMMM D, YYYY')}
            </h2>
            {tasksForSelectedDate.length > 0 ? (
              <ul className="tasks-list">
                {tasksForSelectedDate.map(task => (
                  <li key={task._id} className="my-2 border p-2 rounded bg-gray-100">
                    {task.task}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No tasks for this date.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserTasks;
