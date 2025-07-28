import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Table, 
  Image, 
  Calculator, 
  Zap, 
  Target,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PageContainer } from '@/components/layout/Layout';
import { MetricGrid, type MetricData } from '@/components/metrics/MetricGrid';
import { GaugeChart } from '@/components/charts/GaugeChart';
import { BarChart } from '@/components/charts/BarChart';
import { LineChart } from '@/components/charts/LineChart';
import { useMetricsStore } from '@/store/useMetricsStore';
import { cn, formatNumber, formatPercentage } from '@/utils';

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

  return (
    <Card className={cn('border-l-4', getStatusColor())}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">
              {unit === '%' ? formatPercentage(value) : formatNumber(value)}
              {unit !== '%' && <span className="text-sm text-muted-foreground ml-1">{unit}</span>}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div>{getTrendIcon()}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DocumentParsing() {
  const { metrics, trendData } = useMetricsStore();

  if (!metrics) {
    return (
      <PageContainer title="文档解析模块" description="文档解析功能指标监控">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">加载中...</div>
        </div>
      </PageContainer>
    );
  }

  const { documentParsing } = metrics;

  // 准备图表数据
  const accuracyData = [
    { 
      name: '文本提取', 
      value: documentParsing.textExtractionAccuracy.value,
      status: documentParsing.textExtractionAccuracy.status
    },
    { 
      name: '表格检测', 
      value: documentParsing.tableDetectionRecall.value,
      status: documentParsing.tableDetectionRecall.status
    },
    { 
      name: '图片提取', 
      value: documentParsing.imageExtractionRate.value,
      status: documentParsing.imageExtractionRate.status
    },
    { 
      name: '公式识别', 
      value: documentParsing.formulaRecognitionAccuracy.value,
      status: documentParsing.formulaRecognitionAccuracy.status
    }
  ];

  const tableMetricsData = [
    { 
      name: '结构完整性', 
      value: documentParsing.tableStructureIntegrity.value,
      status: documentParsing.tableStructureIntegrity.status
    },
    { 
      name: '单元格准确率', 
      value: documentParsing.cellContentAccuracy.value,
      status: documentParsing.cellContentAccuracy.status
    },
    { 
      name: 'TEDS分数', 
      value: documentParsing.tedsScore.value,
      status: documentParsing.tedsScore.status
    },
    { 
      name: 'GriTS分数', 
      value: documentParsing.gritsScore.value,
      status: documentParsing.gritsScore.status
    }
  ];

  // 模拟趋势数据
  const performanceTrend = trendData.textExtractionAccuracy?.data || [];

  return (
    <PageContainer 
      title="文档解析模块" 
      description="文档解析功能的性能指标和质量评估"
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
              id: 'text-extraction',
              title: '文本提取准确率',
              value: documentParsing.textExtractionAccuracy.value,
              unit: '%',
              trend: documentParsing.textExtractionAccuracy.trend,
              status: documentParsing.textExtractionAccuracy.status,
              description: '正确提取文档中文字内容的比例',
              icon: <FileText className="w-5 h-5" />
            },
            {
              id: 'table-detection',
              title: '表格检测召回率',
              value: documentParsing.tableDetectionRecall.value,
              unit: '%',
              trend: documentParsing.tableDetectionRecall.trend,
              status: documentParsing.tableDetectionRecall.status,
              description: '成功检测到的表格占实际表格总数的比例',
              icon: <Table className="w-5 h-5" />
            },
            {
              id: 'parsing-speed',
              title: '解析速度',
              value: documentParsing.parsingSpeed.value,
              unit: 'pages/min',
              trend: documentParsing.parsingSpeed.trend,
              status: documentParsing.parsingSpeed.status,
              description: '每分钟处理的页面数量',
              icon: <Zap className="w-5 h-5" />
            },
            {
              id: 'content-coverage',
              title: '内容覆盖率',
              value: documentParsing.contentCoverageRate.value,
              unit: '%',
              trend: documentParsing.contentCoverageRate.trend,
              status: documentParsing.contentCoverageRate.status,
              description: '解析内容相对于原文档的完整性',
              icon: <Target className="w-5 h-5" />
            }
          ] as MetricData[]} />
        </motion.div>

        {/* 文本和基础解析指标 */}
        <MetricSection
          title="文本解析质量"
          icon={<FileText className="w-5 h-5 text-primary" />}
          description="文本提取的准确性和完整性指标"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>整体准确率</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <GaugeChart
                    value={documentParsing.textExtractionAccuracy.value}
                    title="文本提取准确率"
                    subtitle={`${formatPercentage(documentParsing.textExtractionAccuracy.value)}`}
                    size="lg"
                    color="#10b981" // green-500
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>准确率对比</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={accuracyData}
                  height={250}
                  yAxisLabel="准确率"
                />
              </CardContent>
            </Card>
          </div>
        </MetricSection>

        {/* 表格解析专项指标 */}
        <MetricSection
          title="表格解析能力"
          icon={<Table className="w-5 h-5 text-primary" />}
          description="表格检测、结构识别和内容提取的专项评估"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <Card>
              <CardHeader>
                <CardTitle>表格检测召回率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <GaugeChart
                    value={documentParsing.tableDetectionRecall.value}
                    title="检测成功率"
                    subtitle={`${formatPercentage(documentParsing.tableDetectionRecall.value)}`}
                    color="#3b82f6" // blue-500
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>表格质量指标</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={tableMetricsData}
                  height={250}
                  yAxisLabel="评分"
                />
              </CardContent>
            </Card>
          </div>
        </MetricSection>

        {/* 多媒体内容解析 */}
        <MetricSection
          title="多媒体内容解析"
          icon={<Image className="w-5 h-5 text-primary" />}
          description="图片、图表和公式等复杂内容的识别能力"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <Card>
              <CardHeader>
                <CardTitle>图片提取率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <GaugeChart
                    value={documentParsing.imageExtractionRate.value}
                    title="提取成功率"
                    subtitle={`${formatPercentage(documentParsing.imageExtractionRate.value)}`}
                    color="#f59e0b" // amber-500
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>公式识别准确率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <GaugeChart
                    value={documentParsing.formulaRecognitionAccuracy.value}
                    title="识别准确率"
                    subtitle={`${formatPercentage(documentParsing.formulaRecognitionAccuracy.value)}`}
                    color="#8b5cf6" // violet-500
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>图表数据提取</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <GaugeChart
                    value={documentParsing.chartDataExtractionAccuracy.value}
                    title="数据准确率"
                    subtitle={`${formatPercentage(documentParsing.chartDataExtractionAccuracy.value)}`}
                    color="#ef4444" // red-500
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </MetricSection>

        {/* 性能趋势 */}
        {performanceTrend.length > 0 && (
          <MetricSection
            title="性能趋势"
            icon={<Zap className="w-5 h-5 text-primary" />}
            description="文档解析性能的历史趋势分析"
          >
            <Card>
              <CardHeader>
                <CardTitle>文本提取准确率趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={performanceTrend}
                  height={300}
                  showArea={true}
                  color="#10b981"
                  yAxisLabel="准确率"
                />
              </CardContent>
            </Card>
          </MetricSection>
        )}
      </div>
    </PageContainer>
  );
}