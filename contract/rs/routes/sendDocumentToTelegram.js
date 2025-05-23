const fs = require('fs');
const FormData = require('form-data');
const dotenv = require('dotenv');
async function sendDocumentToTelegram({ file, caption }) {
  const formdata = new FormData();
  formdata.append('chat_id', process.env.TARGET_CHANNEL_ID);
  formdata.append('document', fs.createReadStream(file.path), file.originalname);
  formdata.append('caption', caption );

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
    headers: formdata.getHeaders()
  };

  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  const response = await fetch(`https://api.telegram.org/bot${process.env.token}/sendDocument`, requestOptions);
  const result = await response.text();
  return result;
}

module.exports = sendDocumentToTelegram;
