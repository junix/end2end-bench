import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn, formatNumber, formatPercentage, formatLatency } from '@/utils';

interface MetricSquareCardProps {
  title: string;
  value: number;
  unit: string;
  description: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'good' | 'warning' | 'critical';
  icon?: React.ReactNode;
}

export function MetricSquareCard({
  title,
  value,
  unit,
  description,
  trend,
  status,
  icon
}: MetricSquareCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'border-green-500 bg-green-50/50';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50/50';
      case 'critical':
        return 'border-red-500 bg-red-50/50';
      default:
        return 'border-gray-300 bg-gray-50/50';
    }
  };

  const formatValue = () => {
    if (unit === '%') {
      return formatPercentage(value);
    } else if (unit === 'ms' || unit === 's') {
      return formatLatency(value);
    } else {
      return formatNumber(value);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="w-full"
    >
      <Card className={cn(
        'relative overflow-hidden transition-all duration-200 hover:shadow-lg border-2',
        'aspect-square flex flex-col',
        getStatusColor()
      )}>
        <CardContent className="p-3 flex flex-col h-full">
          {/* Header with status and trend */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-1">
              {icon && (
                <div className="text-muted-foreground opacity-70 scale-75">
                  {icon}
                </div>
              )}
              <div className="scale-75">
                {getStatusIcon()}
              </div>
            </div>
            <div className="flex items-center scale-75">
              {getTrendIcon()}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xs font-semibold text-foreground mb-1 line-clamp-2">
            {title}
          </h3>

          {/* Value - centered and prominent */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {formatValue()}
              </div>
              {!['%', 'ms', 's'].includes(unit) && (
                <div className="text-xs text-muted-foreground mt-0.5">
                  {unit}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-2">
            <p className="text-[10px] text-muted-foreground line-clamp-2 text-center">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}