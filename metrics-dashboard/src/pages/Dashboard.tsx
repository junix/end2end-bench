import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Activity,
  Clock,
  Users,
  Server
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PageContainer } from '@/components/layout/Layout';
import { MetricGrid, type MetricData } from '@/components/metrics/MetricGrid';
import { useMetricsStore } from '@/store/useMetricsStore';
import { cn, formatNumber, formatPercentage, formatLatency } from '@/utils';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'good' | 'warning' | 'critical';
  description?: string;
  icon?: React.ReactNode;
}

function MetricCard({ 
  title, 
  value, 
  unit, 
  trend, 
  status, 
  description, 
  icon 
}: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'border-l-green-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'critical':
        return 'border-l-red-500';
      default:
        return 'border-l-blue-500';
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
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className={cn(
        'transition-all duration-200 hover:shadow-md border-l-4',
        getStatusColor()
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground truncate flex-1">
            {title}
          </CardTitle>
          <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
            {icon && <div className="text-muted-foreground">{icon}</div>}
            {getTrendIcon()}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold text-foreground mb-1">
            {formatValue()}
            {unit !== '%' && unit !== 'ms' && unit !== 's' && (
              <span className="text-sm text-muted-foreground ml-1">
                {unit}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ModuleStatusCardProps {
  title: string;
  score: number;
  status: 'healthy' | 'warning' | 'critical';
  metrics: Array<{ name: string; value: number; unit: string }>;
}

function ModuleStatusCard({ title, score, status, metrics }: ModuleStatusCardProps) {
  const getStatusInfo = () => {
    switch (status) {
      case 'healthy':
        return { 
          color: 'text-green-600', 
          bg: 'bg-green-100', 
          border: 'border-l-green-500',
          label: '正常' 
        };
      case 'warning':
        return { 
          color: 'text-yellow-600', 
          bg: 'bg-yellow-100', 
          border: 'border-l-yellow-500',
          label: '警告' 
        };
      case 'critical':
        return { 
          color: 'text-red-600', 
          bg: 'bg-red-100', 
          border: 'border-l-red-500',
          label: '异常' 
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className={cn(
        'transition-all duration-200 hover:shadow-md border-l-4',
        statusInfo.border
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-lg font-semibold truncate flex-1">
              {title}
            </CardTitle>
            <div className={cn(
              'px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2',
              statusInfo.bg,
              statusInfo.color
            )}>
              {statusInfo.label}
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground">
            {formatPercentage(score)}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground truncate flex-1 pr-2">
                  {metric.name}
                </span>
                <span className="font-medium text-foreground flex-shrink-0">
                  {metric.unit === '%' 
                    ? formatPercentage(metric.value) 
                    : `${formatNumber(metric.value)}${metric.unit}`
                  }
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Dashboard() {
  const { metrics, moduleStatuses } = useMetricsStore();

  if (!metrics) {
    return (
      <PageContainer title="总览仪表盘" description="系统整体指标概览">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">加载中...</div>
        </div>
      </PageContainer>
    );
  }

  const keyMetrics: MetricData[] = [
    {
      id: 'overall-score',
      title: '系统整体评分',
      value: metrics.systemHealth.overallScore.value,
      unit: '%',
      trend: metrics.systemHealth.overallScore.trend,
      status: metrics.systemHealth.overallScore.status,
      description: '综合所有模块的健康度评分',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'uptime',
      title: '系统可用时间',
      value: metrics.systemHealth.uptime.value,
      unit: '%',
      trend: metrics.systemHealth.uptime.trend,
      status: metrics.systemHealth.uptime.status,
      description: '系统正常运行时间比例',
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 'user-satisfaction',
      title: '用户满意度',
      value: metrics.systemHealth.userSatisfaction.value,
      unit: '%',
      trend: metrics.systemHealth.userSatisfaction.trend,
      status: metrics.systemHealth.userSatisfaction.status,
      description: '用户对系统的满意度评分',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'error-rate',
      title: '错误率',
      value: metrics.systemHealth.errorRate.value,
      unit: '%',
      trend: metrics.systemHealth.errorRate.trend,
      status: metrics.systemHealth.errorRate.status,
      description: '系统处理请求的错误比例',
      icon: <Server className="w-5 h-5" />
    }
  ];

  const moduleMetrics = [
    {
      title: '文档解析模块',
      score: 0.89,
      status: 'healthy' as const,
      metrics: [
        { name: '文本提取准确率', value: metrics.documentParsing.textExtractionAccuracy.value, unit: '%' },
        { name: '表格检测召回率', value: metrics.documentParsing.tableDetectionRecall.value, unit: '%' },
        { name: '解析速度', value: metrics.documentParsing.parsingSpeed.value, unit: 'pages/min' }
      ]
    },
    {
      title: '数据解锁模块',
      score: 0.85,
      status: 'healthy' as const,
      metrics: [
        { name: 'F1分数', value: metrics.dataUnlocking.f1Score.value, unit: '' },
        { name: '查询延迟', value: metrics.dataUnlocking.queryLatency.value, unit: 'ms' },
        { name: '查询吞吐量', value: metrics.dataUnlocking.queryThroughput.value, unit: 'QPS' }
      ]
    },
    {
      title: '问答功能模块',
      score: 0.87,
      status: 'warning' as const,
      metrics: [
        { name: '问答准确率', value: metrics.qa.qaAccuracy.value, unit: '%' },
        { name: '响应时间', value: metrics.qa.responseTime.value, unit: 's' },
        { name: '知识库命中率', value: metrics.qa.knowledgeBaseHitRate.value, unit: '%' }
      ]
    }
  ];

  return (
    <PageContainer 
      title="总览仪表盘" 
      description="系统整体指标概览和实时监控"
    >
      <div className="space-y-8">
        {/* 关键指标卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-6">
            关键指标
          </h2>
          <MetricGrid metrics={keyMetrics} />
        </motion.div>

        {/* 模块状态 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">
            模块状态
          </h2>
          <div className="px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {moduleMetrics.map((module, index) => (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <ModuleStatusCard {...module} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
}