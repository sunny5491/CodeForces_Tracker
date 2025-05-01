import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const LanguageStats = ({ userSubmissions }) => {
  const stats = useMemo(() => {
    // Count languages
    const languageCounts = {};
    userSubmissions.forEach(sub => {
      const language = sub.programmingLanguage;
      languageCounts[language] = (languageCounts[language] || 0) + 1;
    });
    
    // Sort languages by count and get top 5
    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
    
    // Count problem tags
    const tagCounts = {};
    userSubmissions
      .filter(sub => sub.verdict === 'OK')
      .forEach(sub => {
        if (sub.problem.tags) {
          sub.problem.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });
    
    // Sort tags by count and get top 8
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]) => ({ name, value }));
    
    return { topLanguages, topTags };
  }, [userSubmissions]);
  
  // Colors for the charts
  const LANGUAGE_COLORS = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Language & Tags</h2>
      </div>
      
      <div className="p-4">
        <p className="text-gray-700 font-medium mb-2">Programming Languages</p>
        
        {stats.topLanguages.length > 0 ? (
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.topLanguages}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stats.topLanguages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={LANGUAGE_COLORS[index % LANGUAGE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No language data available
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <p className="text-gray-700 font-medium mb-4">Most Used Problem Tags</p>
        
        {stats.topTags.length > 0 ? (
          <div className="space-y-3">
            {stats.topTags.map((tag, index) => {
              const maxValue = stats.topTags[0].value;
              const percentage = Math.round((tag.value / maxValue) * 100);
              
              return (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">{tag.name}</span>
                    <span className="text-gray-600">{tag.value} problems</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: LANGUAGE_COLORS[index % LANGUAGE_COLORS.length]
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No tag data available
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageStats;