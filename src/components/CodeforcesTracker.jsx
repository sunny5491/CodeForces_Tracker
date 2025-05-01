import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Dashboard from './Dashboard';
import { useUserInfo } from '../hooks/useUserInfo';
import { useUserRating } from '../hooks/useUserRating';
import { useUserSubmissions } from '../hooks/useUserSubmissions';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const CodeforcesTracker = () => {
  const [handle, setHandle] = useState('');
  const [searchedHandle, setSearchedHandle] = useState('');
  
  const handleSearch = (username) => {
    setSearchedHandle(username);
  };

  const userInfoQuery = useUserInfo(searchedHandle);
  const userRatingQuery = useUserRating(searchedHandle);
  const userSubmissionsQuery = useUserSubmissions(searchedHandle);

  const isLoading = userInfoQuery.isLoading || userRatingQuery.isLoading || userSubmissionsQuery.isLoading;
  const isError = userInfoQuery.isError || userRatingQuery.isError || userSubmissionsQuery.isError;
  
  const handleSavedSearch = (savedHandle) => {
    setHandle(savedHandle);
    setSearchedHandle(savedHandle);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">
          Codeforces Tracker
        </h1>
        <p className="text-gray-600 mb-6">
          Track and analyze Codeforces user performance and statistics
        </p>
        <SearchBar 
          initialValue={handle} 
          onSearch={handleSearch} 
          onSavedSearch={handleSavedSearch}
        />
      </header>

      {isLoading && <LoadingState />}
      
      {isError && <ErrorState />}
      
      {!isLoading && !isError && searchedHandle && userInfoQuery.data && userRatingQuery.data && userSubmissionsQuery.data && (
        <Dashboard 
          userInfo={userInfoQuery.data}
          userRating={userRatingQuery.data}
          userSubmissions={userSubmissionsQuery.data}
        />
      )}

      {!searchedHandle && !isLoading && (
        <div className="text-center mt-16 py-16 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome to Codeforces Tracker</h2>
          <p className="text-gray-600 mb-6">
            Enter a Codeforces handle above to get detailed analytics
          </p>
        </div>
      )}
    </div>
  );
};

export default CodeforcesTracker;