// 基础指标接口
export interface BaseMetric {
  name: string;
  value: number;
  unit: string;
  description: string;
  timestamp: Date;
  trend?: 'up' | 'down' | 'stable';
  status?: 'good' | 'warning' | 'critical';
}

// 文档解析功能指标
export interface DocumentParsingMetrics {
  // 文本提取准确率
  textExtractionAccuracy: BaseMetric;
  characterErrorRate: BaseMetric;
  wordErrorRate: BaseMetric;
  
  // 表格解析指标
  tableDetectionRecall: BaseMetric;
  tableStructureIntegrity: BaseMetric;
  cellContentAccuracy: BaseMetric;
  
  // 高级表格匹配指标
  tedsScore: BaseMetric; // 基于树编辑距离的表格相似度
  gritsScore: BaseMetric; // 基于网格的表格结构识别评分
  
  // 图片/图形提取
  imageExtractionRate: BaseMetric;
  chartDataExtractionAccuracy: BaseMetric;
  
  // 公式解析
  formulaDetectionRecall: BaseMetric;
  formulaRecognitionAccuracy: BaseMetric;
  
  // 版面结构和格式
  layoutFidelity: BaseMetric;
  titleParagraphRecognition: BaseMetric;
  stylePreservation: BaseMetric;
  
  // 内容覆盖率和噪音
  contentCoverageRate: BaseMetric;
  parsingNoiseRate: BaseMetric;
  
  // 性能指标
  parsingSpeed: BaseMetric;
  throughput: BaseMetric;
}

// 数据解锁功能指标
export interface DataUnlockingMetrics {
  // 检索质量指标
  precisionAtK: BaseMetric[];
  recallAtK: BaseMetric[];
  f1Score: BaseMetric;
  
  // 排名质量指标
  meanReciprocalRank: BaseMetric;
  meanAveragePrecision: BaseMetric;
  hitsAtK: BaseMetric[];
  
  // 知识图谱查询
  kgQueryAccuracy: BaseMetric;
  tripleExtractionPrecision: BaseMetric;
  tripleExtractionRecall: BaseMetric;
  tripleExtractionF1: BaseMetric;
  
  // 性能指标
  queryLatency: BaseMetric;
  p95Latency: BaseMetric;
  p99Latency: BaseMetric;
  queryThroughput: BaseMetric;
  
  // 系统扩展性
  indexBuildTime: BaseMetric;
  indexSize: BaseMetric;
  memoryUsage: BaseMetric;
  
  // 查询结果覆盖率
  knowledgeSourceMatchRate: BaseMetric;
  vectorSearchFallbackRate: BaseMetric;
}

// 问答功能指标
export interface QAMetrics {
  // 基础准确率指标
  qaAccuracy: BaseMetric;
  exactMatch: BaseMetric;
  fuzzyMatchF1: BaseMetric;
  
  // 答案质量指标
  rougeN: BaseMetric;
  rougeL: BaseMetric;
  bleuScore: BaseMetric;
  readabilityScore: BaseMetric;
  logicalConsistency: BaseMetric;
  
  // 多跳推理指标
  multiHopAccuracy: BaseMetric;
  intermediateStepAccuracy: BaseMetric;
  supportingEvidenceAccuracy: BaseMetric;
  
  // 推理过程完整性
  reasoningPathAccuracy: BaseMetric;
  logicalConsistencyScore: BaseMetric;
  
  // 知识来源指标
  knowledgeBaseHitRate: BaseMetric;
  internetQueryRate: BaseMetric;
  
  // 性能指标
  responseTime: BaseMetric;
  complexQueryLatency: BaseMetric;
  qaSessionThroughput: BaseMetric;
  
  // 业务相关性
  domainSpecificAccuracy: BaseMetric[];
  businessTermHandling: BaseMetric;
}

// 综合指标
export interface OverallMetrics {
  documentParsing: DocumentParsingMetrics;
  dataUnlocking: DataUnlockingMetrics;
  qa: QAMetrics;
  systemHealth: {
    overallScore: BaseMetric;
    uptime: BaseMetric;
    errorRate: BaseMetric;
    userSatisfaction: BaseMetric;
  };
}

// 图表数据类型
export interface ChartDataPoint {
  timestamp: string;
  value: number;
  category?: string;
  label?: string;
}

export interface MetricTrendData {
  metricName: string;
  data: ChartDataPoint[];
  color?: string;
}

// 仪表盘配置
export interface DashboardConfig {
  refreshInterval: number;
  theme: 'light' | 'dark';
  selectedMetrics: string[];
  chartTypes: Record<string, 'line' | 'bar' | 'pie' | 'radar' | 'gauge'>;
}

// 页面路由类型
export type PageRoute = 'dashboard' | 'productivity' | 'metric-grid' | 'document-parsing' | 'data-unlocking' | 'qa-metrics' | 'settings';

// 模块状态
export interface ModuleStatus {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  score: number;
  lastUpdated: Date;
}