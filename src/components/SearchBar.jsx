import React, { useState, useEffect } from 'react';
import { Search, Clock, X } from 'lucide-react';

const SearchBar = ({ initialValue, onSearch, onSavedSearch }) => {
  const [handle, setHandle] = useState(initialValue);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveSearch = (searchHandle) => {
    if (!searchHandle.trim()) return;
    
    const updatedSearches = [
      searchHandle,
      ...recentSearches.filter(item => item !== searchHandle)
    ].slice(0, 5);
    
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handle.trim()) {
      onSearch(handle.trim());
      saveSearch(handle.trim());
      setShowRecent(false);
    }
  };

  const handleRecentSearch = (recentHandle) => {
    setHandle(recentHandle);
    onSavedSearch(recentHandle);
    setShowRecent(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="relative max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex">
          <div className="relative flex-grow">
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              onFocus={() => setShowRecent(true)}
              placeholder="Enter Codeforces username"
              className="w-full py-3 px-4 pl-12 bg-white border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            {handle && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setHandle('')}
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-r-lg shadow-sm transition duration-150 ease-in-out"
          >
            Search
          </button>
        </div>
      </form>

      {showRecent && recentSearches.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg border border-gray-200">
          <div className="p-2 flex justify-between items-center border-b border-gray-200">
            <span className="text-sm text-gray-500 font-medium">Recent Searches</span>
            <button 
              onClick={clearRecentSearches}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Clear All
            </button>
          </div>
          <ul>
            {recentSearches.map((recentHandle, index) => (
              <li key={index}>
                <button
                  onClick={() => handleRecentSearch(recentHandle)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Clock size={16} className="text-gray-400" />
                  <span>{recentHandle}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;