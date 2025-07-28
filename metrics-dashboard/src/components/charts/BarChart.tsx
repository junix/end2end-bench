import React from 'react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface BarChartData {
  name: string;
  value: number;
  status?: 'good' | 'warning' | 'critical';
}

interface BarChartProps {
  data: BarChartData[];
  title?: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  yAxisLabel?: string;
}

export function BarChart({
  data,
  title,
  height = 300,
  className,
  showGrid = true,
  yAxisLabel
}: BarChartProps) {
  const getBarColor = (status?: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good':
        return '#10b981'; // green-500
      case 'warning':
        return '#f59e0b'; // amber-500
      case 'critical':
        return '#ef4444'; // red-500
      default:
        return '#3b82f6'; // blue-500
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            数值: <span className="font-medium text-foreground">
              {typeof payload[0].value === 'number' 
                ? (payload[0].value * 100).toFixed(1) + '%'
                : payload[0].value
              }
            </span>
          </p>
          {data.status && (
            <p className="text-sm">
              状态: <span className={cn(
                'font-medium',
                data.status === 'good' ? 'text-green-600' :
                data.status === 'warning' ? 'text-yellow-600' :
                'text-red-600'
              )}>
                {data.status === 'good' ? '正常' :
                 data.status === 'warning' ? '警告' : '异常'}
              </span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('w-full', className)}
    >
      {title && (
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {title}
        </h3>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgb(229 231 235)" 
              opacity={0.5}
            />
          )}
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'rgb(107 114 128)' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'rgb(107 114 128)' }}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            label={yAxisLabel ? { 
              value: yAxisLabel, 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: 'rgb(107 114 128)' }
            } : undefined}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="value"
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getBarColor(entry.status)} 
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}