const fs = require('fs');
const https = require('https');
const path = require('path');

// Function to download and log the content of a .cairo file
async function downloadAndLogFile(bot, document, fileName, folderPath) {
    try {
        const file = await bot.getFile(document.file_id);
        const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
        const localPath = path.join(folderPath,'src', fileName);

        // Download file
        const fileStream = fs.createWriteStream(localPath);
        https.get(fileUrl, (response) => {
            response.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();

                // Read and log file content
                const content = fs.readFileSync(localPath, 'utf-8');
                console.log(`\ndownloaded ${fileName} to ${localPath}`);
            });
        });
    } catch (err) {
        console.error('Error downloading or reading .cairo file:', err);
    }
}

module.exports = downloadAndLogFile;

// ↓↓↓↓↓↓to build from the current directory↓↓↓↓↓↓↓
// export SCARB_MANIFEST_PATH=$(pwd)/Scarb.toml  
