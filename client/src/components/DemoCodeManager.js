import React, { useState } from 'react';
import './DemoCodeManager.css';

const demoProjects = [
  {
    id: 'simple-website',
    name: 'Simple Website',
    description: 'A basic HTML/CSS website project',
    files: [
      {
        name: 'index.html',
        path: '/index.html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
    <nav>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section id="about">
      <h2>About Us</h2>
      <p>This is a simple website created for Git training purposes.</p>
    </section>
    
    <section id="services">
      <h2>Our Services</h2>
      <ul>
        <li>Web Development</li>
        <li>App Development</li>
        <li>Consulting</li>
      </ul>
    </section>
    
    <section id="contact">
      <h2>Contact Us</h2>
      <p>Email: info@example.com</p>
      <p>Phone: 123-456-7890</p>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2023 My Website. All rights reserved.</p>
  </footer>
</body>
</html>`
      },
      {
        name: 'styles.css',
        path: '/styles.css',
        content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

header {
  background-color: #4CAF50;
  color: #fff;
  padding: 1rem;
  text-align: center;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

nav ul li {
  margin: 0 1rem;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

section {
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 1rem;
  color: #4CAF50;
}

footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 1rem;
}`
      },
      {
        name: 'README.md',
        path: '/README.md',
        content: `# Simple Website Project

This is a basic website project for practicing Git commands and workflows.

## Getting Started

1. Clone the repository
2. Open index.html in your browser
3. Make changes to the files
4. Use Git to track your changes

## Project Structure

- index.html: Main HTML file
- styles.css: CSS styles
- README.md: Project documentation`
      }
    ]
  },
  {
    id: 'javascript-app',
    name: 'JavaScript App',
    description: 'A simple JavaScript application',
    files: [
      {
        name: 'index.html',
        path: '/index.html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript Todo App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Todo List</h1>
    
    <div class="input-container">
      <input type="text" id="task-input" placeholder="Add a new task...">
      <button id="add-button">Add</button>
    </div>
    
    <ul id="task-list"></ul>
  </div>
  
  <script src="app.js"></script>
</body>
</html>`
      },
      {
        name: 'styles.css',
        path: '/styles.css',
        content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: #f4f4f4;
}

.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: #4CAF50;
}

.input-container {
  display: flex;
  margin-bottom: 1rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 3px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 0.5rem;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style: none;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
}

li:hover {
  background-color: #f9f9f9;
}

.delete-button {
  background-color: #f44336;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.completed {
  text-decoration: line-through;
  color: #888;
}`
      },
      {
        name: 'app.js',
        path: '/app.js',
        content: `// Get DOM elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

// Initialize tasks array
let tasks = [];

// Add event listeners
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  
  if (taskText) {
    // Create a new task object
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    
    // Add the task to the array
    tasks.push(task);
    
    // Render the task list
    renderTasks();
    
    // Clear the input field
    taskInput.value = '';
    
    // Focus the input field
    taskInput.focus();
  }
}

// Function to render the task list
function renderTasks() {
  // Clear the task list
  taskList.innerHTML = '';
  
  // Render each task
  tasks.forEach(task => {
    const li = document.createElement('li');
    
    // Create a span for the task text
    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add('completed');
    }
    
    // Create a container for the buttons
    const buttonContainer = document.createElement('div');
    
    // Create a toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = task.completed ? 'Undo' : 'Complete';
    toggleButton.addEventListener('click', () => toggleTask(task.id));
    
    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => deleteTask(task.id));
    
    // Add the buttons to the container
    buttonContainer.appendChild(toggleButton);
    buttonContainer.appendChild(deleteButton);
    
    // Add the elements to the list item
    li.appendChild(span);
    li.appendChild(buttonContainer);
    
    // Add the list item to the task list
    taskList.appendChild(li);
  });
}

// Function to toggle a task's completed status
function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  
  renderTasks();
}

// Function to delete a task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Initial render
renderTasks();`
      },
      {
        name: 'README.md',
        path: '/README.md',
        content: `# JavaScript Todo App

A simple Todo application for practicing Git version control.

## Features

- Add new tasks
- Mark tasks as completed
- Delete tasks

## Project Structure

- index.html: Main HTML file
- styles.css: CSS styles
- app.js: JavaScript functionality
- README.md: Project documentation

## Getting Started

1. Clone the repository
2. Open index.html in your browser
3. Make changes to the files
4. Use Git to track your changes`
      }
    ]
  }
];

const DemoCodeManager = ({ onFileSelect, compactMode = false }) => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [selectedFile, setSelectedFile] = useState(0);
  
  const handleProjectSelect = (index) => {
    setSelectedProject(index);
    setSelectedFile(0);
  };
  
  const handleFileSelect = (index) => {
    setSelectedFile(index);
    if (onFileSelect) {
      onFileSelect(demoProjects[selectedProject].files[index]);
    }
  };
  
  return (
    <div className={`demo-manager ${compactMode ? 'compact-mode' : ''}`}>
      <div className="demo-header">
        <h3>Demo Projects</h3>
      </div>
      
      <div className="demo-content">
        <div className="project-list">
          <h4>Select a Project</h4>
          {demoProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`project-item ${selectedProject === index ? 'active' : ''}`}
              onClick={() => handleProjectSelect(index)}
            >
              <div className="project-name">{project.name}</div>
              <div className="project-description">{project.description}</div>
            </div>
          ))}
        </div>
        
        <div className="file-browser">
          <h4>Project Files</h4>
          <div className="file-list">
            {demoProjects[selectedProject].files.map((file, index) => (
              <div 
                key={file.path}
                className={`file-item ${selectedFile === index ? 'active' : ''}`}
                onClick={() => handleFileSelect(index)}
              >
                {file.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoCodeManager; 