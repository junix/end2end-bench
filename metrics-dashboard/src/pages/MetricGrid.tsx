import React from 'react';
import { ColorfulMetricCard } from './ProductivityDashboard/components/ColorfulMetricCard';

const metrics = [
  {
    title: '文本提取准确率',
    value: 86.0,
    unit: '%',
    subtitle: '正确提取文档中文字内容的比例',
    trend: 'neutral' as const,
    icon: 'document' as const,
    color: 'blue' as const,
  },
  {
    title: '表格检测召回率',
    value: 88.0,
    unit: '%',
    subtitle: '成功检测到的表格占实际表格总数的比例',
    trend: 'down' as const,
    icon: 'check' as const,
    color: 'green' as const,
  },
  {
    title: '解析速度',
    value: 7.32,
    unit: 'pages/min',
    subtitle: '每分钟处理的页面数量',
    trend: 'up' as const,
    icon: 'zap' as const,
    color: 'purple' as const,
  },
  {
    title: '内容覆盖率',
    value: 98.0,
    unit: '%',
    subtitle: '解析内容相对于原文档的完整性',
    trend: 'up' as const,
    icon: 'target' as const,
    color: 'orange' as const,
  },
];

export function MetricGrid() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">指标监控面板</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {metrics.map((metric, index) => (
            <ColorfulMetricCard
              key={index}
              {...metric}
            />
          ))}
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ColorfulMetricCard
            title="F1分数"
            value={0.91}
            unit=""
            subtitle="精确率和召回率的调和平均数"
            trend="up"
            color="pink"
          />
          <ColorfulMetricCard
            title="查询延迟"
            value={45}
            unit="ms"
            subtitle="平均查询响应时间"
            trend="down"
            color="cyan"
          />
          <ColorfulMetricCard
            title="系统可用性"
            value={99.9}
            unit="%"
            subtitle="系统正常运行时间比例"
            trend="neutral"
            color="yellow"
          />
        </div>
      </div>
    </div>
  );
}