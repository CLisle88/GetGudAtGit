import React, { useState, useEffect } from 'react';
import ProgressTracker from './ProgressTracker';
import './TutorialSystem.css';

const tutorials = [
  {
    id: 'basics',
    title: 'Git Basics',
    lessons: [
      {
        id: 'init',
        title: 'Initializing a Repository',
        description: 'Learn how to create a new Git repository',
        content: `To start tracking your project with Git, you need to initialize a repository:
        
1. Navigate to your project directory
2. Run the command: \`git init\`
        
This creates a hidden .git folder that stores all the version control information.`,
        command: 'git init',
        task: 'Initialize a new Git repository'
      },
      {
        id: 'add',
        title: 'Staging Changes',
        description: 'Learn how to stage changes for commit',
        content: `Before committing files, you need to stage them:
        
1. To stage a specific file: \`git add filename.txt\`
2. To stage all files: \`git add .\`
        
Staging lets you select exactly what changes will be in your next commit.`,
        command: 'git add .',
        task: 'Stage all changes in the working directory'
      },
      {
        id: 'commit',
        title: 'Committing Changes',
        description: 'Learn how to commit staged changes',
        content: `Committing creates a snapshot of your staged changes:
        
\`git commit -m "Your commit message here"\`
        
Good commit messages should:
- Be concise but descriptive
- Explain WHY the change was made
- Start with a verb in present tense`,
        command: 'git commit -m "Initial commit"',
        task: 'Commit your staged changes with a message'
      }
    ]
  },
  {
    id: 'branching',
    title: 'Branching and Merging',
    lessons: [
      {
        id: 'branch',
        title: 'Creating Branches',
        description: 'Learn how to create and switch branches',
        content: `Branches let you work on features or fixes in isolation:
        
1. Create a branch: \`git branch feature-name\`
2. Switch to it: \`git checkout feature-name\`
        
Or do both at once: \`git checkout -b feature-name\``,
        command: 'git checkout -b feature-branch',
        task: 'Create and switch to a new branch called "feature-branch"'
      },
      {
        id: 'merge',
        title: 'Merging Branches',
        description: 'Learn how to merge changes between branches',
        content: `To combine work from different branches:
        
1. Switch to the target branch: \`git checkout main\`
2. Merge the source branch: \`git merge feature-branch\`
        
Git will try to automatically merge the changes. If there are conflicts, you'll need to resolve them manually.`,
        command: 'git merge feature-branch',
        task: 'Merge the "feature-branch" into the current branch'
      },
      {
        id: 'conflict',
        title: 'Resolving Conflicts',
        description: 'Learn how to handle merge conflicts',
        content: `When Git can't automatically merge changes, you'll need to resolve conflicts:
        
1. Git marks conflicts in the affected files
2. Edit the files to fix the conflicts
3. Remove the conflict markers
4. Stage the resolved files: \`git add <filename>\`
5. Complete the merge: \`git commit\``,
        command: null,
        task: 'Fix any merge conflicts, then stage and commit the changes'
      }
    ]
  },
  {
    id: 'remote',
    title: 'Working with Remotes',
    lessons: [
      {
        id: 'remote-add',
        title: 'Adding Remote Repositories',
        description: 'Learn how to connect to remote repositories',
        content: `To connect your local repository to a remote one:
        
\`git remote add origin https://github.com/username/repository.git\`
        
This creates a connection named "origin" pointing to the specified URL.`,
        command: 'git remote add origin https://github.com/username/repository.git',
        task: 'Add a remote repository named "origin"'
      },
      {
        id: 'push',
        title: 'Pushing Changes',
        description: 'Learn how to push local commits to a remote',
        content: `To share your commits with the remote repository:
        
\`git push -u origin branch-name\`
        
The -u flag sets up tracking, which simplifies future push/pull commands.`,
        command: 'git push -u origin main',
        task: 'Push your commits to the remote repository'
      },
      {
        id: 'pull',
        title: 'Pulling Changes',
        description: 'Learn how to get remote changes',
        content: `To get changes from the remote repository:
        
\`git pull origin branch-name\`
        
This combines \`git fetch\` (download changes) and \`git merge\` (integrate changes).`,
        command: 'git pull origin main',
        task: 'Pull changes from the remote repository'
      }
    ]
  },
  {
    id: 'collaborative',
    title: 'Collaborative Workflows',
    lessons: [
      {
        id: 'clone',
        title: 'Cloning Repositories',
        description: 'Learn how to clone an existing repository',
        content: `Cloning creates a local copy of a remote repository:

\`git clone https://github.com/username/repository.git\`

This will:
1. Download the entire repository history
2. Set up the remote connection to the original repository
3. Create a local 'main' branch that tracks the remote 'main'
4. Check out the most recent version of the code`,
        command: 'git clone https://github.com/username/repository.git',
        task: 'Clone a remote repository to your local machine'
      },
      {
        id: 'pull-fetch',
        title: 'Pulling vs. Fetching',
        description: 'Understand the difference between pull and fetch',
        content: `There are two ways to get updates from a remote repository:

1. \`git fetch\` - Downloads changes but doesn't integrate them into your working files
   - Safe operation that never changes your local work
   - Use \`git diff origin/main\` to see what changed
   - Explicitly merge when ready with \`git merge origin/main\`

2. \`git pull\` - Fetches AND merges changes in one step
   - Equivalent to \`git fetch\` followed by \`git merge\`
   - More convenient but less control
   - Can cause conflicts if local changes exist`,
        command: 'git fetch origin',
        task: 'Fetch the latest changes without merging them'
      },
      {
        id: 'fork-workflow',
        title: 'Fork & Pull Request Workflow',
        description: 'Learn the standard GitHub collaboration model',
        content: `The Fork & Pull Request workflow is standard on GitHub:

1. Fork the repository to your GitHub account
2. Clone your fork: \`git clone https://github.com/YOUR-USERNAME/repository.git\`
3. Add the original repo as "upstream": \`git remote add upstream https://github.com/original-owner/repository.git\`
4. Create a feature branch: \`git checkout -b feature-name\`
5. Make changes and commit
6. Push to your fork: \`git push origin feature-name\`
7. Create a Pull Request from your fork on GitHub
8. Keep your fork updated: \`git pull upstream main\``,
        command: null,
        task: 'Set up a fork workflow for contributing to a project'
      },
      {
        id: 'code-review',
        title: 'Code Review & Pull Requests',
        description: 'Best practices for code reviews and pull requests',
        content: `Effective Pull Requests (PRs) make collaboration smoother:

PR Best Practices:
- Keep PRs small and focused on a single issue
- Write clear descriptions explaining WHY not just WHAT
- Reference issue numbers (#123) in your PR description
- Include screenshots for UI changes
- Respond to feedback positively and promptly

Code Reviews:
- Be respectful and constructive in comments
- Explain WHY when suggesting changes
- Look for security, performance, and maintainability issues
- Approve once all concerns are addressed`,
        command: null,
        task: 'Create a high-quality pull request for your changes'
      }
    ]
  },
  {
    id: 'best-practices',
    title: 'Git Best Practices',
    lessons: [
      {
        id: 'commit-messages',
        title: 'Writing Good Commit Messages',
        description: 'Learn how to write clear, useful commit messages',
        content: `Good commit messages make git history valuable:

Structure:
1. Short summary (50 chars max)
2. Blank line
3. Detailed explanation if needed

Guidelines:
- Use present tense: "Add feature" not "Added feature"
- Start with a verb: "Fix", "Add", "Change", "Refactor"
- Explain WHY a change was made, not just WHAT
- Reference issue numbers when applicable

Example:
\`\`\`
Fix user authentication timeout issue

- Increase token expiration from 1h to 2h
- Add refresh token mechanism
- Update auth tests

Fixes #123
\`\`\``,
        command: null,
        task: 'Write a well-structured commit message'
      },
      {
        id: 'branch-strategy',
        title: 'Branching Strategies',
        description: 'Learn different branching models for team workflows',
        content: `Choose a branching strategy that fits your team:

1. GitHub Flow:
   - Main branch is always deployable
   - Branch for each feature/fix
   - PR, review, then merge to main
   - Simple and works well for continuous delivery

2. Git Flow:
   - Two permanent branches: main (production) and develop
   - Feature branches from develop
   - Release branches to prepare for releases
   - Hotfix branches for production issues
   - More complex but structured for formal releases

3. Trunk-Based Development:
   - Everyone commits to main ("trunk")
   - Use feature flags to hide incomplete work
   - Very short-lived branches (1-2 days max)
   - Requires strong testing culture`,
        command: null,
        task: 'Choose and implement a branching strategy for your project'
      },
      {
        id: 'repo-structure',
        title: 'Repository Structure',
        description: 'Best practices for organizing your Git repositories',
        content: `Structuring repositories effectively:

1. Monorepo vs. Multiple Repos:
   - Monorepo: All code in one repo (easier coordination, bigger history)
   - Multiple repos: Code split by service/module (focused, independent teams)

2. Essential Files:
   - README.md: Project overview, setup instructions
   - LICENSE: Always include a license
   - .gitignore: Exclude build artifacts, dependencies, secrets
   - CONTRIBUTING.md: Guidelines for contributors
   - CHANGELOG.md: Track significant changes

3. Branch Protection:
   - Enable branch protection on main branches
   - Require PR reviews before merging
   - Require status checks to pass (tests/CI)
   - Consider using signed commits for security`,
        command: null,
        task: 'Set up a well-structured repository with the essential files'
      },
      {
        id: 'clean-history',
        title: 'Maintaining a Clean History',
        description: 'Techniques for keeping your Git history organized',
        content: `A clean, understandable Git history is valuable:

1. Rebase vs Merge:
   - \`git rebase\` rewrites history for a linear, cleaner log
   - \`git merge\` preserves full history but creates merge commits
   - Team rule: Rebase feature branches, merge major branches

2. Squashing Commits:
   - \`git rebase -i HEAD~3\` to interactively rebase last 3 commits
   - Mark commits as "squash" to combine them
   - Create a single, meaningful commit before merging

3. When to Rewrite History:
   - OK for local/feature branches not yet pushed
   - NEVER rewrite history on shared branches
   - Use \`git push --force-with-lease\` if you must force push

4. Commit Discipline:
   - Each commit should represent a logical change
   - Avoid mixing unrelated changes
   - Split large changes into multiple commits`,
        command: 'git rebase -i HEAD~3',
        task: 'Clean up your commit history before creating a pull request'
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting & Recovery',
    lessons: [
      {
        id: 'undo-changes',
        title: 'Undoing Changes',
        description: 'Methods for undoing changes at different stages',
        content: `Different ways to undo changes depending on their state:

1. Uncommitted changes:
   - Discard all changes: \`git restore .\` or \`git checkout -- .\`
   - Discard specific file: \`git restore file.txt\`

2. Staged changes:
   - Unstage all: \`git restore --staged .\`
   - Unstage file: \`git restore --staged file.txt\`

3. Last commit:
   - Change message: \`git commit --amend\`
   - Add more changes: Stage changes, then \`git commit --amend\`
   - Undo commit but keep changes: \`git reset --soft HEAD~1\`
   - Completely remove commit: \`git reset --hard HEAD~1\`

4. Public commits:
   - Create a reverting commit: \`git revert <commit-hash>\`
   - NEVER use reset on pushed commits`,
        command: 'git restore --staged .',
        task: 'Practice undoing changes at different stages'
      },
      {
        id: 'conflict-resolution',
        title: 'Advanced Conflict Resolution',
        description: 'Strategies for handling complex merge conflicts',
        content: `Resolving conflicts effectively:

1. Understanding conflict markers:
   \`\`\`
   <<<<<<< HEAD
   Your changes
   =======
   Their changes
   >>>>>>> branch-name
   \`\`\`

2. Tools for resolving conflicts:
   - Visual tools: \`git mergetool\`
   - IDE integration (VS Code, IntelliJ)
   - \`git config merge.conflictstyle diff3\` to show original content

3. Strategies for complex conflicts:
   - Understand both changes before resolving
   - Communicate with the author of the other changes
   - Consider \`git checkout --ours file.txt\` or \`--theirs\` for simple cases
   - For complex files, sometimes it's cleaner to take one version and re-apply your changes

4. After resolution:
   - \`git add <resolved-files>\`
   - \`git commit\` to complete the merge`,
        command: null,
        task: 'Resolve merge conflicts using different strategies'
      },
      {
        id: 'lost-commits',
        title: 'Recovering Lost Commits',
        description: 'How to find and restore lost work',
        content: `Git rarely loses your work completely. Recovery techniques:

1. Find dangling commits:
   - \`git reflog\` shows a history of where HEAD has pointed
   - Works even after reset or rebase disasters
   - Example: \`git reset --hard HEAD@{2}\` to go back 2 reflog entries

2. Interrupted workflow:
   - \`git stash list\` to see stashed changes
   - \`git stash apply stash@{0}\` to restore a specific stash
   - \`git fsck --lost-found\` can find orphaned commits

3. Accidentally deleted branch:
   - Find the commit: \`git reflog\`
   - Recreate the branch: \`git branch <branch-name> <commit-hash>\`

4. Experimental recovery:
   - \`git cherry-pick <commit-hash>\` to reapply specific commits
   - \`git rebase --onto <new-base> <old-base> <branch>\` to transplant branches`,
        command: 'git reflog',
        task: 'Use git reflog to find and recover a "lost" commit'
      },
      {
        id: 'git-bisect',
        title: 'Finding Bugs with Git Bisect',
        description: 'Use binary search to find which commit introduced a bug',
        content: `Git bisect uses binary search to find problematic commits:

1. Start the bisect process:
   \`git bisect start\`

2. Mark the current version as bad:
   \`git bisect bad\`

3. Mark a known good version:
   \`git bisect good v1.0\`

4. Git will checkout commits in between, and you mark each as good or bad:
   \`git bisect good\` or \`git bisect bad\`

5. Eventually, git will identify the first bad commit

6. End the bisect process:
   \`git bisect reset\`

7. Advanced: Automate with a test script:
   \`git bisect run ./test.sh\`
   
This is extremely powerful for finding when bugs were introduced.`,
        command: 'git bisect start',
        task: 'Use git bisect to find which commit introduced a bug'
      }
    ]
  },
  {
    id: 'advanced-tips',
    title: 'Advanced Tips & Tricks',
    lessons: [
      {
        id: 'aliases',
        title: 'Git Aliases',
        description: 'Create shortcuts for common Git commands',
        content: `Create aliases for frequently used commands:

1. Set up aliases in Git config:
   \`git config --global alias.co checkout\`
   \`git config --global alias.br branch\`
   \`git config --global alias.ci commit\`
   \`git config --global alias.st status\`

2. Create more complex aliases:
   \`git config --global alias.unstage 'reset HEAD --'\`
   \`git config --global alias.last 'log -1 HEAD'\`
   \`git config --global alias.visual '!gitk'\`

3. Super-charged log aliases:
   \`git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"\`

4. Edit your global config:
   \`git config --global --edit\``,
        command: 'git config --global alias.co checkout',
        task: 'Set up some useful Git aliases for your workflow'
      },
      {
        id: 'hooks',
        title: 'Git Hooks',
        description: 'Automate tasks with Git hooks',
        content: `Git hooks automate tasks at specific points in your Git workflow:

1. Local hooks (in .git/hooks):
   - pre-commit: Run before a commit is created (linting, tests)
   - prepare-commit-msg: Modify commit message template
   - post-commit: Run after a commit is created (notifications)
   - pre-push: Run before a push (final validation)

2. Create a simple pre-commit hook:
   \`\`\`bash
   # .git/hooks/pre-commit
   #!/bin/sh
   npm test
   if [ $? -ne 0 ]; then
     echo "Tests failed, aborting commit"
     exit 1
   fi
   \`\`\`

3. Team hooks with Husky:
   - Add hooks to your repository with npm packages
   - Define in package.json for team sharing
   - Example: husky + lint-staged for pre-commit linting`,
        command: null,
        task: 'Create a pre-commit hook that runs tests before allowing commits'
      },
      {
        id: 'selective-commits',
        title: 'Selective Staging and Patching',
        description: 'Precisely control what goes into each commit',
        content: `Create more focused commits by selecting exactly what to include:

1. Stage parts of a file:
   \`git add -p\` or \`git add --patch\`
   - Answer 'y' to stage a hunk, 'n' to skip it
   - 's' to split a hunk into smaller ones
   - 'e' to manually edit a hunk

2. Interactive staging:
   \`git add -i\` provides a menu to selectively stage/unstage

3. Commit specific files:
   \`git commit file1.js file2.js\`

4. Stage hunks while viewing full file context:
   \`git add -p\` is particularly useful when:
   - You've made multiple logical changes to one file
   - You want to exclude debug code from a commit
   - You're fixing multiple issues in one coding session`,
        command: 'git add -p',
        task: 'Use patch mode to stage only specific parts of your changes'
      },
      {
        id: 'worktrees',
        title: 'Git Worktrees',
        description: 'Work on multiple branches simultaneously',
        content: `Git worktrees let you check out multiple branches at the same time:

1. Add a worktree:
   \`git worktree add ../path-to-folder branch-name\`

2. Benefits:
   - Work on multiple branches without stashing/switching
   - Easily compare implementations side-by-side
   - Keep a clean main branch while working on features

3. Managing worktrees:
   - List worktrees: \`git worktree list\`
   - Remove a worktree: \`git worktree remove path-to-worktree\`
   - Prune old worktrees: \`git worktree prune\`

4. Example workflow:
   - Keep main branch in main directory
   - Add worktree for feature: \`git worktree add ../project-feature feature\`
   - Add worktree for hotfix: \`git worktree add ../project-hotfix hotfix\``,
        command: 'git worktree list',
        task: 'Set up a worktree for a feature branch'
      }
    ]
  }
];

const TutorialSystem = ({ onSelectCommand, currentTutorial, setCurrentTutorial }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [progress, setProgress] = useState({});
  
  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('gitTutorialProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gitTutorialProgress', JSON.stringify(progress));
  }, [progress]);
  
  const handleSectionSelect = (index) => {
    setCurrentSection(index);
    setCurrentLesson(0);
    if (setCurrentTutorial) {
      setCurrentTutorial(tutorials[index]);
    }
  };

  const handleLessonSelect = (index) => {
    setCurrentLesson(index);
  };

  const handleTryCommand = () => {
    const command = tutorials[currentSection].lessons[currentLesson].command;
    if (command && onSelectCommand) {
      onSelectCommand(command);
    }
  };

  const markLessonComplete = () => {
    const section = tutorials[currentSection];
    const lesson = section.lessons[currentLesson];
    const lessonKey = `${section.id}-${lesson.id}`;
    
    setProgress(prev => ({
      ...prev,
      [lessonKey]: true
    }));

    // If there's another lesson, automatically move to it
    if (currentLesson < section.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentSection < tutorials.length - 1) {
      // If we're at the end of a section, move to the next section
      setCurrentSection(currentSection + 1);
      setCurrentLesson(0);
    }
  };

  const isLessonCompleted = (sectionId, lessonId) => {
    const lessonKey = `${sectionId}-${lessonId}`;
    return !!progress[lessonKey];
  };

  const goToPreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentLesson(tutorials[currentSection - 1].lessons.length - 1);
    }
  };

  const goToNextLesson = () => {
    if (currentLesson < tutorials[currentSection].lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentSection < tutorials.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentLesson(0);
    }
  };

  const hasNextLesson = currentLesson < tutorials[currentSection].lessons.length - 1 || currentSection < tutorials.length - 1;
  const hasPreviousLesson = currentLesson > 0 || currentSection > 0;

  return (
    <div className="tutorial-system">
      <div className="tutorial-header">
        <h3>Git Tutorials</h3>
      </div>
      
      <div className="tutorial-navigation">
        <div className="section-tabs">
          {tutorials.map((section, index) => (
            <div 
              key={section.id}
              className={`section-tab ${currentSection === index ? 'active' : ''}`}
              onClick={() => handleSectionSelect(index)}
            >
              {section.title}
            </div>
          ))}
        </div>
      </div>
      
      <div className="lesson-content">
        <h4>{tutorials[currentSection].lessons[currentLesson].title}</h4>
        <p className="lesson-description">
          {tutorials[currentSection].lessons[currentLesson].description}
        </p>
        <div className="lesson-text">
          {tutorials[currentSection].lessons[currentLesson].content}
        </div>
        
        <div className="lesson-task">
          <strong>Task:</strong> {tutorials[currentSection].lessons[currentLesson].task}
        </div>
        
        <div className="lesson-actions">
          {tutorials[currentSection].lessons[currentLesson].command && (
            <button className="try-command-btn" onClick={handleTryCommand}>
              Try Command
            </button>
          )}
          
          <button 
            className="complete-lesson-btn"
            onClick={markLessonComplete}
            disabled={isLessonCompleted(tutorials[currentSection].id, tutorials[currentSection].lessons[currentLesson].id)}
          >
            {isLessonCompleted(tutorials[currentSection].id, tutorials[currentSection].lessons[currentLesson].id) 
              ? 'Completed' 
              : 'Mark Complete'}
          </button>
        </div>

        <div className="lesson-navigation">
          {hasPreviousLesson && (
            <button className="nav-prev-button" onClick={goToPreviousLesson}>
              « Previous Lesson
            </button>
          )}
          {hasNextLesson && (
            <button className="nav-next-button" onClick={goToNextLesson}>
              Next Lesson »
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialSystem; 