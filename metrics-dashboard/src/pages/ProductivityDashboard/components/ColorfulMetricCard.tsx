import React from 'react';
import { cn } from '@/utils';
import { TrendingUp, TrendingDown, Minus, FileCheck, Zap, Target, CheckCircle } from 'lucide-react';

interface ColorfulMetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: 'document' | 'check' | 'zap' | 'target';
  color: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'yellow' | 'cyan' | 'red';
}

const colorStyles = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  pink: 'bg-pink-500',
  yellow: 'bg-yellow-500',
  cyan: 'bg-cyan-500',
  red: 'bg-red-500',
};

const iconMap = {
  document: FileCheck,
  check: CheckCircle,
  zap: Zap,
  target: Target,
};

export const ColorfulMetricCard: React.FC<ColorfulMetricCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  trend,
  icon,
  color,
}) => {
  const Icon = icon ? iconMap[icon] : null;
  
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-white/80" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-white/80" />;
      default:
        return <Minus className="w-4 h-4 text-white/80" />;
    }
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg p-6 text-white",
        colorStyles[color],
        "transform transition-transform hover:scale-105"
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20" />
        <div className="absolute -left-8 -bottom-8 h-40 w-40 rounded-full bg-white/10" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5 text-white/80" />}
            {trend && getTrendIcon()}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-3 text-white/90">
          {title}
        </h3>
        
        <div className="text-3xl font-bold mb-1">
          {value}{unit && <span className="text-xl ml-1">{unit}</span>}
        </div>
        
        {subtitle && (
          <p className="text-sm text-white/70 mt-2">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};