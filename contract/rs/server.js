require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const rootRoute = require('./rootRoute');
const sendDocRoute = require('./sendDocRoute');
const statusRoute = require('./statusRoute');
const downloadRoute = require('./downloadRoute');
const installerRoute = require('./installerRoute');

app.use('/', rootRoute);
app.use('/', sendDocRoute);
app.use('/', statusRoute);
app.use('/', downloadRoute);
app.use('/', installerRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
