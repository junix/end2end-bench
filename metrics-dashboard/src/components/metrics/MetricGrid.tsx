import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { MetricSquareCard } from './MetricSquareCard';

export interface MetricData {
  id: string;
  title: string;
  value: number;
  unit: string;
  description: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'good' | 'warning' | 'critical';
  icon?: React.ReactNode;
}

interface MetricGridProps {
  metrics: MetricData[];
  className?: string;
}

function getGridDimensions(count: number): { cols: number; rows: number } {
  if (count <= 1) return { cols: 1, rows: 1 };
  if (count <= 4) return { cols: 2, rows: Math.ceil(count / 2) };
  if (count <= 6) return { cols: 3, rows: 2 };
  if (count <= 9) return { cols: 3, rows: 3 };
  if (count <= 12) return { cols: 4, rows: 3 };
  if (count <= 16) return { cols: 4, rows: 4 };
  if (count <= 20) return { cols: 5, rows: 4 };
  return { cols: 5, rows: Math.ceil(count / 5) };
}

export function MetricGrid({ metrics, className }: MetricGridProps) {
  const { cols } = getGridDimensions(metrics.length);
  
  // Calculate grid template columns based on number of columns
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  }[cols] || 'grid-cols-5';

  // Container max width based on columns to maintain square aspect
  const maxWidth = {
    1: 'max-w-[200px]',
    2: 'max-w-[400px]',
    3: 'max-w-[600px]',
    4: 'max-w-[800px]',
    5: 'max-w-[1000px]',
  }[cols] || 'max-w-[1000px]';

  return (
    <div className={cn('w-full flex justify-center px-4 sm:px-6 md:px-8', className)}>
      <div className={cn('w-full', maxWidth)}>
        <motion.div 
          className={cn(
            'grid gap-3',
            gridCols
          )}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.05, 
                duration: 0.3,
                ease: 'easeOut'
              }}
            >
              <MetricSquareCard {...metric} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}