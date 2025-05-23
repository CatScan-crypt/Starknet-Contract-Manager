const path = require('path');

// Function to run scarb build in the given folder
async function runScarbBuild(folderPath) {
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);
    try {
        console.log(`[User] Changing directory to: ${folderPath}`);
        process.chdir(folderPath);

        // Step 2: Set SCARB_MANIFEST_PATH
        const manifestPath = path.join(process.cwd(), 'Scarb.toml');
        process.env.SCARB_MANIFEST_PATH = manifestPath;
        console.log(`[User] Set SCARB_MANIFEST_PATH to: ${manifestPath}`);

        console.log('[User] Running: scarb build');
        const { stdout, stderr } = await execAsync('scarb build');
        if (stdout) console.log('[User] scarb build output:', stdout);
        if (stderr) console.error('[User] scarb build error output:', stderr);
    } catch (err) {
        console.error('[User] scarb build failed:', err.message);
    }
}
module.exports = runScarbBuild;