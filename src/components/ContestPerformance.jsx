import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { format } from 'date-fns';
import { getRankColor } from '../utils/rankUtils';

const ContestPerformance = ({ userRating }) => {
  // Sort contests by time and get most recent 10
  const recentContests = [...userRating]
    .sort((a, b) => b.ratingUpdateTimeSeconds - a.ratingUpdateTimeSeconds)
    .slice(0, 10)
    .reverse();
  
  const chartData = recentContests.map(contest => ({
    name: contest.contestName.length > 20 
      ? contest.contestName.substring(0, 20) + '...' 
      : contest.contestName,
    rating: contest.newRating,
    change: contest.newRating - contest.oldRating,
    date: format(new Date(contest.ratingUpdateTimeSeconds * 1000), 'MMM d, yyyy'),
    rank: contest.rank,
    fullName: contest.contestName
  }));

  // Calculate statistics
  const totalContests = userRating.length;
  const bestRank = userRating.length > 0 
    ? Math.min(...userRating.map(contest => contest.rank))
    : 'N/A';
  
  // Find contest with the best rank
  const bestRankContest = userRating.find(contest => contest.rank === bestRank);
  
  // Calculate current rank color
  const currentRating = userRating.length > 0 
    ? userRating[userRating.length - 1].newRating 
    : 0;
  const rankColor = getRankColor(currentRating);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Contest Performance</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-b border-gray-200">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-500 text-sm">Total Contests</p>
          <p className="text-2xl font-bold text-gray-800">{totalContests}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-500 text-sm">Best Rank</p>
          <p className="text-2xl font-bold text-gray-800">{bestRank}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-500 text-sm">Last Rating</p>
          <p className="text-2xl font-bold" style={{ color: rankColor }}>
            {currentRating}
          </p>
        </div>
      </div>
      
      {chartData.length > 0 ? (
        <div className="p-4">
          <p className="text-gray-500 text-sm mb-4">Rating Trend (Last {chartData.length} Contests)</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={rankColor} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={rankColor} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip 
                  formatter={(value, name, props) => {
                    if (name === 'rating') return [value, 'Rating'];
                    return [value, name];
                  }}
                  labelFormatter={(label, items) => {
                    const item = items[0]?.payload;
                    return item ? `${item.fullName} (${item.date})` : label;
                  }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="custom-tooltip bg-white p-2 border border-gray-200 shadow-sm rounded">
                          <p className="font-medium">{data.fullName}</p>
                          <p className="text-sm text-gray-500">{data.date}</p>
                          <p className="text-sm">Rank: <span className="font-medium">{data.rank}</span></p>
                          <p className="text-sm">Rating: <span className="font-medium">{data.rating}</span></p>
                          <p className="text-sm">
                            Change: 
                            <span className={`font-medium ml-1 ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {data.change >= 0 ? '+' : ''}{data.change}
                            </span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="rating" 
                  stroke={rankColor} 
                  fillOpacity={1} 
                  fill="url(#colorRating)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          No contest data available
        </div>
      )}
      
      {recentContests.length > 0 && (
        <div className="p-4">
          <p className="text-gray-700 font-medium mb-2">Recent Contests</p>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contest</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating Change</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentContests.map((contest, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-normal">
                      <a 
                        href={`https://codeforces.com/contest/${contest.contestId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        {contest.contestName}
                      </a>
                    </td>
                    <td className="px-4 py-2">{contest.rank}</td>
                    <td className={`px-4 py-2 font-medium ${contest.newRating > contest.oldRating ? 'text-green-600' : 'text-red-600'}`}>
                      {contest.newRating > contest.oldRating ? '+' : ''}
                      {contest.newRating - contest.oldRating}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {format(new Date(contest.ratingUpdateTimeSeconds * 1000), 'MMM d, yyyy')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestPerformance;