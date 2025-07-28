import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, GitPullRequest, CheckCircle2, AlertCircle, XCircle, Clock } from 'lucide-react';

// Throughput data
const throughputData = [
  { date: 'Jun 2', team: 5, devio: 8 },
  { date: 'Jun 9', team: 8, devio: 10 },
  { date: 'Jun 16', team: 12, devio: 15 },
  { date: 'Jun 23', team: 15, devio: 18 },
];

const prTypesData = [
  { week: 'Week 1', features: 20, bugFixes: 15, quality: 10, security: 5 },
  { week: 'Week 2', features: 25, bugFixes: 12, quality: 15, security: 8 },
  { week: 'Week 3', features: 30, bugFixes: 18, quality: 12, security: 10 },
  { week: 'Week 4', features: 28, bugFixes: 20, quality: 18, security: 12 },
];

// Quality data
const codeReviewData = [
  { date: 'Jun 2-8', bugs: 8, codeSmell: 6, security: 4, style: 5 },
  { date: 'Jun 9-15', bugs: 10, codeSmell: 8, security: 3, style: 6 },
  { date: 'Jun 16-22', bugs: 14, codeSmell: 10, security: 4, style: 5 },
  { date: 'Jun 23-30', bugs: 6, codeSmell: 7, security: 3, style: 4 },
];

const cycleTimeData = [
  { phase: 'Coding', time: 17, percentage: 42 },
  { phase: 'Pickup', time: 3, percentage: 7 },
  { phase: 'Review', time: 9, percentage: 22 },
  { phase: 'Deploy', time: 1, percentage: 3 },
];

interface StatusBadgeProps {
  status: 'merged' | 'feature' | 'chore' | 'perf';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    merged: 'bg-green-500/20 text-green-400 border-green-500/30',
    feature: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    chore: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    perf: 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  return (
    <span className={`px-2 py-1 text-xs rounded border ${styles[status]}`}>
      {status}
    </span>
  );
};

interface SeverityBadgeProps {
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const styles = {
    Critical: 'text-red-400',
    High: 'text-orange-400',
    Medium: 'text-yellow-400',
    Low: 'text-blue-400',
  };

  return <span className={`${styles[severity]}`}>{severity}</span>;
};

