import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CodeforcesTracker from './components/CodeforcesTracker';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-50">
        <CodeforcesTracker />
      </div>
    </QueryClientProvider>
  );
}

export default App;