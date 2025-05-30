import React from 'react';
import type { Deployment } from './types/deployment'; // Corrected path
import DeploymentRow from './DeploymentRow'; // Corrected path

interface DeploymentsTableProps {
  deployments: Deployment[];
  isLoading?: boolean;
}

const DeploymentsTable: React.FC<DeploymentsTableProps> = ({ deployments, isLoading = false }) => {
  const tableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'contractAddress', label: 'CA' },
    { key: 'status', label: 'Status' },
    { key: 'transactionHash', label: 'TxH' },
    { key: 'tokenName', label: 'Name' },
    { key: 'tokenSymbol', label: 'Symbol' },
    { key: 'initialSupply', label: 'Supply' },
    { key: 'chain', label: 'Chain' },
    // { key: 'actions', label: 'Actions' }, // Placeholder for future action buttons
  ];

  if (isLoading) {
    return (
      <div className="w-full p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600 dark:text-gray-300">Loading deployments...</p>
      </div>
    );
  }

  if (!deployments || deployments.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No deployments found.</p>
        <p className="text-gray-400 dark:text-gray-500 mt-2">Deploy a contract to see its history here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header.key}
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {deployments.map((deployment) => (
            <DeploymentRow key={deployment.id} deployment={deployment} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeploymentsTable;
