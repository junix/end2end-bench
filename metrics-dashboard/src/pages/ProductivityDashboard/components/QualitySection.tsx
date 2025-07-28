import React from 'react';
import { MinimalCard } from './MinimalCard';
import { BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle2 } from 'lucide-react';
import { codeReviewData, backgroundScans } from '../data/mockData';

const SeverityBadge: React.FC<{ severity: string }> = ({ severity }) => {
  const styles: Record<string, string> = {
    Critical: 'text-red-400',
    High: 'text-orange-400',
    Medium: 'text-yellow-400',
    Low: 'text-blue-400',
  };

  return <span className={`text-xs ${styles[severity] || 'text-gray-400'}`}>{severity}</span>;
};

export const QualitySection: React.FC = () => {
  const upvoteData = [
    { name: 'upvote', value: 80 },
    { name: 'remaining', value: 20 }
  ];

  const resolutionData = [
    { name: 'resolution', value: 85 },
    { name: 'remaining', value: 15 }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-200">Quality</h2>
        <button className="text-xs text-gray-500 hover:text-gray-300">See all ›</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Code Reviews */}
        <MinimalCard>
          <div className="mb-2">
            <span className="text-xs text-gray-500">Code Reviews</span>
          </div>
          <div className="text-3xl font-bold text-white mb-3">47</div>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={codeReviewData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Bar dataKey="bugs" fill="#ef4444" />
                <Bar dataKey="codeSmell" fill="#f59e0b" />
                <Bar dataKey="security" fill="#a855f7" />
                <Bar dataKey="style" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Bugs</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Code Smell</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Security</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Style</span>
            </div>
          </div>
        </MinimalCard>

        {/* Review Depth */}
        <MinimalCard className="flex flex-col items-center justify-center text-center">
          <div className="mb-2">
            <span className="text-xs text-gray-500">Review Depth</span>
          </div>
          <div className="text-3xl font-bold text-white">3.1</div>
          <div className="text-xs text-gray-500">comments/PR</div>
        </MinimalCard>

        {/* Rates */}
        <MinimalCard>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-2 text-center">Upvote Rate</div>
              <div className="relative mx-auto w-20 h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={upvoteData}
                      cx="50%"
                      cy="50%"
                      innerRadius={24}
                      outerRadius={32}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      <Cell fill="#22c55e" />
                      <Cell fill="#374151" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">80%</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-2 text-center">Resolution Rate</div>
              <div className="relative mx-auto w-20 h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resolutionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={24}
                      outerRadius={32}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      <Cell fill="#22c55e" />
                      <Cell fill="#374151" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">85%</span>
                </div>
              </div>
            </div>
          </div>
        </MinimalCard>

        {/* Background Scans */}
        <MinimalCard>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">Background Scans</span>
            <button className="text-xs text-gray-500 hover:text-gray-300">See all</button>
          </div>
          <div className="text-lg font-bold text-white mb-2">89% scanned</div>
          <div className="space-y-2">
            {backgroundScans.map((scan, index) => (
              <div key={index} className="flex items-start justify-between gap-2">
                <span className="text-xs text-gray-300 flex-1 truncate">
                  {scan.title}
                </span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-500">{scan.type}</span>
                  <SeverityBadge severity={scan.severity} />
                  <CheckCircle2 className="w-3 h-3 text-blue-400" />
                </div>
              </div>
            ))}
          </div>
        </MinimalCard>
      </div>
    </div>
  );
};