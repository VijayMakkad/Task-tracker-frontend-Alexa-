import React, { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '' });

  // Fetch tasks from the API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  // Function to add a new task
  const addTask = () => {
    if (newTask.name && newTask.description) {
      setTasks([...tasks, newTask]);
      setNewTask({ name: '', description: '' });
    }
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Function to edit a task
  const editTask = (taskId, newName, newDescription) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.title = newName;
        task.description = newDescription;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) => editTask(task.id, e.target.value, task.description)}
            />
            <input
              type="text"
              value={task.description}
              onChange={(e) => editTask(task.id, task.title, e.target.value)}
            />
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
