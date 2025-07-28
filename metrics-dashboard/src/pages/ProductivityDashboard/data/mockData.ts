// Throughput data
export const throughputData = [
  { date: 'Jun 2', team: 5, devio: 8 },
  { date: 'Jun 9', team: 8, devio: 10 },
  { date: 'Jun 16', team: 12, devio: 15 },
  { date: 'Jun 23', team: 15, devio: 18 },
];

export const prTypesData = [
  { week: 'Week 1', features: 20, bugFixes: 15, quality: 10, security: 5 },
  { week: 'Week 2', features: 25, bugFixes: 12, quality: 15, security: 8 },
  { week: 'Week 3', features: 30, bugFixes: 18, quality: 12, security: 10 },
  { week: 'Week 4', features: 28, bugFixes: 20, quality: 18, security: 12 },
];

export const pullRequests = [
  { id: '#13', title: 'Fix auth bug in Login...', author: 'devio', status: 'Bug', type: 'merged' },
  { id: '#12', title: 'Add dark theme support for...', author: 'devio', status: 'Feature', type: 'feature' },
  { id: '#11', title: 'Update README with install...', author: 'devio', status: 'Chore', type: 'chore' },
  { id: '#10', title: 'Update db startup config...', author: 'user1', status: 'Perf', type: 'perf' },
];

// Quality data
export const codeReviewData = [
  { date: 'Jun 2-8', bugs: 8, codeSmell: 6, security: 4, style: 5 },
  { date: 'Jun 9-15', bugs: 10, codeSmell: 8, security: 3, style: 6 },
  { date: 'Jun 16-22', bugs: 14, codeSmell: 10, security: 4, style: 5 },
  { date: 'Jun 23-30', bugs: 6, codeSmell: 7, security: 3, style: 4 },
];

export const backgroundScans = [
  { 
    title: 'Returning sensitive fields in API...', 
    type: 'Security', 
    severity: 'Critical', 
    status: 'Fix' 
  },
  { 
    title: 'Off-by-one error in calc.py', 
    type: 'Bug', 
    severity: 'High', 
    status: 'Fix' 
  },
  { 
    title: 'O(N²) loop will break for large dat...', 
    type: 'Perf', 
    severity: 'Medium', 
    status: 'Fix' 
  },
  { 
    title: 'Low test coverage for auth.py ...', 
    type: 'Test', 
    severity: 'Low', 
    status: 'Fix' 
  },
];

// Speed data
export const cycleTimeData = [
  { phase: 'Coding', time: 17, hours: '1d 7hr', percentage: 42, color: '#3B82F6' },
  { phase: 'Pickup', time: 3, hours: '5hr 3m', percentage: 7, color: '#F97316' },
  { phase: 'Review', time: 9, hours: '2d 9h', percentage: 22, color: '#F59E0B' },
  { phase: 'Deploy', time: 1, hours: '1d 1h', percentage: 3, color: '#10B981' },
];

export const codingTimeData = [
  { x: 1, y: 20 },
  { x: 2, y: 35 },
  { x: 3, y: 25 },
  { x: 4, y: 40 },
  { x: 5, y: 30 },
  { x: 6, y: 45 },
  { x: 7, y: 35 },
];

export const reviewTimeData = [
  { x: 1, y: 30 },
  { x: 2, y: 25 },
  { x: 3, y: 35 },
  { x: 4, y: 30 },
  { x: 5, y: 40 },
  { x: 6, y: 35 },
  { x: 7, y: 45 },
];