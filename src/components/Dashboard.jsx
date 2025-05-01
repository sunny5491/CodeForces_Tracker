import React from 'react';
import UserProfile from './UserProfile';
import ContestPerformance from './ContestPerformance';
import SubmissionStats from './SubmissionStats';
import LanguageStats from './LanguageStats';
import RecentSubmissions from './RecentSubmissions';
import ProductivityAnalytics from './ProductivityAnalytics';

const Dashboard = ({ userInfo, userRating, userSubmissions }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* User Profile - Top Section */}
      <div className="lg:col-span-12">
        <UserProfile userInfo={userInfo[0]} />
      </div>
      
      {/* Contest Performance */}
      <div className="lg:col-span-6">
        <ContestPerformance userRating={userRating} />
      </div>
      
      {/* Submission Statistics */}
      <div className="lg:col-span-6">
        <SubmissionStats userSubmissions={userSubmissions} />
      </div>

      {/* Language Statistics */}
      <div className="lg:col-span-4">
        <LanguageStats userSubmissions={userSubmissions} />
      </div>
      
      {/* Recent Submissions */}
      <div className="lg:col-span-8">
        <RecentSubmissions userSubmissions={userSubmissions} />
      </div>
      
      {/* Productivity Analytics */}
      <div className="lg:col-span-12">
        <ProductivityAnalytics userSubmissions={userSubmissions} />
      </div>
    </div>
  );
};

export default Dashboard;