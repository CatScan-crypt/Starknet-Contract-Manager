import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { query } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Test endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Store deployment
app.post('/api/deployments', async (req, res) => {
  const {
    user_address, contract_address, transaction_hash,
    token_name, token_symbol, initial_supply,
    status, deployed_on_chain
  } = req.body;

  try {
    const result = await query(
      `INSERT INTO deployments (
        user_address, contract_address, transaction_hash,
        token_name, token_symbol, initial_supply,
        status, deployed_on_chain
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [user_address, contract_address, transaction_hash,
       token_name, token_symbol, initial_supply,
       status, deployed_on_chain]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to store deployment");
  }
});

// Get deployments for user
app.get('/api/deployments/:userAddress', async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM deployments WHERE user_address = $1 ORDER BY created_at DESC`,
      [req.params.userAddress]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch deployments");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
