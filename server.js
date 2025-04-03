const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Create temp-repo directory if it doesn't exist
const tempRepoPath = path.join(__dirname, 'temp-repo');
if (!fs.existsSync(tempRepoPath)) {
  fs.mkdirSync(tempRepoPath);
}

// Initialize Git repository in the temporary directory
const git = simpleGit(tempRepoPath);

// Function to create a demo file
const createDemoFile = async (filename, content) => {
  const filePath = path.join(tempRepoPath, filename);
  fs.writeFileSync(filePath, content);
  return filePath;
};

// Make sure the repo is initialized when the server starts
(async () => {
  try {
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      await git.init();
      // Create a sample README file for the first commit
      await createDemoFile('README.md', '# Git Training Repository\n\nThis is a sample repository for Git training.');
      await git.add('README.md');
      await git.commit('Initial commit');
      console.log('Repository initialized with a sample README file');
    }
  } catch (error) {
    console.error('Error initializing repository:', error);
  }
})();

// API Routes
app.post('/api/init', async (req, res) => {
  try {
    await git.init();
    res.json({ message: 'Repository initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/add', async (req, res) => {
  try {
    const { files } = req.body;
    await git.add(files || '.');
    res.json({ message: 'Files staged successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/commit', async (req, res) => {
  try {
    const { message } = req.body;
    await git.commit(message || 'Commit');
    res.json({ message: 'Changes committed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/branch', async (req, res) => {
  try {
    const { name } = req.body;
    await git.branch([name]);
    res.json({ message: `Branch "${name}" created successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/checkout', async (req, res) => {
  try {
    const { branch } = req.body;
    await git.checkout(branch);
    res.json({ message: `Switched to branch "${branch}"` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/merge', async (req, res) => {
  try {
    const { branch } = req.body;
    await git.merge([branch]);
    res.json({ message: `Merged branch "${branch}" into current branch` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/status', async (req, res) => {
  try {
    const status = await git.status();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/log', async (req, res) => {
  try {
    const log = await git.log();
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/branches', async (req, res) => {
  try {
    const branches = await git.branch();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// File operations for the editor
app.post('/api/save-file', async (req, res) => {
  try {
    const { filename, content } = req.body;
    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }
    
    const filePath = await createDemoFile(filename, content);
    res.json({ message: `File ${filename} saved successfully`, path: filePath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/read-file', async (req, res) => {
  try {
    const { filename } = req.query;
    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }
    
    const filePath = path.join(tempRepoPath, filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/list-files', async (req, res) => {
  try {
    const files = fs.readdirSync(tempRepoPath)
      .filter(file => !file.startsWith('.git'))
      .map(file => {
        const stats = fs.statSync(path.join(tempRepoPath, file));
        return {
          name: file,
          isDirectory: stats.isDirectory(),
          size: stats.size,
          modified: stats.mtime
        };
      });
    
    res.json({ files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Handle port-in-use errors gracefully
const startServer = () => {
  try {
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please use a different port.`);
        console.error('You can change the port in server.js or stop the process using that port.');
        process.exit(1);
      } else {
        console.error('Server error:', error);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 