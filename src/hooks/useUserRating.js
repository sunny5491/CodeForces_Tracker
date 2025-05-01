import { useQuery } from 'react-query';

export const useUserRating = (handle) => {
  return useQuery(
    ['userRating', handle],
    async () => {
      if (!handle) return [];
      
      const response = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user rating');
      }
      
      const data = await response.json();
      
      if (data.status !== 'OK') {
        throw new Error(data.comment || 'Failed to fetch user rating');
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