import React, { useState } from 'react';
import './Css/taskobj.css'
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear().toString().slice(-2)}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    return formattedDate;
};

const Task = ({ task, onDeleteTask, onEditTask }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className='obj-container'>
            <h4>Task Name: {task.name}</h4>
            <p>Description: {task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <button className='details-link' onClick={toggleDetails}>More Details</button>
            {showDetails && (
                <div className='showcase'>
                    <p>Creation Date: {formatDate(task.creationDate)}</p>
                    <p>Last Updated: {formatDate(task.lastUpdated)}</p>
                    <button className='task-button' onClick={() => onDeleteTask(task.id)}>Delete</button>
                    <button className='task-button' onClick={() => onEditTask(task.id)}>Edit</button>
                </div>
            )}
           
        </div>
    );
};

export default Task;