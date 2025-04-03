import React, { useState, useEffect } from 'react';
import './GitTerminal.css';

const GitTerminal = ({ onCommand }) => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);

  // Display help message when component first loads
  useEffect(() => {
    setOutput([
      { 
        command: 'help',
        output: `Welcome to the GetGud@Git Terminal!
        
You can use standard git commands with or without the 'git' prefix:
- 'git init' or just 'init'
- 'git add .' or just 'add .'
- 'git commit -m "message"' or just 'commit -m "message"'
- 'git branch branch-name' or just 'branch branch-name'
- 'git checkout branch-name' or just 'checkout branch-name'
- 'git merge branch-name' or just 'merge branch-name'

Try it out!`
      }
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!command.trim()) return;

    try {
      const response = await onCommand(command);
      setOutput(prev => [...prev, { command, output: response }]);
      setCommand('');
    } catch (error) {
      setOutput(prev => [...prev, { command, output: `Error: ${error.message}` }]);
      setCommand('');
    }
  };

  return (
    <div className="git-terminal">
      <div className="terminal-header">
        <h3>Git Terminal</h3>
      </div>
      <div className="terminal-output">
        {output.map((item, index) => (
          <div key={index} className="terminal-line">
            <span className="command-prompt">$</span>
            <span className="command">{item.command}</span>
            <pre className="output">{item.output}</pre>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input">
        <span className="command-prompt">$</span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Type git commands (e.g., git add, git commit -m 'message')"
          className="command-input"
        />
      </form>
    </div>
  );
};

export default GitTerminal; 