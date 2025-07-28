import React from 'react';
import { MinimalCard } from './MinimalCard';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cycleTimeData, codingTimeData, reviewTimeData } from '../data/mockData';

export const SpeedSection: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-200">Speed</h2>
        <button className="text-xs text-gray-500 hover:text-gray-300">See all ›</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Cycle Time */}
        <MinimalCard>
          <div className="mb-2">
            <span className="text-xs text-gray-500">Cycle Time</span>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs text-gray-500">Avg</span>
            <span className="text-3xl font-bold text-white">4d 17h</span>
          </div>
          <div className="space-y-2">
            {cycleTimeData.map((phase) => (
              <div key={phase.phase} className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{phase.phase}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${phase.percentage}%`,
                        backgroundColor: phase.color 
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-300 w-12 text-right">{phase.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </MinimalCard>

        {/* Contribution Time */}
        <MinimalCard className="flex flex-col justify-between">
          <div>
            <div className="mb-2">
              <span className="text-xs text-gray-500">Contribution</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">1d 5h</span>
              <TrendingDown className="w-4 h-4 text-green-400" />
            </div>
          </div>
        </MinimalCard>

        {/* Coding Time */}
        <MinimalCard>
          <div className="mb-2">
            <span className="text-xs text-gray-500">Coding Time</span>
          </div>
          <div className="text-2xl font-bold text-white mb-3">1d 7hr</div>
          <div className="h-12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={codingTimeData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCoding" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="y" stroke="transparent" fill="url(#colorCoding)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </MinimalCard>

        {/* Review Time */}
        <MinimalCard>
          <div className="mb-2">
            <span className="text-xs text-gray-500">Review Time</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-white">2d 5h</span>
            <TrendingUp className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="h-12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reviewTimeData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReview" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="y" stroke="transparent" fill="url(#colorReview)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </MinimalCard>
      </div>
    </div>
  );
};