import React, { useState } from 'react';
import './GitWorkflowGuide.css';

const workflows = [
  {
    id: 'basic',
    title: 'Basic Git Workflow',
    description: 'The core workflow for individual development',
    diagram: `
    Working Directory    Staging Area       Repository
    +--------------+     +----------+      +-----------+
    |              |     |          |      |           |
    | Modified     | git |          | git  |           |
    | Files        | add |  Staged  | commit Committed |
    |              +----→+ Changes  +------→ History    |
    |              |     |          |      |           |
    +--------------+     +----------+      +-----------+
    `,
    explanation: `This is the fundamental Git workflow for individual development:
1. You modify files in your working directory
2. You selectively stage changes you want to include in your next commit
3. You commit the staged changes to create a permanent record in your repository history

This separation allows you to carefully control what gets committed and when.`
  },
  {
    id: 'branch-merge',
    title: 'Feature Branch Workflow',
    description: 'Working with branches and merging',
    diagram: `
           commit--commit--commit (main)
          /                      /
         /                      /
    commit--commit--commit-----commit (feature)
    `,
    explanation: `The feature branch workflow is ideal for making changes:
1. Create a new branch from main: \`git checkout -b feature\`
2. Make changes and commit to the feature branch
3. Switch back to main: \`git checkout main\`
4. Merge the feature branch: \`git merge feature\`
5. (Optional) Delete the feature branch: \`git branch -d feature\`

This isolates work-in-progress and keeps the main branch stable.`
  },
  {
    id: 'rebase',
    title: 'Rebasing Workflow',
    description: 'Creating a linear history with rebase',
    diagram: `
    Before rebase:
    
    main:   A---B---C
                   \\
    feature:        D---E
    
    After rebase:
    
    main:   A---B---C
                     \\
    feature:          D'---E'
    `,
    explanation: `Rebasing creates a cleaner, linear history:
1. Create and work on a feature branch
2. When main has new changes, switch to feature branch
3. Rebase onto main: \`git rebase main\`
4. This replays your feature branch commits on top of main
5. When ready, merge using fast-forward: \`git checkout main && git merge feature\`

Rebasing rewrites history, so never rebase commits that have been pushed publicly.`
  },
  {
    id: 'fork-pr',
    title: 'Fork & Pull Request Workflow',
    description: 'Contributing to open source projects',
    diagram: `
    Original Repo (upstream)
         ↑
         |
         | Pull Request
         |
    Your Fork (origin) ← Your Local Repo
    `,
    explanation: `The standard workflow for contributing to projects:
1. Fork the repository on GitHub/GitLab
2. Clone your fork locally
3. Add the original repo as "upstream" remote
4. Create a feature branch
5. Make changes and push to your fork
6. Create a Pull Request from your fork to the original repo
7. Respond to code review feedback
8. Project maintainer merges your PR

Always sync your fork with upstream changes: \`git pull upstream main\``
  },
  {
    id: 'gitflow',
    title: 'Git Flow Workflow',
    description: 'Advanced branching strategy for structured releases',
    diagram: `
                                  hotfix
                                  ↗     ↘
         develop     release     /       \\
    main ---→--------→-----------→---------→---->
              ↗  ↗  ↗
             /  /  /
    features ↗  ↗  ↗
    `,
    explanation: `Git Flow provides structure for larger projects:
1. Two permanent branches: main and develop
2. Feature branches: Created from develop, merged back to develop
3. Release branches: Created from develop, merged to both develop and main
4. Hotfix branches: Created from main, merged to both main and develop

This approach formalizes development, release preparation, and production fixes.`
  }
];

const GitWorkflowGuide = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState(0);
  
  return (
    <div className="workflow-guide">
      <div className="guide-header">
        <h3>Git Workflow Visualizer</h3>
      </div>
      
      <div className="workflow-tabs">
        {workflows.map((workflow, index) => (
          <div 
            key={workflow.id}
            className={`workflow-tab ${selectedWorkflow === index ? 'active' : ''}`}
            onClick={() => setSelectedWorkflow(index)}
          >
            {workflow.title}
          </div>
        ))}
      </div>
      
      <div className="workflow-content">
        <h4>{workflows[selectedWorkflow].title}</h4>
        <p className="workflow-description">{workflows[selectedWorkflow].description}</p>
        
        <div className="workflow-diagram">
          <pre>{workflows[selectedWorkflow].diagram}</pre>
        </div>
        
        <div className="workflow-explanation">
          {workflows[selectedWorkflow].explanation}
        </div>
      </div>
    </div>
  );
};

export default GitWorkflowGuide; 