import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../Css/Progress.css';

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

  return (
    <div className={`task-app ${viewType === 'list' ? 'list-view' : 'grid-view'}`}>
      <h1>Tasks</h1>
      <div>
      <div className="view-buttons">
          <button className={viewType === 'list' ? 'active' : ''} onClick={() => setViewType('list')}>List</button>
          <button className={viewType === 'grid' ? 'active' : ''} onClick={() => setViewType('grid')}>Grid</button>
        </div>
        <div className={`columns ${viewType === 'list' ? 'gridobj' : ''}`}>
          <div className={`column ${viewType === 'list' ? 'list-view-column' : 'grid-view-column'}`}>
            <h2>Todo</h2>
            {viewType === 'list' ? (
              <div className="list-view">
                {tasks.map((task, index) => (
                  task.status === 'To do' && (
                    <div className='obj-change' key={index}>
                      <p>{task.name}</p>
                      <NavLink to={`/projects/${task.id}`}>More Details</NavLink>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="grid-view">
                {tasks.map((task, index) => (
                  task.status === 'To do' && (
                    <div  key={index}>
                      <p>{task.name}</p>
                      <NavLink to={`/projects/${task.id}`}>More Details</NavLink>
                    </div>
                  )
                ))}
              </div>
            )}
            {tasks.filter(task => task.status === 'To do').length === 0 && <p>Lets start</p>}
          </div>
          <div className={`column ${viewType === 'list' ? 'list-view-column' : 'grid-view-column'}`}>
            <h2>In Progress</h2>
            {viewType === 'list' ? (
              <div className="list-view">
                {tasks.map((task, index) => (
                  task.status === 'In Progress' && (
                    <div className='obj-change' key={index}>
                      <p>{task.name}</p>
                      <NavLink to={`/projects/${task.id}`}>More Details</NavLink>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="grid-view">
                {tasks.map((task, index) => (
                  task.status === 'In Progress' && (
                    <div key={index}>
                      <p>{task.name}</p>
                      <NavLink  to={`/projects/${task.id}`}>More Details</NavLink>
                    </div>
                  )
                ))}
              </div>
            )}
            {tasks.filter(task => task.status === 'In Progress').length === 0 && <p>No tasks in progress</p>}
          </div>
          <div className={`column ${viewType === 'list' ? 'list-view-column' : 'grid-view-column'}`}>
            <h2>Done</h2>
            {viewType === 'list' ? (
              <div className="list-view">
                {tasks.map((task, index) => (
                  task.status === 'Done' && (
                    <div className='obj-change' key={index}>
                      <p>{task.name}</p>
                      <NavLink to={`/projects/${task.id}`}>More Details</NavLink>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="grid-view">
                {tasks.map((task, index) => (
                  task.status === 'Done' && (
                    <div key={index}>
                      <p>{task.name}</p>
                      <NavLink to={`/projects/${task.id}`}>More Details</NavLink>
                    </div>
                  )
                ))}
              </div>
            )}
            {tasks.filter(task => task.status === 'Done').length === 0 && <p>No tasks completed</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskss;