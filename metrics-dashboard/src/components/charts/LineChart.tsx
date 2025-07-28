import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart as RechartsAreaChart
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface LineChartData {
  timestamp: string;
  value: number;
  label?: string;
}

interface LineChartProps {
  data: LineChartData[];
  title?: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  showArea?: boolean;
  color?: string;
  yAxisLabel?: string;
}

export function LineChart({
  data,
  title,
  height = 300,
  className,
  showGrid = true,
  showArea = false,
  color = '#3b82f6',
  yAxisLabel
}: LineChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-foreground">
            {data.label || label}
          </p>
          <p className="text-sm text-muted-foreground">
            数值: <span className="font-medium text-foreground">
              {typeof payload[0].value === 'number' 
                ? (payload[0].value * 100).toFixed(1) + '%'
                : payload[0].value
              }
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const ChartComponent = showArea ? RechartsAreaChart : RechartsLineChart;

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
        <ChartComponent
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
            dataKey="timestamp"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'rgb(107 114 128)' }}
            tickFormatter={(value) => {
              // 格式化日期显示
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
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
          
          {showArea ? (
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={color}
              fillOpacity={0.1}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: color }}
            />
          ) : (
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: color }}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </motion.div>
  );
}