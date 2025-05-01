import { useQuery } from 'react-query';

export const useUserInfo = (handle) => {
  return useQuery(
    ['userInfo', handle],
    async () => {
      if (!handle) return [];
      
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user information');
      }
      
      const data = await response.json();
      
      if (data.status !== 'OK') {
        throw new Error(data.comment || 'Failed to fetch user information');
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