require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const rootRoute = require('./routes/rootRoute');
const sendDocRoute = require('./routes/sendDocRoute');
const statusRoute = require('./routes/statusRoute');
const downloadRoute = require('./routes/downloadRoute');
const uploadRoute = require('./routes/uploadRoute');
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));
app.use('/', rootRoute);
app.use('/', sendDocRoute);
app.use('/', statusRoute);
app.use('/', downloadRoute);
app.use('/', uploadRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
