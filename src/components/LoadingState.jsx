import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="text-center py-16">
      <Loader2 size={40} className="mx-auto text-indigo-600 animate-spin mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Data</h3>
      <p className="text-gray-500">Fetching Codeforces user information...</p>
    </div>
  );
};

export default LoadingState;