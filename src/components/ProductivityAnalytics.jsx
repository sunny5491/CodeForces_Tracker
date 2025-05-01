import React, { useMemo } from 'react';
import { format, isSameDay, addDays, differenceInDays, parseISO } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const ProductivityAnalytics = ({ userSubmissions }) => {
  const stats = useMemo(() => {
    if (userSubmissions.length === 0) {
      return {
        maxStreak: 0,
        currentStreak: 0,
        mostActiveHour: null,
        hourlyActivity: [],
        activityHeatmap: []
      };
    }
    
    // Sort submissions by time
    const sortedSubmissions = [...userSubmissions].sort(
      (a, b) => a.creationTimeSeconds - b.creationTimeSeconds
    );
    
    // Calculate hourly activity
    const hourCounts = {};
    userSubmissions.forEach(sub => {
      const date = new Date(sub.creationTimeSeconds * 1000);
      const hour = date.getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    
    // Format for chart
    const hourlyActivity = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      submissions: hourCounts[i] || 0,
      label: `${i}:00`
    }));
    
    // Find most active hour
    const mostActiveHour = hourlyActivity.reduce(
      (max, curr) => curr.submissions > max.submissions ? curr : max, 
      { hour: 0, submissions: 0, label: '0:00' }
    );
    
    // Calculate streaks
    const submissionDays = new Set(
      userSubmissions.map(sub => 
        format(new Date(sub.creationTimeSeconds * 1000), 'yyyy-MM-dd')
      )
    );
    
    let maxStreak = 0;
    let currentStreak = 0;
    
    // Calculate max streak
    const sortedDays = Array.from(submissionDays)
      .map(day => parseISO(day))
      .sort((a, b) => a.getTime() - b.getTime());
    
    if (sortedDays.length > 0) {
      let currentStreakCount = 1;
      let maxStreakCount = 1;
      
      for (let i = 1; i < sortedDays.length; i++) {
        const diff = differenceInDays(sortedDays[i], sortedDays[i-1]);
        
        if (diff === 1) {
          currentStreakCount++;
          maxStreakCount = Math.max(maxStreakCount, currentStreakCount);
        } else if (diff > 1) {
          currentStreakCount = 1;
        }
      }
      
      maxStreak = maxStreakCount;
      
      // Calculate current streak
      const today = new Date();
      const latestSubmissionDay = sortedDays[sortedDays.length - 1];
      
      if (isSameDay(latestSubmissionDay, today) || differenceInDays(today, latestSubmissionDay) === 1) {
        currentStreak = 1;
        let i = sortedDays.length - 2;
        let previousDay = addDays(latestSubmissionDay, -1);
        
        while (i >= 0) {
          if (isSameDay(sortedDays[i], previousDay)) {
            currentStreak++;
            previousDay = addDays(previousDay, -1);
            i--;
          } else {
            break;
          }
        }
      }
    }
    
    return {
      maxStreak,
      currentStreak,
      mostActiveHour,
      hourlyActivity
    };
  }, [userSubmissions]);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Productivity Analytics</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border-b border-gray-200">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-500 text-sm">Max Day Streak</p>
          <p className="text-2xl font-bold text-gray-800">{stats.maxStreak}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-500 text-sm">Current Streak</p>
          <p className="text-2xl font-bold text-gray-800">{stats.currentStreak}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg col-span-2">
          <p className="text-gray-500 text-sm">Most Active Time</p>
          <p className="text-2xl font-bold text-gray-800">
            {stats.mostActiveHour ? 
              `${stats.mostActiveHour.hour}:00 (${stats.mostActiveHour.submissions} submissions)` : 
              'No data'}
          </p>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-700 font-medium mb-4">Hourly Activity Distribution</p>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stats.hourlyActivity}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="label" 
                tick={{ fontSize: 12 }}
                ticks={Array.from({ length: 8 }, (_, i) => i * 3).map(hour => `${hour}:00`)}
              />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value} submissions`, 'Activity']}
                labelFormatter={(label) => `Hour: ${label}`}
              />
              <Bar 
                dataKey="submissions" 
                name="Submissions" 
                fill="#6366f1" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <p className="text-gray-500 text-sm mt-2 text-center">
          This chart shows your coding activity pattern throughout the day
        </p>
      </div>
    </div>
  );
};

export default ProductivityAnalytics;