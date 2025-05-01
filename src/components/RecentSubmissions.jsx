import React from 'react';
import { format } from 'date-fns';
import { getVerdictBadgeColor } from '../utils/verdictUtils';

const RecentSubmissions = ({ userSubmissions }) => {
  // Get 10 most recent submissions
  const recentSubmissions = [...userSubmissions]
    .sort((a, b) => b.creationTimeSeconds - a.creationTimeSeconds)
    .slice(0, 10);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Recent Submissions</h2>
      </div>
      
      {recentSubmissions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Problem
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verdict
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Language
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentSubmissions.map((submission, index) => {
                const submissionColor = getVerdictBadgeColor(submission.verdict);
                
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a 
                        href={`https://codeforces.com/contest/${submission.problem.contestId}/problem/${submission.problem.index}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        {submission.problem.index}. {submission.problem.name}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        style={{
                          backgroundColor: submissionColor.bg,
                          color: submissionColor.text
                        }}
                      >
                        {submission.verdict === 'OK' ? 'Accepted' : submission.verdict.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.programmingLanguage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(submission.creationTimeSeconds * 1000), 'MMM d, yyyy HH:mm')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No submission data available
        </div>
      )}
    </div>
  );
};

export default RecentSubmissions;