import React, { useState, useEffect } from 'react';
import FileEditor from './components/FileEditor';
import GitTerminal from './components/GitTerminal';
import BranchVisualizer from './components/BranchVisualizer';
import TutorialSystem from './components/TutorialSystem';
import GitWorkflowGuide from './components/GitWorkflowGuide';
import GitCheatSheet from './components/GitCheatSheet';
import WelcomeScreen from './components/WelcomeScreen';
import QuickAccessPanel from './components/QuickAccessPanel';
import './App.css';

function App() {
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [gitStatus, setGitStatus] = useState({});
  const [gitBranches, setGitBranches] = useState([
    {
      name: 'main',
      commits: [
        { hash: '1234567890abcdef', message: 'Initial commit', position: 1 }
      ],
      merges: []
    }
  ]);
  const [currentBranch, setCurrentBranch] = useState('main');
  const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'tutorial', 'workflows', 'cheatsheet'
  const [showWelcome, setShowWelcome] = useState(true);
  const [tutorialVisible, setTutorialVisible] = useState(false);

  useEffect(() => {
    // Initialize the repository and get the initial status
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/status');
      const data = await response.json();
      setGitStatus(data);
    } catch (error) {
      console.error('Error fetching git status:', error);
    }
  };

  const handleContentChange = (content) => {
    setFileContent(content);
  };

  const handleGitCommand = async (command) => {
    try {
      // Check if the command starts with "git" and extract the actual git command
      let commandParts = command.trim().split(' ');
      let gitCmd, commandParams;
      
      // Handle both formats: "git add" and just "add"
      if (commandParts[0].toLowerCase() === 'git' && commandParts.length > 1) {
        gitCmd = commandParts[1].toLowerCase();
        commandParams = commandParts.slice(2).join(' ');
      } else {
        gitCmd = commandParts[0].toLowerCase();
        commandParams = commandParts.slice(1).join(' ');
      }
      
      let apiEndpoint = '';
      let requestBody = {};
      
      switch (gitCmd) {
        case 'init':
          apiEndpoint = 'init';
          break;
        case 'add':
          apiEndpoint = 'add';
          requestBody = { files: commandParams || '.' };
          break;
        case 'commit':
          apiEndpoint = 'commit';
          // Extract commit message - support both -m "message" and -m message formats
          const msgMatch = commandParams.match(/-m\s*(?:"([^"]*)"|'([^']*)'|([^\s]*))/);
          const message = msgMatch ? (msgMatch[1] || msgMatch[2] || msgMatch[3]) : 'Commit';
          requestBody = { message };
          break;
        case 'branch':
          apiEndpoint = 'branch';
          // Extract branch name
          requestBody = { name: commandParams };
          break;
        case 'checkout':
          apiEndpoint = 'checkout';
          // Extract branch name or options
          if (commandParams.startsWith('-b ')) {
            // Creating a new branch and switching to it
            const newBranch = commandParams.substring(3).trim();
            await fetch(`http://localhost:5000/api/branch`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: newBranch }),
            });
            apiEndpoint = 'checkout';
            requestBody = { branch: newBranch };
            
            // Update our branch list for visualization
            const newBranches = [...gitBranches];
            newBranches.push({
              name: newBranch,
              commits: [],
              merges: []
            });
            setGitBranches(newBranches);
            setCurrentBranch(newBranch);
          } else {
            // Just switching to an existing branch
            requestBody = { branch: commandParams };
            setCurrentBranch(commandParams);
          }
          break;
        case 'merge':
          apiEndpoint = 'merge';
          // Extract branch to merge
          requestBody = { branch: commandParams };
          
          // Update branch visualization to show merge
          const newBranches = [...gitBranches];
          const currentIndex = newBranches.findIndex(b => b.name === currentBranch);
          const mergeFromIndex = newBranches.findIndex(b => b.name === commandParams);
          
          if (currentIndex !== -1 && mergeFromIndex !== -1) {
            const position = newBranches[currentIndex].commits.length > 0 
              ? Math.max(...newBranches[currentIndex].commits.map(c => c.position)) + 1
              : 1;
              
            newBranches[currentIndex].merges.push({
              from: commandParams,
              to: currentBranch,
              position
            });
            
            setGitBranches(newBranches);
          }
          break;
        default:
          return `Command not supported: ${gitCmd}`;
      }
      
      const response = await fetch(`http://localhost:5000/api/${apiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      const data = await response.json();
      
      // Update Git status after command is executed
      fetchStatus();
      
      // Update branches visualization (in a real app, this would come from the backend)
      if (gitCmd === 'commit') {
        simulateBranchUpdate(gitCmd, requestBody.message);
      }
      
      return data.message || JSON.stringify(data);
    } catch (error) {
      throw new Error(`Failed to execute Git command: ${error.message}`);
    }
  };

  const simulateBranchUpdate = (command, message) => {
    if (command === 'commit') {
      const newBranches = [...gitBranches];
      const branchIndex = newBranches.findIndex(b => b.name === currentBranch);
      
      if (branchIndex !== -1) {
        const lastPosition = newBranches[branchIndex].commits.length > 0 
          ? Math.max(...newBranches[branchIndex].commits.map(c => c.position)) + 1
          : 1;
          
        newBranches[branchIndex].commits.push({
          hash: Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10),
          message: message || 'Commit',
          position: lastPosition
        });
        
        setGitBranches(newBranches);
      }
    }
  };

  const handleFileSelect = (file) => {
    setFileContent(file.content);
    setFileName(file.name);
  };

  const handleTerminalCommand = (command) => {
    const inputElement = document.querySelector('.command-input');
    if (inputElement) {
      inputElement.value = command;
      // Optionally trigger a focus on the input
      inputElement.focus();
    }
  };

  const toggleTutorial = () => {
    setTutorialVisible(!tutorialVisible);
  };

  return (
    <div className="app">
      <WelcomeScreen onClose={() => setShowWelcome(false)} />
      
      <header className="app-header">
        <h1>GetGud@Git</h1>
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </button>
          <button 
            className={`tab-button ${activeTab === 'workflows' ? 'active' : ''}`}
            onClick={() => setActiveTab('workflows')}
          >
            Workflows
          </button>
          <button 
            className={`tab-button ${activeTab === 'cheatsheet' ? 'active' : ''}`}
            onClick={() => setActiveTab('cheatsheet')}
          >
            Cheat Sheet
          </button>
          <button
            className={`tab-button ${tutorialVisible ? 'active' : ''}`}
            onClick={toggleTutorial}
          >
            {tutorialVisible ? 'Hide Tutorial' : 'Show Tutorial'}
          </button>
        </div>
      </header>
      
      <main className="app-content">
        {activeTab === 'editor' && (
          <div className="main-workspace">
            <div className="editor-with-branches">
              <div className="editor-container">
                <FileEditor
                  content={fileContent}
                  fileName={fileName}
                  onContentChange={handleContentChange}
                />
                <QuickAccessPanel
                  onCommandSelect={handleTerminalCommand}
                  onFileSelect={handleFileSelect}
                />
              </div>
              
              <div className="branch-container">
                <BranchVisualizer 
                  branches={gitBranches}
                  currentBranch={currentBranch}
                />
              </div>
            </div>

            {tutorialVisible && (
              <div className="tutorial-container">
                <TutorialSystem 
                  onSelectCommand={handleTerminalCommand}
                />
              </div>
            )}
          </div>
        )}
        {activeTab === 'workflows' && (
          <GitWorkflowGuide />
        )}
        {activeTab === 'cheatsheet' && (
          <GitCheatSheet 
            onCommandSelect={handleTerminalCommand}
          />
        )}
        
        <div className="terminal-section">
          <GitTerminal onCommand={handleGitCommand} />
        </div>
      </main>
    </div>
  );
}

export default App;
