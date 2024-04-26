import React, { useState } from 'react';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear().toString().slice(-2)}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    return formattedDate;
};

const Task = ({ task }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
            <h4>Task Name: {task.name}</h4>
            <p>Description: {task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <button onClick={toggleDetails}>More Details</button>
            {showDetails && (
                <div>
                    <p>Creation Date: {formatDate(task.creationDate)}</p>
                    <p>Last Updated: {formatDate(task.lastUpdated)}</p>
                </div>
            )}
        </div>
    );
};

export default Task;