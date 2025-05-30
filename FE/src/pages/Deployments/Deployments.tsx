import React from 'react';
import DeploymentsTable from './DeploymentsTable';
import deploymentHistory from './deployment_history.json';
import type { Deployment } from './types/deployment'; // Type-only import

const Deployments: React.FC = () => {
  // Cast the imported JSON to the Deployment[] type
  const deployments = deploymentHistory as Deployment[];

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-black text-center">Deployment History</h1>
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
        <DeploymentsTable deployments={deployments} />
      </div>
    </div>
  );
};

export default Deployments;


// The "Add to wallet" functionality.
// Sorting the table by different columns.
// Filtering the deployments.
// Setting up a service to fetch/manage deployment data instead of using the static JSON file.