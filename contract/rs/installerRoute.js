const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// POST /run-installer
router.get('/run-installer', (req, res) => {
  const installerPath = path.join(__dirname, 'installer.bash');
  exec(`bash "${installerPath}"`, { cwd: __dirname, timeout: 10 * 60 * 1000, maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
    if (error) {
      console.error('Installer error:', error, stderr);
      return res.status(500).json({ success: false, error: stderr || error.message });
    }
    // List files and directories after installation
    const filesAndDirs = fs.readdirSync(__dirname);
    console.log('Files and directories in installer directory after installation:', filesAndDirs);
    res.json({ success: true, output: stdout, filesAndDirs });
  });
});

module.exports = router;
