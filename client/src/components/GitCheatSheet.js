import React, { useState } from 'react';
import './GitCheatSheet.css';

const commandCategories = [
  {
    id: 'basics',
    title: 'Basic Commands',
    commands: [
      { cmd: 'git init', desc: 'Initialize a new Git repository' },
      { cmd: 'git clone <url>', desc: 'Clone a repository from a remote location' },
      { cmd: 'git status', desc: 'Show the working tree status' },
      { cmd: 'git add <file>', desc: 'Add file contents to the staging area' },
      { cmd: 'git add .', desc: 'Add all changed files to the staging area' },
      { cmd: 'git commit -m "message"', desc: 'Record changes to the repository with a message' },
      { cmd: 'git log', desc: 'Show commit logs' },
      { cmd: 'git diff', desc: 'Show changes between commits, commit and working tree, etc' }
    ]
  },
  {
    id: 'branches',
    title: 'Branching & Merging',
    commands: [
      { cmd: 'git branch', desc: 'List all local branches' },
      { cmd: 'git branch -a', desc: 'List all branches (local and remote)' },
      { cmd: 'git branch <name>', desc: 'Create a new branch' },
      { cmd: 'git checkout <branch>', desc: 'Switch to a branch' },
      { cmd: 'git checkout -b <branch>', desc: 'Create a new branch and switch to it' },
      { cmd: 'git merge <branch>', desc: 'Merge a branch into the active branch' },
      { cmd: 'git branch -d <branch>', desc: 'Delete a branch' },
      { cmd: 'git push origin --delete <branch>', desc: 'Delete a remote branch' }
    ]
  },
  {
    id: 'remote',
    title: 'Remote Repositories',
    commands: [
      { cmd: 'git remote -v', desc: 'List all remote repositories' },
      { cmd: 'git remote add <name> <url>', desc: 'Add a new remote repository' },
      { cmd: 'git pull <remote> <branch>', desc: 'Fetch changes and merge from a remote repository' },
      { cmd: 'git push <remote> <branch>', desc: 'Push changes to a remote repository' },
      { cmd: 'git fetch <remote>', desc: 'Download objects and refs from a remote repository' },
      { cmd: 'git remote show <remote>', desc: 'Show information about a remote repository' },
      { cmd: 'git remote rename <old> <new>', desc: 'Rename a remote repository' },
      { cmd: 'git remote remove <name>', desc: 'Remove a remote repository' }
    ]
  },
  {
    id: 'undoing',
    title: 'Undoing Changes',
    commands: [
      { cmd: 'git restore <file>', desc: 'Discard changes in working directory (Git 2.23+)' },
      { cmd: 'git restore --staged <file>', desc: 'Unstage a file while keeping changes (Git 2.23+)' },
      { cmd: 'git checkout -- <file>', desc: 'Discard changes in working directory (older Git versions)' },
      { cmd: 'git reset <file>', desc: 'Unstage a file while keeping changes (older Git versions)' },
      { cmd: 'git reset --soft HEAD~1', desc: 'Undo last commit, keep changes staged' },
      { cmd: 'git reset --hard HEAD~1', desc: 'Undo last commit and all changes (dangerous!)' },
      { cmd: 'git commit --amend', desc: 'Modify the last commit' },
      { cmd: 'git revert <commit>', desc: 'Create a new commit that undoes changes from a commit' }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Operations',
    commands: [
      { cmd: 'git rebase <branch>', desc: 'Reapply commits from one branch on top of another' },
      { cmd: 'git rebase -i HEAD~<n>', desc: 'Interactive rebase for editing, squashing commits' },
      { cmd: 'git stash', desc: 'Temporarily store modified files' },
      { cmd: 'git stash pop', desc: 'Apply stashed changes and remove from stash' },
      { cmd: 'git stash list', desc: 'List all stashed changes' },
      { cmd: 'git cherry-pick <commit>', desc: 'Apply the changes from a specific commit' },
      { cmd: 'git tag -a <tag> -m "message"', desc: 'Create an annotated tag' },
      { cmd: 'git submodule add <url>', desc: 'Add a submodule to the repository' }
    ]
  },
  {
    id: 'inspection',
    title: 'Inspection & Comparison',
    commands: [
      { cmd: 'git log --oneline', desc: 'Compact log view with one line per commit' },
      { cmd: 'git log --graph', desc: 'Show log as a graph (good for visualizing branches)' },
      { cmd: 'git blame <file>', desc: 'Show who changed what and when in a file' },
      { cmd: 'git diff <commit1>..<commit2>', desc: 'Show differences between two commits' },
      { cmd: 'git show <commit>', desc: 'Show various types of objects (commits, tags, etc.)' },
      { cmd: 'git reflog', desc: 'Show history of HEAD changes (useful for recovering lost commits)' },
      { cmd: 'git shortlog', desc: 'Summarize git log output by author' },
      { cmd: 'git bisect', desc: 'Use binary search to find a faulty commit' }
    ]
  }
];

const GitCheatSheet = ({ onCommandSelect, compactMode = false }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  
  const handleCommandClick = (cmd) => {
    if (onCommandSelect) {
      onCommandSelect(cmd);
    }
  };
  
  return (
    <div className={`git-cheatsheet ${compactMode ? 'compact-mode' : ''}`}>
      <div className="cheatsheet-header">
        <h3>Git Command Cheat Sheet</h3>
      </div>
      
      <div className="category-tabs">
        {commandCategories.map((category, index) => (
          <div 
            key={category.id}
            className={`category-tab ${selectedCategory === index ? 'active' : ''}`}
            onClick={() => setSelectedCategory(index)}
          >
            {category.title}
          </div>
        ))}
      </div>
      
      <div className="commands-container">
        <table className="commands-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {commandCategories[selectedCategory].commands.map((command, index) => (
              <tr key={index} onClick={() => handleCommandClick(command.cmd)}>
                <td className="command-cell"><code>{command.cmd}</code></td>
                <td className="description-cell">{command.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="cheatsheet-footer">
        <p>Click any command to copy it to the terminal</p>
      </div>
    </div>
  );
};

export default GitCheatSheet; 