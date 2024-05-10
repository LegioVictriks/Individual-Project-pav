const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/tasks', (req, res) => {
  const { name, description, priority, status } = req.body;
  
  fs.readFile('taskobj.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }


    let tasks = [];
    try {
      tasks = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // const newTask = {
    //   id: '#' + Math.random().toString(36).substr(2, 9),
    //   name,
    //   description,
    //   priority,
    //   status,
    //   creationDate: new Date().toISOString(),
    //   lastUpdated: new Date().toISOString()
    // };


    tasks.push(newTask);

    fs.writeFile('taskobj.json', JSON.stringify(tasks, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing file:', writeErr);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      
    
      res.json(newTask);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// const handleCreateTask = () => {
//     if (validateTask()) {
//       fetch('/api/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newTask)
//       })
//       .then(response => response.json())
//       .then(createdTask => {
//         setTasks([...tasks, createdTask]);
//         setNewTask({
//           name: '',
//           description: '',
//           priority: 'Low',
//           status: 'To do'
//         });
//         setShowForm(false);
//         setAddButtonText('Add new task');
//         setEditingTask(false);
//         setFormClass('task-form');
//       })
//       .catch(error => {
//         console.error('Error creating task:', error);
//         alert('Failed to create task');
//       });
//     } else {
//       alert('Please fill in all fields');
//     }
//   };