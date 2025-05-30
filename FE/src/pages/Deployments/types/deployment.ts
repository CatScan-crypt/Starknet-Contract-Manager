export interface Deployment {
  id: number;
  timestamp: string; // ISO date string, e.g., "2025-05-30T09:44:38.130Z"
  contractAddress: string;
  status: 'Success' | 'Fail' | 'Pending'; // Includes 'Pending' as a common status
  transactionHash: string;
  tokenName: string;
  tokenSymbol: string;
  initialSupply: number;
  chain: string; // e.g., "mainnet", "sepolia"
}
