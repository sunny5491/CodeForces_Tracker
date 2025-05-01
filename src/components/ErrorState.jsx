import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorState = () => {
  return (
    <div className="text-center py-16 bg-white rounded-lg shadow-md">
      <AlertCircle size={40} className="mx-auto text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Data</h3>
      <p className="text-gray-500 mb-4">
        We couldn't fetch the Codeforces data. This may happen if:
      </p>
      <ul className="text-gray-600 list-disc list-inside max-w-md mx-auto text-left">
        <li>The username doesn't exist</li>
        <li>Codeforces API is temporarily unavailable</li>
        <li>There was a network issue</li>
      </ul>
      <p className="text-gray-500 mt-4">Please try again with a valid username.</p>
    </div>
  );
};

export default ErrorState;