const TelegramBot = require('node-telegram-bot-api');
const downloadAndLogFile = require('./logContent');
const runScarbBuild = require('./scarbBuild');
const JSON5 = require('json5');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const token = process.env.token;
const bot = new TelegramBot(token, { polling: true });
const TARGET_CHANNEL_ID = process.env.TARGET_CHANNEL_ID; // Replace with your target channel ID

// Log messages sent by other users
bot.on('channel_post', async (msg) => {
    if (msg.chat.id == TARGET_CHANNEL_ID) {
        const fileName = msg.document.file_name;
        let folderPath = __dirname; // Default folder path
        console.log( "dd" ,msg)
        if (fileName.endsWith('.cairo')) {
            console.log(`[User] Document received: ${fileName}`);

            // Try to parse the caption as JSON
            if (msg.caption) {
                try {
                    const captionJson = JSON5.parse(msg.caption);
                    const requestId = captionJson.requestId;

                    if (requestId) {
                        console.log(`[User] requestId: ${requestId}`);

                        // Define the folder path
                        folderPath = path.join(__dirname,'deployments', requestId);

                        // Check if folder exists, and create if not
                        if (!fs.existsSync(folderPath)) {
                            fs.mkdirSync(folderPath, { recursive: true });
                            fs.mkdirSync(path.join(folderPath, 'src'), { recursive: true });
                            fs.copyFileSync('./Scarb.toml', path.join(folderPath, 'Scarb.toml'));
                            fs.copyFileSync('./Scarb.lock', path.join(folderPath, 'Scarb.lock'));
                            console.log(`[User] Created directory: ${folderPath}`);
                        } 
                        
                        else {
                            console.log(`[User] Directory already exists: ${folderPath}`);
                        }
                        await downloadAndLogFile(bot, msg.document, fileName, folderPath); // Pass the correct path
                        await runScarbBuild(folderPath);
                    }
                } catch (err) {
                    console.warn('[User] Invalid JSON caption:', err.message);
                }
            }
        }
    }
});


bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});