export function ProductivityDashboard() {
  return (
    <div className="bg-[#0A0A0B] min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-white mb-6">Productivity</h1>
        
        <div className="flex gap-4 mb-6">
        <select className="bg-gray-800 text-gray-200 px-4 py-2 rounded border border-gray-700">
          <option>Last 4 weeks</option>
        </select>
        <select className="bg-gray-800 text-gray-200 px-4 py-2 rounded border border-gray-700">
          <option>All members</option>
        </select>
        <select className="bg-gray-800 text-gray-200 px-4 py-2 rounded border border-gray-700">
          <option>All repositories</option>
        </select>
      </div>

      {/* Throughput Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-200">Throughput</h2>
          <button className="text-sm text-gray-400 hover:text-gray-200">See all ›</button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* PRs Opened */}
          <Card className="bg-[#1A1A1B] border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">PRs Opened</span>
              </div>
              <div className="text-4xl font-bold text-white mb-2">47</div>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +15% MoM
              </div>
              <div className="mt-4">
                <ResponsiveContainer width="100%" height={80}>
                  <AreaChart data={throughputData}>
                    <defs>
                      <linearGradient id="colorTeam" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDevio" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="team" stackId="1" stroke="#06b6d4" fillOpacity={1} fill="url(#colorTeam)" />
                    <Area type="monotone" dataKey="devio" stackId="1" stroke="#22c55e" fillOpacity={1} fill="url(#colorDevio)" />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span className="text-xs text-gray-400">team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-400">devio</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contribution */}
          <Card className="bg-[#1A1A1B] border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Contribution</span>
              </div>
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="#374151" strokeWidth="16" fill="none" />
                  <circle cx="64" cy="64" r="56" stroke="#22c55e" strokeWidth="16" fill="none"
                    strokeDasharray={`${2 * Math.PI * 56 * 0.32} ${2 * Math.PI * 56}`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">32%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PR Types */}
          <Card className="bg-[#1A1A1B] border-gray-800">
            <CardContent className="p-6">
              <div className="mb-4">
                <span className="text-gray-400 text-sm">PR Types</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-400">Feature Rate</div>
                  <div className="text-2xl font-bold text-white">32%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Fix Rate</div>
                  <div className="text-2xl font-bold text-white">21%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Housekeeping Rate</div>
                  <div className="text-2xl font-bold text-white">15%</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={prTypesData}>
                  <defs>
                    <linearGradient id="colorFeatures" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorBugs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorSecurity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="features" stackId="1" stroke="#ef4444" fill="url(#colorFeatures)" />
                  <Area type="monotone" dataKey="bugFixes" stackId="1" stroke="#22c55e" fill="url(#colorBugs)" />
                  <Area type="monotone" dataKey="quality" stackId="1" stroke="#06b6d4" fill="url(#colorQuality)" />
                  <Area type="monotone" dataKey="security" stackId="1" stroke="#a855f7" fill="url(#colorSecurity)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">Features</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">Bug fixes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">Security</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pull Requests */}
          <Card className="bg-[#1A1A1B] border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Pull Requests</span>
                <button className="text-sm text-gray-400 hover:text-gray-200">See all</button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-gray-300 text-sm">#13: Fix auth bug in Login...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">devio</span>
                    <StatusBadge status="merged" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-gray-300 text-sm">#12: Add dark theme support for...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">devio</span>
                    <StatusBadge status="feature" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-gray-300 text-sm">#11: Update README with install...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">devio</span>
                    <StatusBadge status="chore" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-gray-300 text-sm">#10: Update db startup config...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">user1</span>
                    <StatusBadge status="perf" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quality Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-200">Quality</h2>
          <button className="text-sm text-gray-400 hover:text-gray-200">See all ›</button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Code Reviews */}
          <Card className="bg-[#1A1A1B] border-gray-800">
            <CardContent className="p-6">
              <div className="mb-2">
                <span className="text-gray-400 text-sm">Code Reviews</span>
              </div>
              <div className="text-4xl font-bold text-white mb-2">47</div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={codeReviewData}>
                  <Bar dataKey="bugs" fill="#ef4444" />
                  <Bar dataKey="codeSmell" fill="#f59e0b" />
                  <Bar dataKey="security" fill="#a855f7" />
                  <Bar dataKey="style" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">Bugs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">Code Smell</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">Style</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review Depth */}
          <Card className="bg-[#1A1A1B] border-gray-800">
            <CardContent className="p-6 text-center">
              <div className="mb-2">
                <span className="text-gray-400 text-sm">Review Depth</span>
              </div>
              <div className="text-4xl font-bold text-white mb-1">3.1</div>
              <div className="text-sm text-gray-400">comments/PR</div>
            </CardContent>
          </Card>

          {/* Rates */}
          <Card className="bg-[#1A1A1B] border-gray-800">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400 text-sm mb-2">Upvote Rate</div>
                  <div className="relative w-24 h-24 mx-auto">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="#374151" strokeWidth="12" fill="none" />
                      <circle cx="48" cy="48" r="40" stroke="#22c55e" strokeWidth="12" fill="none"
                        strokeDasharray={`${2 * Math.PI * 40 * 0.80} ${2 * Math.PI * 40}`}
                        strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-white">80%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-2">Resolution Rate</div>
                  <div className="relative w-24 h-24 mx-auto">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="#374151" strokeWidth="12" fill="none" />
                      <circle cx="48" cy="48" r="40" stroke="#22c55e" strokeWidth="12" fill="none"
                        strokeDasharray={`${2 * Math.PI * 40 * 0.85} ${2 * Math.PI * 40}`}
                        strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-white">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Background Scans */}
          <Card className="bg-[#1A1A1B] border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Background Scans</span>
                <button className="text-sm text-gray-400 hover:text-gray-200">See all</button>
              </div>
              <div className="text-2xl font-bold text-white mb-2">89% scanned</div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm">Returning sensitive fields in API...</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">Security</span>
                      <SeverityBadge severity="Critical" />
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm">Off-by-one error in calc.py</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">Bug</span>
                      <SeverityBadge severity="High" />
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm">O(N²) loop will break for large dat...</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">Perf</span>
                      <SeverityBadge severity="Medium" />
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm">Low test coverage for auth.py ...</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">Test</span>
                      <SeverityBadge severity="Low" />
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Speed Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-200">Speed</h2>
          <button className="text-sm text-gray-400 hover:text-gray-200">See all ›</button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Cycle Time */}
          <Card className="bg-[#1A1A1B] border-gray-800">
            <CardContent className="p-6">
              <div className="mb-2">
                <span className="text-gray-400 text-sm">Cycle Time</span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-gray-400 text-sm">Avg</span>
                <span className="text-4xl font-bold text-white">4d 17h</span>
              </div>
              <div className="space-y-2">
                {cycleTimeData.map((phase) => (
                  <div key={phase.phase} className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{phase.phase}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${phase.phase === 'Coding' ? 'bg-blue-500' : phase.phase === 'Pickup' ? 'bg-orange-500' : phase.phase === 'Review' ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${phase.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-300 w-8 text-right">{phase.time}h</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contribution Time */}
          <Card className="bg-[#1A1A1B] border-gray-800">
            <CardContent className="p-6">
              <div className="mb-2">
                <span className="text-gray-400 text-sm">Contribution</span>
              </div>
              <div className="flex items-center gap-2 text-green-400 mb-4">
                <TrendingUp className="w-4 h-4" />
                <span className="text-2xl font-bold">1d 5h</span>
              </div>
            </CardContent>
          </Card>

          {/* Coding Time */}
          <Card className="bg-[#1A1A1B] border-gray-800">
            <CardContent className="p-6">
              <div className="mb-2">
                <span className="text-gray-400 text-sm">Coding Time</span>
              </div>
              <div className="text-2xl font-bold text-white mb-4">1d 7hr</div>
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={[
                  { x: 1, y: 20 },
                  { x: 2, y: 35 },
                  { x: 3, y: 25 },
                  { x: 4, y: 40 },
                  { x: 5, y: 30 },
                  { x: 6, y: 45 },
                  { x: 7, y: 35 },
                ]}>
                  <defs>
                    <linearGradient id="colorCoding" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="y" stroke="#22c55e" fillOpacity={1} fill="url(#colorCoding)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Review Time */}
          <Card className="bg-[#1A1A1B] border-gray-800">
            <CardContent className="p-6">
              <div className="mb-2">
                <span className="text-gray-400 text-sm">Review Time</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-white">2d 5h</span>
                <TrendingUp className="w-4 h-4 text-yellow-400" />
              </div>
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={[
                  { x: 1, y: 30 },
                  { x: 2, y: 25 },
                  { x: 3, y: 35 },
                  { x: 4, y: 30 },
                  { x: 5, y: 40 },
                  { x: 6, y: 35 },
                  { x: 7, y: 45 },
                ]}>
                  <defs>
                    <linearGradient id="colorReview" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="y" stroke="#22c55e" fillOpacity={1} fill="url(#colorReview)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
}