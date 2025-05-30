import React from 'react';
import type { Deployment } from './types/deployment'; // Corrected path, type-only import

interface DeploymentRowProps {
  deployment: Deployment;
}

const formatTimestamp = (isoDate: string): string => {
  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) {
      if (typeof isoDate === 'string' && (isoDate.toLowerCase() === 'pending' || isoDate.toLowerCase() === 'fail')) {
        return isoDate;
      }
      return 'Invalid Date';
    }
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } catch (error) {
    console.error('Error formatting timestamp:', isoDate, error);
    return 'Error';
  }
};

const DeploymentRow: React.FC<DeploymentRowProps> = ({ deployment }) => {
  const statusColor =
    deployment.status === 'Success' ? 'text-green-600 dark:text-green-400' :
    deployment.status === 'Fail'    ? 'text-red-600 dark:text-red-400' :
    'text-yellow-500 dark:text-yellow-400';

  const truncateString = (str: string, num: number): string => {
    if (!str || typeof str !== 'string') return 'N/A';
    if (str.toLowerCase() === 'pending' && str.length <= num) return 'Pending';
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150 ease-in-out">
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{deployment.id}</td>
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{formatTimestamp(deployment.timestamp)}</td>
      <td
        className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap font-mono"
        title={deployment.contractAddress}
      >
        {truncateString(deployment.contractAddress, 15)}
      </td>
      <td className={`px-4 py-3 text-sm font-semibold ${statusColor} whitespace-nowrap`}>{deployment.status}</td>
      <td
        className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap font-mono"
        title={deployment.transactionHash}
      >
         {truncateString(deployment.transactionHash, 15)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{deployment.tokenName}</td>
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{deployment.tokenSymbol}</td>
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap text-right">
        {typeof deployment.initialSupply === 'number' ? deployment.initialSupply.toLocaleString() : 'N/A'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{deployment.chain}</td>
      {/* Actions cell will be added later */}
    </tr>
  );
};

export default DeploymentRow;
