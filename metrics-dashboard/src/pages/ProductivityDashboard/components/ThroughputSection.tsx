import React from 'react';
import { MinimalCard } from './MinimalCard';
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { throughputData, prTypesData, pullRequests } from '../data/mockData';

const StatusBadge: React.FC<{ status: string; type: string }> = ({ status, type }) => {
  const styles: Record<string, string> = {
    merged: 'bg-green-500/20 text-green-400',
    feature: 'bg-purple-500/20 text-purple-400',
    chore: 'bg-blue-500/20 text-blue-400',
    perf: 'bg-green-500/20 text-green-400',
  };

  return (
    <span className={`px-2 py-0.5 text-xs rounded ${styles[type] || 'bg-gray-500/20 text-gray-400'}`}>
      {status}
    </span>
  );
};

export const ThroughputSection: React.FC = () => {
  const contributionData = [
    { name: 'contribution', value: 32 },
    { name: 'remaining', value: 68 }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-200">Throughput</h2>
        <button className="text-xs text-gray-500 hover:text-gray-300">See all ›</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* PRs Opened */}
        <MinimalCard>
          <div className="mb-2">
            <span className="text-xs text-gray-500">PRs Opened</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">47</div>
          <div className="flex items-center text-green-400 text-xs mb-3">
            <TrendingUp className="w-3 h-3 mr-1" />
            +15% MoM
          </div>
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={throughputData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTeam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDevio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="team" stackId="1" stroke="transparent" fill="url(#colorTeam)" />
                <Area type="monotone" dataKey="devio" stackId="1" stroke="transparent" fill="url(#colorDevio)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="text-xs text-gray-500">team</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500">devio</span>
            </div>
          </div>
        </MinimalCard>

        {/* Contribution */}
        <MinimalCard>
          <div className="mb-2">
            <span className="text-xs text-gray-500">Contribution</span>
          </div>
          <div className="relative mx-auto w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={40}
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
              <span className="text-xl font-bold text-white">32%</span>
            </div>
          </div>
        </MinimalCard>

        {/* PR Types */}
        <MinimalCard>
          <div className="mb-3">
            <span className="text-xs text-gray-500">PR Types</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div>
              <div className="text-xs text-gray-500">Feature Rate</div>
              <div className="text-xl font-bold text-white">32%</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Fix Rate</div>
              <div className="text-xl font-bold text-white">21%</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Housekeeping</div>
              <div className="text-xl font-bold text-white">15%</div>
            </div>
          </div>
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={prTypesData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFeatures" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBugs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSecurity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="features" stackId="1" stroke="transparent" fill="url(#colorFeatures)" />
                <Area type="monotone" dataKey="bugFixes" stackId="1" stroke="transparent" fill="url(#colorBugs)" />
                <Area type="monotone" dataKey="quality" stackId="1" stroke="transparent" fill="url(#colorQuality)" />
                <Area type="monotone" dataKey="security" stackId="1" stroke="transparent" fill="url(#colorSecurity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Features</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Bug fixes</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Quality</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Security</span>
            </div>
          </div>
        </MinimalCard>

        {/* Pull Requests */}
        <MinimalCard>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">Pull Requests</span>
            <button className="text-xs text-gray-500 hover:text-gray-300">See all</button>
          </div>
          <div className="space-y-2">
            {pullRequests.map((pr) => (
              <div key={pr.id} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-gray-300 truncate block">
                    {pr.id}: {pr.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-xs text-gray-500">{pr.author}</span>
                  <StatusBadge status={pr.status} type={pr.type} />
                </div>
              </div>
            ))}
          </div>
        </MinimalCard>
      </div>
    </div>
  );
};