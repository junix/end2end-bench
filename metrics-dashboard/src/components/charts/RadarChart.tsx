import React from 'react';
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface RadarChartData {
  subject: string;
  value: number;
  fullMark: number;
}

interface RadarChartProps {
  data: RadarChartData[];
  title?: string;
  height?: number;
  className?: string;
  color?: string;
}

export function RadarChart({
  data,
  title,
  height = 300,
  className,
  color = '#3b82f6'
}: RadarChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            数值: <span className="font-medium text-foreground">
              {(data.value * 100).toFixed(1)}%
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            满分: <span className="font-medium text-foreground">
              {(data.fullMark * 100).toFixed(0)}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn('w-full', className)}
    >
      {title && (
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          {title}
        </h3>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadarChart data={data}>
          <PolarGrid 
            stroke="rgb(229 231 235)" 
            opacity={0.5}
          />
          <PolarAngleAxis 
            dataKey="subject"
            tick={{ fontSize: 12, fill: 'rgb(107 114 128)' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 1]}
            tick={{ fontSize: 10, fill: 'rgb(107 114 128)' }}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
          />
          <Radar
            name="Performance"
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.1}
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 1, r: 4 }}
          />
          <Tooltip content={<CustomTooltip />} />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}