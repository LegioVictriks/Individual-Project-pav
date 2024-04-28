import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../Css/Progress.css'
const Taskss = () => {
  const [tasks, setTasks] = useState([]);
  const [viewType, setViewType] = useState('list');

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
        <div className="view-buttons">
          <button onClick={() => setViewType('list')}>List</button>
          <button onClick={() => setViewType('grid')}>Grid</button>
        </div>
        <div className="columns">
          <div className="column">
            <h2>Todo</h2>
            {viewType === 'list' ? (
              todoTasks.map((task, index) => (
                <div key={index}>
                  <p>{task.name}</p>
                  <NavLink to={`/projects/${task.id}`}>More Details</NavLink>
                </div>
              ))
            ) : (
              <div className="grid-view">
                {todoTasks.map((task, index) => (
                  <div key={index} className="grid-item">
                    <p>{task.name}</p>
                    <NavLink to={`/projects/${task.id}`}>More Details</NavLink>
                  </div>
                ))}
              </div>
            )}
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