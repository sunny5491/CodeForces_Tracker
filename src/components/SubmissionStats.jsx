import React, { useMemo } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';

const SubmissionStats = ({ userSubmissions }) => {
  const stats = useMemo(() => {
    // Get unique problems by problemId+index (avoids counting the same problem multiple times)
    const uniqueProblems = new Set(
      userSubmissions.map(sub => `${sub.problem.contestId}_${sub.problem.index}`)
    );
    
    // Count verdicts
    const verdicts = {};
    userSubmissions.forEach(sub => {
      const verdict = sub.verdict;
      verdicts[verdict] = (verdicts[verdict] || 0) + 1;
    });
    
    // Calculate problem difficulty distribution
    const difficultyCount = {
      'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E+': 0
    };
    
    const solvedProblems = userSubmissions
      .filter(sub => sub.verdict === 'OK')
      .map(sub => `${sub.problem.contestId}_${sub.problem.index}`);
    
    const uniqueSolvedProblems = new Set(solvedProblems);
    
    userSubmissions
      .filter(sub => sub.verdict === 'OK')
      .forEach(sub => {
        const index = sub.problem.index.charAt(0);
        if (index === 'A') difficultyCount['A']++;
        else if (index === 'B') difficultyCount['B']++;
        else if (index === 'C') difficultyCount['C']++;
        else if (index === 'D') difficultyCount['D']++;
        else difficultyCount['E+']++;
      });
    
    // Calculate submission trends
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    const dailySubmissions = userSubmissions.filter(sub => 
      new Date(sub.creationTimeSeconds * 1000) >= oneDayAgo
    ).length;
    
    const weeklySubmissions = userSubmissions.filter(sub => 
      new Date(sub.creationTimeSeconds * 1000) >= sevenDaysAgo
    ).length;
    
    const monthlySubmissions = userSubmissions.filter(sub => 
      new Date(sub.creationTimeSeconds * 1000) >= thirtyDaysAgo
    ).length;
    
    // Calculate success rate
    const totalSubmissions = userSubmissions.length;
    const acceptedSubmissions = userSubmissions.filter(sub => sub.verdict === 'OK').length;
    const successRate = totalSubmissions > 0 
      ? Math.round((acceptedSubmissions / totalSubmissions) * 100) 
      : 0;
    
    return {
      uniqueProblems: uniqueProblems.size,
      uniqueSolvedProblems: uniqueSolvedProblems.size,
      verdicts,
      difficultyCount,
      dailySubmissions,
      weeklySubmissions,
      monthlySubmissions,
      successRate
    };
  }, [userSubmissions]);
  
  // Prepare data for pie chart
  const verdictData = Object.entries(stats.verdicts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Show only top 5 verdicts
  
  // Colors for the verdict chart
  const VERDICT_COLORS = {
    'OK': '#4CAF50',
    'WRONG_ANSWER': '#F44336',
    'TIME_LIMIT_EXCEEDED': '#FF9800',
    'COMPILATION_ERROR': '#9C27B0',
    'RUNTIME_ERROR': '#E91E63',
    'MEMORY_LIMIT_EXCEEDED': '#795548'
  };
  
  const getVerdictColor = (verdict) => {
    return VERDICT_COLORS[verdict] || '#2196F3';
  };
  
  // Prepare data for difficulty distribution
  const difficultyData = Object.entries(stats.difficultyCount).map(([name, value]) => ({ name, value }));
  
  // Difficulty colors
  const DIFFICULTY_COLORS = ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'];
  
  // Format verdict names for better readability
  const formatVerdictName = (name) => {
    if (name === 'OK') return 'Accepted';
    return name.split('_').map(word => 
      word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Submission Statistics</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border-b border-gray-200">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-500 text-sm">Problems Solved</p>
          <p className="text-2xl font-bold text-gray-800">{stats.uniqueSolvedProblems}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-500 text-sm">Success Rate</p>
          <p className="text-2xl font-bold text-gray-800">{stats.successRate}%</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-500 text-sm">Weekly Submissions</p>
          <p className="text-2xl font-bold text-gray-800">{stats.weeklySubmissions}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-500 text-sm">Monthly Submissions</p>
          <p className="text-2xl font-bold text-gray-800">{stats.monthlySubmissions}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Verdict Distribution */}
        <div>
          <p className="text-gray-700 font-medium mb-2">Verdict Distribution</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={verdictData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${formatVerdictName(name)} ${(percent * 100).toFixed(0)}%`}
                >
                  {verdictData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getVerdictColor(entry.name)} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [value, formatVerdictName(name)]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Problem Difficulty Distribution */}
        <div>
          <p className="text-gray-700 font-medium mb-2">Problem Difficulty</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DIFFICULTY_COLORS[index % DIFFICULTY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Problem Difficulty Progress Bars */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-gray-700 font-medium mb-4">Problem Difficulty Breakdown</p>
        
        {Object.entries(stats.difficultyCount).map(([difficulty, count], index) => {
          const total = Object.values(stats.difficultyCount).reduce((sum, curr) => sum + curr, 0);
          const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
          
          return (
            <div key={difficulty} className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">{difficulty} (Easy to Hard)</span>
                <span className="text-gray-600">{count} problems ({percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full" 
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: DIFFICULTY_COLORS[index % DIFFICULTY_COLORS.length]
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubmissionStats;