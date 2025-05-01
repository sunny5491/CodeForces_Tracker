import { useQuery } from 'react-query';

export const useUserSubmissions = (handle) => {
  return useQuery(
    ['userSubmissions', handle],
    async () => {
      if (!handle) return [];
      
      const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user submissions');
      }
      
      const data = await response.json();
      
      if (data.status !== 'OK') {
        throw new Error(data.comment || 'Failed to fetch user submissions');
      }
      
      return data.result;
    },
    {
      enabled: !!handle,
      staleTime: 300000, // 5 minutes
      retry: 1
    }
  );
};