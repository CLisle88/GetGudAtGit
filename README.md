# GetGud@Git

A beginner-friendly, interactive Git training application that helps users learn and practice Git concepts hands-on.

![GetGud@Git Screenshot](screenshot.png)

## Overview

GetGud@Git is a desktop application that makes learning Git easy and interactive. It features:

- **Interactive Editor**: Write and modify code while practicing Git commands
- **Visual Branch Representation**: See your branches and commits visualized in real-time
- **Step-by-Step Tutorials**: Learn Git concepts through structured, interactive lessons
- **Demo Projects**: Practice with real-world example projects
- **Command Cheat Sheet**: Quick reference for common Git commands
- **Workflow Guide**: Learn standard Git workflows and best practices

This application is designed to run locally on your computer, providing a safe sandbox environment to practice Git commands without affecting actual repositories.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [Git](https://git-scm.com/) (installed and available in PATH)

### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/getgud-git.git
cd getgud-git
```

2. **Install backend dependencies**

```bash
npm install
```

3. **Install frontend dependencies**

```bash
cd client
npm install
cd ..
```

4. **Start the application**

In one terminal, start the backend:
```bash
npm run dev
```

In another terminal, start the frontend:
```bash
cd client
npm start
```

5. **Access the application**

Open your browser and navigate to:
```
http://localhost:3000
```

## Troubleshooting

### Port Already in Use

If you see an error like `Error: listen EADDRINUSE: address already in use :::5000`:

1. Find and stop the process using port 5000:
   - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
   - Mac/Linux: `lsof -i :5000` then `kill -9 <PID>`

2. Or change the port in server.js:
   ```javascript
   const port = process.env.PORT || 5001; // Change from 5000 to 5001
   ```

### Windows PowerShell Command Chaining

Windows PowerShell doesn't support the `&&` operator for command chaining. Use one of these alternatives:

```powershell
# Option 1: Run commands separately
cd client
npm start

# Option 2: Use semicolon
cd client; npm start

# Option 3: Use PowerShell operator
cd client -and npm start
```

### Cannot Find Module Error

If you see an error about missing modules:

```bash
# Clean install the dependencies
npm ci

# If that doesn't work, delete node_modules and reinstall
rm -rf node_modules
npm install
```

## Adding Your Own Content

### Adding New Tutorials

1. Edit `client/src/components/TutorialSystem.js`
2. Find the `tutorials` array and add your new tutorial section or lessons
3. Follow the existing format for consistency

### Adding Demo Projects

1. Edit `client/src/components/DemoCodeManager.js`
2. Find the `demoProjects` array and add your new project
3. Include relevant files and their content

## Technology Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express
- **Git Integration**: simple-git

## Project Structure

```
getgud-git/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # React components
│       └── App.js          # Main application component
├── temp-repo/              # Temporary Git repository for practice
├── server.js               # Express backend server
├── package.json            # Backend dependencies
└── README.md               # Project documentation
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## Acknowledgements

- Thanks to all contributors who have helped improve this project
- Special thanks to the Git community for creating such a powerful tool

---

**Note**: This is an educational tool and is meant to run locally. It is not intended for production deployment as a web service at this time. 