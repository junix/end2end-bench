import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Search, 
  Target, 
  Zap, 
  BarChart3,
  Activity,
  Clock,
  Server,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PageContainer } from '@/components/layout/Layout';
import { MetricGrid, type MetricData } from '@/components/metrics/MetricGrid';
import { GaugeChart } from '@/components/charts/GaugeChart';
import { BarChart } from '@/components/charts/BarChart';
import { LineChart } from '@/components/charts/LineChart';
import { RadarChart } from '@/components/charts/RadarChart';
import { ScatterChart } from '@/components/charts/ScatterChart';
import { useMetricsStore } from '@/store/useMetricsStore';
import { cn, formatNumber, formatPercentage, formatLatency, formatBytes } from '@/utils';

interface MetricSectionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  children: React.ReactNode;
}

function MetricSection({ title, icon, description, children }: MetricSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="px-4 sm:px-6 md:px-8 lg:px-10">
        {children}
      </div>
    </motion.div>
  );
}

interface HighlightCardProps {
  title: string;
  value: number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'good' | 'warning' | 'critical';
  description: string;
}

function HighlightCard({ title, value, unit, trend, status, description }: HighlightCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'border-l-green-500 bg-green-50/50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50/50';
      case 'critical':
        return 'border-l-red-500 bg-red-50/50';
      default:
        return 'border-l-blue-500 bg-blue-50/50';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatValue = () => {
    if (unit === '%') {
      return formatPercentage(value);
    } else if (unit === 'ms') {
      return formatLatency(value);
    } else if (unit === 'GB') {
      return formatBytes(value * 1024 * 1024 * 1024);
    } else {
      return formatNumber(value);
    }
  };

  return (
    <Card className={cn('border-l-4', getStatusColor())}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">
              {formatValue()}
              {!['%', 'ms', 'GB'].includes(unit) && (
                <span className="text-sm text-muted-foreground ml-1">{unit}</span>
              )}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div>{getTrendIcon()}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DataUnlocking() {
  const { metrics, trendData } = useMetricsStore();

  if (!metrics) {
    return (
      <PageContainer title="数据解锁模块" description="向量数据库与知识图谱查询性能监控">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">加载中...</div>
        </div>
      </PageContainer>
    );
  }

  const { dataUnlocking } = metrics;

  // 准备图表数据
  const retrievalQualityData = [
    {
      subject: 'Precision@1',
      value: dataUnlocking.precisionAtK[0].value,
      fullMark: 1
    },
    {
      subject: 'Precision@5',
      value: dataUnlocking.precisionAtK[1].value,
      fullMark: 1
    },
    {
      subject: 'Recall@1',
      value: dataUnlocking.recallAtK[0].value,
      fullMark: 1
    },
    {
      subject: 'Recall@5',
      value: dataUnlocking.recallAtK[1].value,
      fullMark: 1
    },
    {
      subject: 'F1-Score',
      value: dataUnlocking.f1Score.value,
      fullMark: 1
    },
    {
      subject: 'MRR',
      value: dataUnlocking.meanReciprocalRank.value,
      fullMark: 1
    }
  ];

  const knowledgeGraphData = [
    { 
      name: 'KG查询准确率', 
      value: dataUnlocking.kgQueryAccuracy.value,
      status: dataUnlocking.kgQueryAccuracy.status
    },
    { 
      name: '三元组精确率', 
      value: dataUnlocking.tripleExtractionPrecision.value,
      status: dataUnlocking.tripleExtractionPrecision.status
    },
    { 
      name: '三元组召回率', 
      value: dataUnlocking.tripleExtractionRecall.value,
      status: dataUnlocking.tripleExtractionRecall.status
    },
    { 
      name: '三元组F1', 
      value: dataUnlocking.tripleExtractionF1.value,
      status: dataUnlocking.tripleExtractionF1.status
    }
  ];

  // 生成查询性能散点图数据
  const performanceScatterData = Array.from({ length: 50 }, (_, i) => ({
    x: Math.random() * 500 + 50, // 查询延迟 (ms)
    y: Math.random() * 0.3 + 0.7, // 准确率
    z: Math.random() * 100 + 50, // 查询复杂度
    name: `查询${i + 1}`,
    category: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
  }));

  // 模拟趋势数据
  const performanceTrend = trendData.queryLatency?.data || [];

  return (
    <PageContainer 
      title="数据解锁模块" 
      description="向量数据库与知识图谱的查询性能和准确性评估"
    >
      <div className="space-y-8">
        {/* 关键指标概览 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-6">关键指标概览</h2>
          <MetricGrid metrics={[
            {
              id: 'f1-score',
              title: 'F1综合评分',
              value: dataUnlocking.f1Score.value,
              unit: '%',
              trend: dataUnlocking.f1Score.trend,
              status: dataUnlocking.f1Score.status,
              description: '精确率和召回率的平衡指标',
              icon: <Target className="w-5 h-5" />
            },
            {
              id: 'query-latency',
              title: '查询延迟',
              value: dataUnlocking.queryLatency.value,
              unit: 'ms',
              trend: dataUnlocking.queryLatency.trend,
              status: dataUnlocking.queryLatency.status,
              description: '查询响应的平均时间',
              icon: <Clock className="w-5 h-5" />
            },
            {
              id: 'query-throughput',
              title: '查询吞吐量',
              value: dataUnlocking.queryThroughput.value,
              unit: 'QPS',
              trend: dataUnlocking.queryThroughput.trend,
              status: dataUnlocking.queryThroughput.status,
              description: '系统每秒处理的查询数量',
              icon: <Zap className="w-5 h-5" />
            },
            {
              id: 'memory-usage',
              title: '内存使用量',
              value: dataUnlocking.memoryUsage.value,
              unit: 'GB',
              trend: dataUnlocking.memoryUsage.trend,
              status: dataUnlocking.memoryUsage.status,
              description: '系统运行时的内存占用',
              icon: <Server className="w-5 h-5" />
            }
          ] as MetricData[]} />
        </motion.div>

        {/* 检索质量评估 */}
        <MetricSection
            title="检索质量评估"
            icon={<Search className="w-5 h-5 text-primary" />}
            description="向量搜索和知识图谱检索的准确性和完整性"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>综合检索能力</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadarChart
                    data={retrievalQualityData}
                    height={300}
                    color="#10b981" // green-500
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>精确率@K指标</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dataUnlocking.precisionAtK.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="font-medium text-foreground truncate">{metric.name}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{metric.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-2xl font-bold text-foreground">
                            {formatPercentage(metric.value)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </MetricSection>

        {/* 知识图谱性能 */}
        <MetricSection
            title="知识图谱查询"
            icon={<Database className="w-5 h-5 text-primary" />}
            description="知识图谱三元组提取和结构化查询的准确性"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>KG查询准确率</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <GaugeChart
                      value={dataUnlocking.kgQueryAccuracy.value}
                      title="查询准确率"
                      subtitle={`${formatPercentage(dataUnlocking.kgQueryAccuracy.value)}`}
                      color="#3b82f6" // blue-500
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>三元组提取质量</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={knowledgeGraphData}
                    height={250}
                    yAxisLabel="准确率"
                  />
                </CardContent>
              </Card>
            </div>
          </MetricSection>

        {/* 性能监控 */}
        <MetricSection
            title="性能监控"
            icon={<Activity className="w-5 h-5 text-primary" />}
            description="查询延迟、吞吐量和系统资源使用情况"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>查询延迟分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {formatLatency(dataUnlocking.queryLatency.value)}
                      </p>
                      <p className="text-sm text-muted-foreground">平均延迟</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {formatLatency(dataUnlocking.p95Latency.value)}
                      </p>
                      <p className="text-sm text-muted-foreground">P95延迟</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {formatLatency(dataUnlocking.p99Latency.value)}
                      </p>
                      <p className="text-sm text-muted-foreground">P99延迟</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>系统资源使用</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <Server className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground truncate">索引大小</span>
                      </div>
                      <span className="font-medium text-foreground flex-shrink-0">
                        {formatBytes(dataUnlocking.indexSize.value * 1024 * 1024 * 1024)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <Activity className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground truncate">内存使用</span>
                      </div>
                      <span className="font-medium text-foreground flex-shrink-0">
                        {formatBytes(dataUnlocking.memoryUsage.value * 1024 * 1024 * 1024)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground truncate">索引构建时间</span>
                      </div>
                      <span className="font-medium text-foreground flex-shrink-0">
                        {formatNumber(dataUnlocking.indexBuildTime.value)} 分钟
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <Zap className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground truncate">查询吞吐量</span>
                      </div>
                      <span className="font-medium text-foreground flex-shrink-0">
                        {formatNumber(dataUnlocking.queryThroughput.value)} QPS
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </MetricSection>

        {/* 查询性能分析 */}
        <MetricSection
            title="查询性能分析"
            icon={<BarChart3 className="w-5 h-5 text-primary" />}
            description="查询延迟与准确率的关系分析"
          >
            <Card>
              <CardHeader>
                <CardTitle>延迟 vs 准确率分布</CardTitle>
              </CardHeader>
              <CardContent>
                <ScatterChart
                  data={performanceScatterData}
                  height={350}
                  xAxisLabel="查询延迟 (ms)"
                  yAxisLabel="准确率"
                  color="#8b5cf6" // violet-500
                />
                <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">低复杂度查询</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className="text-muted-foreground">中等复杂度查询</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-muted-foreground">高复杂度查询</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MetricSection>

        {/* 性能趋势 */}
        {performanceTrend.length > 0 && (
          <MetricSection
              title="性能趋势"
              icon={<TrendingUp className="w-5 h-5 text-primary" />}
              description="查询性能的历史趋势分析"
            >
              <Card>
                <CardHeader>
                  <CardTitle>查询延迟趋势</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={performanceTrend}
                    height={300}
                    showArea={true}
                    color="#ef4444" // red-500
                    yAxisLabel="延迟 (ms)"
                  />
                </CardContent>
              </Card>
            </MetricSection>
        )}
      </div>
    </PageContainer>
  );
}