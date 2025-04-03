import React from 'react';
import './BranchVisualizer.css';

const BranchVisualizer = ({ branches, currentBranch }) => {
  return (
    <div className="branch-visualizer">
      <div className="visualizer-header">
        <h3>Git Branches</h3>
        <div className="current-branch">
          Current: <span className="branch-name">{currentBranch}</span>
        </div>
      </div>
      <div className="branch-diagram">
        {branches.map((branch, index) => (
          <div 
            key={branch.name} 
            className={`branch-line ${branch.name === currentBranch ? 'active-branch' : ''}`}
            style={{ top: `${(index + 1) * 40}px` }}
          >
            <div className="branch-label">{branch.name}</div>
            {branch.commits.map(commit => (
              <div 
                key={commit.hash} 
                className="commit-node"
                style={{ left: `${commit.position * 60}px` }}
                title={commit.message}
              >
                <div className="commit-hash">{commit.hash.substring(0, 5)}</div>
              </div>
            ))}
          </div>
        ))}
        
        {/* Draw connection lines between branches */}
        {branches.flatMap(branch => 
          branch.merges.map(merge => (
            <svg key={`${merge.from}-${merge.to}-${merge.position}`} className="merge-line">
              <path 
                d={`M ${merge.position * 60} ${(branches.findIndex(b => b.name === merge.from) + 1) * 40} 
                    C ${(merge.position + 0.5) * 60} ${(branches.findIndex(b => b.name === merge.from) + 1) * 40},
                      ${(merge.position + 0.5) * 60} ${(branches.findIndex(b => b.name === merge.to) + 1) * 40},
                      ${merge.position * 60} ${(branches.findIndex(b => b.name === merge.to) + 1) * 40}`} 
                stroke="#666" 
                fill="transparent" 
              />
            </svg>
          ))
        )}
      </div>
      
      <div className="branch-help">
        <p>As you make changes and use Git commands, you'll see your branches and commits visualized here.</p>
        <p>Try creating a new branch with: <code>git checkout -b feature</code></p>
      </div>
    </div>
  );
};

export default BranchVisualizer; 