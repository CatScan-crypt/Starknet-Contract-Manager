const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express on Railway!');
});

// Example API endpoint
db = [
  { id: 1, name: 'Test Token', supply: 1000 },
  { id: 2, name: 'Sample Token', supply: 500 }
];

app.get('/api/tokens', (req, res) => {
  res.json(db);
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
