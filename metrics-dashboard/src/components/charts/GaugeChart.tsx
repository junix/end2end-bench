import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface GaugeChartProps {
  value: number; // 0-1 之间的值
  title: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function GaugeChart({
  value,
  title,
  subtitle,
  size = 'md',
  color = '#3b82f6',
  className
}: GaugeChartProps) {
  const normalizedValue = Math.max(0, Math.min(1, value));
  const percentage = normalizedValue * 100;
  
  // 仪表盘的角度范围是 180 度（半圆）
  const angle = normalizedValue * 180;
  
  const sizes = {
    sm: { width: 120, height: 60, strokeWidth: 8, fontSize: 'text-sm' },
    md: { width: 160, height: 80, strokeWidth: 10, fontSize: 'text-base' },
    lg: { width: 200, height: 100, strokeWidth: 12, fontSize: 'text-lg' }
  };
  
  const currentSize = sizes[size];
  const radius = currentSize.width / 2 - currentSize.strokeWidth;
  const centerX = currentSize.width / 2;
  const centerY = currentSize.height;
  
  // 创建半圆弧路径
  const createArcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };
  
  function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
  
  const backgroundPath = createArcPath(0, 180);
  const foregroundPath = createArcPath(0, angle);
  
  // 指针位置
  const needleAngle = angle - 90; // 调整起始角度
  const needleLength = radius * 0.8;
  const needleX = centerX + needleLength * Math.cos(needleAngle * Math.PI / 180);
  const needleY = centerY + needleLength * Math.sin(needleAngle * Math.PI / 180);
  
  return (
    <div className={cn('flex flex-col items-center space-y-2', className)}>
      <div className="relative">
        <svg 
          width={currentSize.width} 
          height={currentSize.height + 20}
          className="overflow-visible"
        >
          {/* 背景弧 */}
          <path
            d={backgroundPath}
            fill="none"
            stroke="rgb(229 231 235)" // gray-200
            strokeWidth={currentSize.strokeWidth}
            strokeLinecap="round"
          />
          
          {/* 进度弧 */}
          <motion.path
            d={foregroundPath}
            fill="none"
            stroke={color}
            strokeWidth={currentSize.strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* 指针 */}
          <motion.line
            x1={centerX}
            y1={centerY}
            x2={needleX}
            y2={needleY}
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          
          {/* 中心点 */}
          <circle
            cx={centerX}
            cy={centerY}
            r={4}
            fill={color}
          />
          
          {/* 数值显示 */}
          <motion.text
            x={centerX}
            y={centerY - 15}
            textAnchor="middle"
            className={cn(
              'font-bold fill-current text-foreground',
              currentSize.fontSize
            )}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {percentage.toFixed(1)}%
          </motion.text>
        </svg>
      </div>
      
      <div className="text-center">
        <div className={cn(
          'font-semibold text-foreground',
          size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
        )}>
          {title}
        </div>
        {subtitle && (
          <div className={cn(
            'text-muted-foreground',
            size === 'sm' ? 'text-xs' : 'text-sm'
          )}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}