import React from 'react';
import { ExternalLink } from 'lucide-react';
import { getRankColor } from '../utils/rankUtils';

const UserProfile = ({ userInfo }) => {
  const rankColor = getRankColor(userInfo.rank);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* User Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4" style={{ borderColor: rankColor }}>
            <img 
              src={userInfo.titlePhoto} 
              alt={`${userInfo.handle}'s avatar`} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* User Details */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">{userInfo.handle}</h2>
              <a 
                href={`https://codeforces.com/profile/${userInfo.handle}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 inline-flex items-center"
              >
                <ExternalLink size={16} className="ml-1" />
              </a>
            </div>
            
            <div className="px-3 py-1 inline-block rounded-full font-semibold text-sm mb-4" style={{ backgroundColor: rankColor, color: '#fff' }}>
              {userInfo.rank || 'Unrated'}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-sm">Current Rating</p>
                <p className="text-xl font-bold" style={{ color: rankColor }}>
                  {userInfo.rating || 'Unrated'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-sm">Max Rating</p>
                <p className="text-xl font-bold" style={{ color: getRankColor(userInfo.maxRank) }}>
                  {userInfo.maxRating || 'Unrated'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-sm">Contribution</p>
                <p className="text-xl font-bold" style={{ color: userInfo.contribution >= 0 ? 'green' : 'red' }}>
                  {userInfo.contribution}
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-sm">Friend of</p>
                <p className="text-xl font-bold text-gray-700">
                  {userInfo.friendOfCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;