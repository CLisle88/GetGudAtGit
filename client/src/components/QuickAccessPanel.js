import React, { useState } from 'react';
import GitCheatSheet from './GitCheatSheet';
import DemoCodeManager from './DemoCodeManager';
import './QuickAccessPanel.css';

const QuickAccessPanel = ({ onCommandSelect, onFileSelect }) => {
  const [activePanel, setActivePanel] = useState(null); // 'cheatsheet', 'demo', or null
  
  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };
  
  return (
    <div className="quick-access-container">
      <div className="panel-toggles">
        <button 
          className={`panel-toggle ${activePanel === 'cheatsheet' ? 'active' : ''}`}
          onClick={() => togglePanel('cheatsheet')}
          title="Git Cheat Sheet"
        >
          📋 Git Commands
        </button>
        <button 
          className={`panel-toggle ${activePanel === 'demo' ? 'active' : ''}`}
          onClick={() => togglePanel('demo')}
          title="Demo Code"
        >
          📁 Demo Code
        </button>
      </div>
      
      {activePanel && (
        <div className="panel-content">
          <button className="close-panel" onClick={() => setActivePanel(null)}>×</button>
          {activePanel === 'cheatsheet' && (
            <div className="compact-panel">
              <GitCheatSheet 
                onCommandSelect={onCommandSelect} 
                compactMode={true}
              />
            </div>
          )}
          {activePanel === 'demo' && (
            <div className="compact-panel">
              <DemoCodeManager 
                onFileSelect={onFileSelect} 
                compactMode={true}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickAccessPanel; 