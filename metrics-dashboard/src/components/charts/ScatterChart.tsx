import React from 'react';
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface ScatterChartData {
  x: number;
  y: number;
  z?: number;
  name?: string;
  category?: string;
}

interface ScatterChartProps {
  data: ScatterChartData[];
  title?: string;
  height?: number;
  className?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  color?: string;
}

export function ScatterChart({
  data,
  title,
  height = 300,
  className,
  xAxisLabel,
  yAxisLabel,
  showGrid = true,
  color = '#3b82f6'
}: ScatterChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          {data.name && (
            <p className="font-medium text-foreground mb-1">{data.name}</p>
          )}
          <p className="text-sm text-muted-foreground">
            {xAxisLabel || 'X'}: <span className="font-medium text-foreground">
              {data.x.toFixed(1)}
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            {yAxisLabel || 'Y'}: <span className="font-medium text-foreground">
              {data.y.toFixed(1)}
            </span>
          </p>
          {data.z !== undefined && (
            <p className="text-sm text-muted-foreground">
              大小: <span className="font-medium text-foreground">
                {data.z.toFixed(1)}
              </span>
            </p>
          )}
          {data.category && (
            <p className="text-sm text-muted-foreground">
              类别: <span className="font-medium text-foreground">
                {data.category}
              </span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const getPointColor = (category?: string) => {
    switch (category) {
      case 'low':
        return '#10b981'; // green-500
      case 'medium':
        return '#f59e0b'; // amber-500
      case 'high':
        return '#ef4444'; // red-500
      default:
        return color;
    }
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
        <RechartsScatterChart
          margin={{
            top: 20,
            right: 30,
            bottom: 20,
            left: 20,
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
            type="number"
            dataKey="x"
            name={xAxisLabel || 'X'}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'rgb(107 114 128)' }}
            label={xAxisLabel ? { 
              value: xAxisLabel, 
              position: 'insideBottom', 
              offset: -10,
              style: { textAnchor: 'middle', fill: 'rgb(107 114 128)' }
            } : undefined}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yAxisLabel || 'Y'}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'rgb(107 114 128)' }}
            label={yAxisLabel ? { 
              value: yAxisLabel, 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: 'rgb(107 114 128)' }
            } : undefined}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter data={data} fill={color}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getPointColor(entry.category)} 
              />
            ))}
          </Scatter>
        </RechartsScatterChart>
      </ResponsiveContainer>
    </motion.div>
  );
}