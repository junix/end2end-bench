import React from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  Bell, 
  Sun, 
  Moon, 
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, formatNumber } from '@/utils';
import { useMetricsStore } from '@/store/useMetricsStore';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { 
    metrics, 
    lastUpdated, 
    loading, 
    moduleStatuses,
    dashboardConfig,
    refreshMetrics,
    updateDashboardConfig
  } = useMetricsStore();

  const toggleTheme = () => {
    const newTheme = dashboardConfig.theme === 'light' ? 'dark' : 'light';
    updateDashboardConfig({ theme: newTheme });
    
    // 应用主题到根元素
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const getSystemHealthStatus = () => {
    if (!moduleStatuses.length) return { status: 'unknown', count: 0 };
    
    const healthyCount = moduleStatuses.filter(m => m.status === 'healthy').length;
    const warningCount = moduleStatuses.filter(m => m.status === 'warning').length;
    const criticalCount = moduleStatuses.filter(m => m.status === 'critical').length;
    
    if (criticalCount > 0) {
      return { status: 'critical', count: criticalCount };
    } else if (warningCount > 0) {
      return { status: 'warning', count: warningCount };
    } else {
      return { status: 'healthy', count: healthyCount };
    }
  };

  const systemHealth = getSystemHealthStatus();
  const overallScore = metrics?.systemHealth.overallScore.value;

  return (
    <header className={cn(
      'sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border',
      className
    )}>
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        {/* 左侧：页面标题和系统状态 */}
        <div className="flex items-center space-x-3 md:space-x-6 min-w-0 flex-1">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg md:text-2xl font-bold text-foreground truncate">
              网格系统测试指标
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
              实时监控与分析仪表盘
            </p>
          </div>
          
          {/* 系统健康度指示器 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted/50 flex-shrink-0"
          >
            {systemHealth.status === 'healthy' && (
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            )}
            {systemHealth.status === 'warning' && (
              <AlertCircle className="w-4 h-4 text-yellow-600" />
            )}
            {systemHealth.status === 'critical' && (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            
            <div className="text-sm">
              <div className="font-medium whitespace-nowrap">
                {systemHealth.status === 'healthy' && '系统正常'}
                {systemHealth.status === 'warning' && '系统警告'}
                {systemHealth.status === 'critical' && '系统异常'}
              </div>
              {overallScore && (
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  综合评分: {formatNumber(overallScore * 100, 1)}%
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* 右侧：操作按钮 */}
        <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
          {/* 最后更新时间 */}
          {lastUpdated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground"
            >
              <Clock className="w-4 h-4" />
              <span className="whitespace-nowrap">
                {lastUpdated.toLocaleTimeString()}
              </span>
            </motion.div>
          )}

          {/* 活动指示器 */}
          <motion.div
            animate={loading ? { rotate: 360 } : { rotate: 0 }}
            transition={loading ? { 
              duration: 1, 
              repeat: Infinity, 
              ease: 'linear' 
            } : {}}
            className="hidden md:flex items-center"
          >
            <Activity className={cn(
              'w-4 h-4',
              loading ? 'text-primary' : 'text-muted-foreground'
            )} />
          </motion.div>

          {/* 刷新按钮 */}
          <Button
            variant="outline"
            size="sm"
            onClick={refreshMetrics}
            disabled={loading}
            className="relative"
          >
            <motion.div
              animate={loading ? { rotate: 360 } : { rotate: 0 }}
              transition={loading ? { 
                duration: 1, 
                repeat: Infinity, 
                ease: 'linear' 
              } : {}}
            >
              <RefreshCw className="w-4 h-4" />
            </motion.div>
            <span className="ml-2 hidden sm:inline">刷新</span>
          </Button>

          {/* 通知按钮 */}
          <Button
            variant="outline"
            size="sm"
            className="relative"
          >
            <Bell className="w-4 h-4" />
            {systemHealth.status !== 'healthy' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={cn(
                  'absolute -top-1 -right-1 w-2 h-2 rounded-full',
                  systemHealth.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                )}
              />
            )}
          </Button>

          {/* 主题切换按钮 */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
          >
            <motion.div
              initial={false}
              animate={{ rotate: dashboardConfig.theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {dashboardConfig.theme === 'light' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </motion.div>
          </Button>
        </div>
      </div>
    </header>
  );
}