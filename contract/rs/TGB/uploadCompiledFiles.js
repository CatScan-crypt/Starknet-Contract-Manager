const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

/**
 * Uploads all compiled files in the targetDir to the Railway server for a given requestId.
 * @param {string} targetDir - Path to the directory containing compiled files.
 * @param {string} requestId - The request ID for the upload endpoint.
 */
async function uploadCompiledFiles(targetDir, requestId) {
    if (fs.existsSync(targetDir)) {
        const files = fs.readdirSync(targetDir);
        for (const file of files) {
            const filePath = require('path').join(targetDir, file);
            if (fs.statSync(filePath).isFile()) {
                const form = new FormData();
                form.append('file', fs.createReadStream(filePath), file);
                try {
                    const uploadUrl = 'http://localhost:3000/upload/' + requestId;
                    const response = await axios.post(uploadUrl, form, {
                        headers: form.getHeaders(),
                    });
                    console.log(`[User] Uploaded compiled file: ${file}`, response.data);
                } catch (err) {
                    console.error(`[User] Failed to upload compiled file: ${file}`, err.message);
                }
            }
        }
    } else {
        console.warn('[User] Compiled directory not found:', targetDir);
    }
}

module.exports = uploadCompiledFiles;
