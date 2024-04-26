import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import TaskDetails from './TaskObj/TaskDetails';
import Calenadr from '../Calendar';

const NewComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [latestTask, setLatestTask] = useState(null);

    useEffect(() => {
        // Здесь можно выполнить запрос к API или получить данные из localStorage
        // Заглушка для демонстрации
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading && tasks.length > 0) {
            // Сортировка задач по дате последнего обновления
            const tasksSortedByLastUpdated = tasks.slice().sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
            // Если нет обновлений, сортируем по дате создания
            if (tasksSortedByLastUpdated[0].lastUpdated === tasksSortedByLastUpdated[tasksSortedByLastUpdated.length - 1].lastUpdated) {
                const tasksSortedByCreationDate = tasks.slice().sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
                setLatestTask(tasksSortedByCreationDate[0]);
            } else {
                setLatestTask(tasksSortedByLastUpdated[0]);
            }
        }
    }, [tasks, loading]);

    return (
        <div>
            <Calenadr/>
        <div>
            <h1>Task Display</h1>
            {loading ? (
                <p>Loading...</p>
            ) : latestTask ? (
                <div>
                    <h2>{latestTask.name}</h2>
                    <p>Status: {latestTask.status}</p>
                    <NavLink to={`/projects/${latestTask.id}`}>More Details</NavLink>
                </div>
            ) : (
                <p>No tasks found!</p>
            )}
        </div>
        </div>
    );
};

export default NewComponent;