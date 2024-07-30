import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PagesTasks = () => {
  const [scheduleData, setScheduleData] = useState({});
  const [designers, setDesigners] = useState([]);
  
  // Function to fetch data from the URL
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/task/`);
      const currentWeekTasks = filterCurrentWeekTasks(response.data);
      const groupedByDesigner = groupTasksByDesigner(currentWeekTasks);
      setDesigners(Object.keys(groupedByDesigner));
      setScheduleData(groupedByDesigner);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to filter tasks for the current week
  const filterCurrentWeekTasks = (tasks) => {
    const startDate = moment().startOf('week');
    const endDate = moment().endOf('week');
    return tasks.filter(task => moment(task.date).isBetween(startDate, endDate, undefined, '[]'));
  };

  // Function to group tasks by designer and date
  const groupTasksByDesigner = (tasks) => {
    const groupedTasks = {};
    tasks.forEach(task => {
      const designer = task.page;
      const date = moment(task.date).format('dddd, MMM Do');
      if (!groupedTasks[designer]) {
        groupedTasks[designer] = {};
      }
      if (!groupedTasks[designer][date]) {
        groupedTasks[designer][date] = [];
      }
      groupedTasks[designer][date].push(task.task);
    });
    return groupedTasks;
  };

  // Function to generate dates of the current week
  const generateWeekDates = () => {
    const weekDates = [];
    let currentDate = moment().startOf('week');
    for (let i = 0; i < 7; i++) {
      weekDates.push(currentDate.format('dddd, MMM Do'));
      currentDate = currentDate.add(1, 'day');
    }
    return weekDates;
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const weekDates = generateWeekDates();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
            {weekDates.map((date, index) => (
              <th key={index} className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{date}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {designers.length === 0 ? (
            <tr>
              <td colSpan={weekDates.length + 1} className="py-4 px-6 text-center text-sm text-gray-500">No tasks available</td>
            </tr>
          ) : (
            Object.keys(scheduleData).map((designer, designerIndex) => (
              Object.entries(scheduleData[designer]).map(([date, tasks], dateIndex) => (
                <tr key={`${designer}-${date}`} className={designerIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  {dateIndex === 0 && (
                    <td className="py-4 px-6 text-left text-sm font-medium text-gray-900" rowSpan={Object.keys(scheduleData[designer]).length}>{designer}</td>
                  )}
                  {weekDates.map((weekDate, weekIndex) => (
                    <td key={weekIndex} className="py-4 px-6 text-left text-sm text-gray-500">
                      {tasks.filter(task => moment(task.date).format('dddd, MMM Do') === weekDate).map((task, taskIndex) => (
                        <div key={taskIndex}>{task}</div>
                      ))}
                    </td>
                  ))}
                </tr>
              ))
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PagesTasks;
