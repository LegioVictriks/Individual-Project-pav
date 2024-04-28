import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Task from './TaskObj/Task';
import TaskDetails from './TaskObj/TaskDetails';
import '../Css/Project.css';

const TaskApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
      name: '',
      description: '',
      priority: 'Low',
      status: 'To do',
    });
    const [showForm, setShowForm] = useState(false);
    const [addButtonText, setAddButtonText] = useState('Add new task');
    const [editingTask, setEditingTask] = useState(false);
    const [formClass, setFormClass] = useState('task-form');
  
    useEffect(() => {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }, []);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewTask({
        ...newTask,
        [name]: value
      });
    };
  
    const handlePriorityChange = () => {
      const priorities = ['Low', 'Medium', 'High'];
      const currentIndex = priorities.indexOf(newTask.priority);
      const nextIndex = (currentIndex + 1) % priorities.length;
      setNewTask({
        ...newTask,
        priority: priorities[nextIndex]
      });
    };
  
    const handleStatusChange = () => {
      const statuses = ['To do', 'In Progress', 'Done'];
      const currentIndex = statuses.indexOf(newTask.status);
      const nextIndex = (currentIndex + 1) % statuses.length;
      setNewTask({
        ...newTask,
        status: statuses[nextIndex]
      });
    };
  
    const handleAddTask = () => {
      if (!showForm) {
        setShowForm(true);
        setAddButtonText('Close');
        setFormClass('task-form-grid'); 
      } else {
        setShowForm(false);
        setAddButtonText('Add new task');
        setEditingTask(false);
        setNewTask({
          name: '',
          description: '',
          priority: 'Low',
          status: 'To do',
        });
        setFormClass('task-form'); 
      }
    };
  
    const handleCreateTask = () => {
      if (validateTask()) {
        if (editingTask) {
          // If editing an existing task, update it instead of creating a new one
          const updatedTasks = tasks.map(task =>
            task.id === newTask.id ? { ...newTask, lastUpdated: new Date().toISOString() } : task
          );
          setTasks(updatedTasks);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
          setNewTask({
            name: '',
            description: '',
            priority: 'Low',
            status: 'To do',
          });
          setEditingTask(false);
          setShowForm(false);
          setAddButtonText('Add new task');
          setFormClass('task-form'); 
        } else {
          //  generate an ID and creation date
          const id = '#' + Math.random().toString(36).substr(2, 9);
          const creationDate = new Date().toISOString();
          const updatedTask = {
            ...newTask,
            id,
            creationDate,
            lastUpdated: creationDate
          };
          const updatedTasks = [...tasks, updatedTask];
          setTasks(updatedTasks);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
          setNewTask({
            name: '',
            description: '',
            priority: 'Low',
            status: 'To do',
          });
          setShowForm(false);
          setAddButtonText('Add new task');
          setFormClass('task-form'); 
        }
      } else {
        alert('Please fill in all fields');
      }
    };
  
    const validateTask = () => {
      return Object.values(newTask).every((val) => val !== '');
    };
  
    const handleDeleteTask = (taskId) => {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };
  
    const handleEditTask = (taskId) => {
      setEditingTask(true);
      const taskToEdit = tasks.find(task => task.id === taskId);
      setNewTask(taskToEdit);
      setShowForm(true);
      setAddButtonText('Close');
      setFormClass('task-form-grid'); 
    };
  
    return (
      <div className="task-app">
        <h1>Tasks</h1>
        <div className={formClass}> 
          {showForm && (
            <>
              <input
                className="task-input"
                type="text"
                placeholder="Task Name"
                name="name"
                value={newTask.name}
                onChange={handleInputChange}
              />
              <textarea
                className="task-input"
                type="text"
                placeholder="Description"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
              ></textarea>
              <div className='flex1'>
                <button className="task-button" onClick={handlePriorityChange}>{newTask.priority}</button>
              </div>
              <div className='flex1'>
                <button className="task-button" onClick={handleStatusChange}>{newTask.status}</button>
              </div>
            <div className='flex1'>
              <button className="task-button" onClick={handleCreateTask}>{editingTask ? 'Update' : 'Create'}</button>
              </div>
            </>
          )}
            <div className='flex1'>
          <button className="task-button" onClick={handleAddTask}>{addButtonText}</button>
            </div>
        </div>
        <div>
          {tasks.map((task, index) => (
            <div key={index}>
              <Task
                className="task-item"
                task={task}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            </div>
          ))}
        </div>
        <Route path="/tasks/:id" component={() => <TaskDetails tasks={tasks} />} />
      </div>
    );
  };
  
  export default TaskApp;