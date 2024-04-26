import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Taskss = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // status
  const todoTasks = tasks.filter(task => task.status === 'To do');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const doneTasks = tasks.filter(task => task.status === 'Done');

  return (
    <div className="task-app">
      <h1>Tasks</h1>
      <div>
        <div className="columns"> 
          <div className="column">
            <h2>Todo</h2>
            {todoTasks.map((task, index) => (
              <div key={index}>
                <p>{task.name}</p>
                <NavLink to={`/projects/${task.id}`}>More Details</NavLink>
              </div>
            ))}
            {todoTasks.length === 0 && <p>Lets start</p>}
          </div>
          <div className="column">
            <h2>In Progress</h2>
            {inProgressTasks.map((task, index) => (
              <div key={index}>
                <p>{task.name}</p>
                <NavLink to={`/projects/${task.id}`}>More Details</NavLink>
              </div>
            ))}
          </div>
          <div className="column">
            <h2>Done</h2>
            {doneTasks.map((task, index) => (
              <div key={index}>
                <p>{task.name}</p>
                <NavLink to={`/projects/${task.id}`}>More Details</NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskss;