# Starknet Contract Manager – Backend

This is the backend for the Starknet Contract Manager app, built with Node.js, Express, and PostgreSQL. It stores and retrieves deployment records of smart contracts, including token details and on-chain status.

## Features

- Store Starknet contract deployment metadata
- Fetch deployments by user address
- PostgreSQL database integration
- .env config support

## Tech Stack

- Node.js
- Express
- PostgreSQL
- pg (PostgreSQL client)
- dotenv

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/starknet-contract-manager.git
cd starknet-contract-manager/BE
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a .env File

```bash
cp .env.example .env
```

Update .env with your PostgreSQL credentials.

### 4. Start the Server

```bash
node server.js
```

By default, it runs on http://localhost:3000

## API Endpoints

### POST /api/deployments

Store a new deployment record.

**Request Body:**

```json
{
  "user_address": "0xabc123",
  "contract_address": "0xdef456",
  "transaction_hash": "0xhash789",
  "token_name": "TestToken",
  "token_symbol": "TTK",
  "initial_supply": "1000000",
  "status": "deployed",
  "deployed_on_chain": true
}
```

### GET /api/deployments/:userAddress

Retrieve all deployments for a given user.

## Testing

Use tools like Postman or curl to test your endpoints.

## Database Schema

```sql
CREATE TABLE deployments (
  id SERIAL PRIMARY KEY,
  user_address TEXT NOT NULL,
  contract_address TEXT,
  transaction_hash TEXT,
  token_name TEXT,
  token_symbol TEXT,
  initial_supply TEXT,
  status TEXT,
  deployed_on_chain BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

