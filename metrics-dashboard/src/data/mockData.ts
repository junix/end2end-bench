import type { 
  BaseMetric, 
  DocumentParsingMetrics, 
  DataUnlockingMetrics, 
  QAMetrics, 
  OverallMetrics,
  ChartDataPoint,
  MetricTrendData 
} from '@/types/metrics';

// 生成随机数据的辅助函数
function generateRandomValue(min: number, max: number, decimals: number = 2): number {
  return Number((Math.random() * (max - min) + min).toFixed(decimals));
}

function generateRandomStatus(): 'good' | 'warning' | 'critical' {
  const statuses: ('good' | 'warning' | 'critical')[] = ['good', 'good', 'good', 'warning', 'critical'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function generateRandomTrend(): 'up' | 'down' | 'stable' {
  const trends: ('up' | 'down' | 'stable')[] = ['up', 'down', 'stable'];
  return trends[Math.floor(Math.random() * trends.length)];
}

// 创建基础指标
function createBaseMetric(
  name: string,
  value: number,
  unit: string,
  description: string
): BaseMetric {
  return {
    name,
    value,
    unit,
    description,
    timestamp: new Date(),
    trend: generateRandomTrend(),
    status: generateRandomStatus()
  };
}

// 生成文档解析指标模拟数据
export function generateDocumentParsingMetrics(): DocumentParsingMetrics {
  return {
    textExtractionAccuracy: createBaseMetric(
      '文本提取准确率',
      generateRandomValue(0.85, 0.98),
      '%',
      '正确提取文档中文字内容的比例'
    ),
    characterErrorRate: createBaseMetric(
      '字符错误率',
      generateRandomValue(0.01, 0.05),
      '%',
      'OCR识别和文本提取的字符级错误率'
    ),
    wordErrorRate: createBaseMetric(
      '单词错误率',
      generateRandomValue(0.02, 0.08),
      '%',
      '单词级别的提取错误率'
    ),
    tableDetectionRecall: createBaseMetric(
      '表格检测召回率',
      generateRandomValue(0.80, 0.95),
      '%',
      '成功检测到的表格占实际表格总数的比例'
    ),
    tableStructureIntegrity: createBaseMetric(
      '表格结构完整性',
      generateRandomValue(0.75, 0.92),
      '%',
      '表格行列结构正确识别的比例'
    ),
    cellContentAccuracy: createBaseMetric(
      '单元格内容准确率',
      generateRandomValue(0.88, 0.96),
      '%',
      '表格单元格内容正确提取的比例'
    ),
    tedsScore: createBaseMetric(
      'TEDS分数',
      generateRandomValue(0.70, 0.90),
      'score',
      '基于树编辑距离的表格相似度评分'
    ),
    gritsScore: createBaseMetric(
      'GriTS分数',
      generateRandomValue(0.75, 0.93),
      'score',
      '基于网格的表格结构识别评分'
    ),
    imageExtractionRate: createBaseMetric(
      '图片提取率',
      generateRandomValue(0.85, 0.98),
      '%',
      '成功提取的图片占总图片数的比例'
    ),
    chartDataExtractionAccuracy: createBaseMetric(
      '图表数据提取准确率',
      generateRandomValue(0.70, 0.88),
      '%',
      '图表转换为数据的准确性'
    ),
    formulaDetectionRecall: createBaseMetric(
      '公式检测召回率',
      generateRandomValue(0.82, 0.94),
      '%',
      '成功检测到的公式占实际公式总数的比例'
    ),
    formulaRecognitionAccuracy: createBaseMetric(
      '公式识别准确率',
      generateRandomValue(0.78, 0.91),
      '%',
      '公式符号和结构正确识别的比例'
    ),
    layoutFidelity: createBaseMetric(
      '版面保真度',
      generateRandomValue(0.83, 0.95),
      '%',
      '排版结构还原的准确程度'
    ),
    titleParagraphRecognition: createBaseMetric(
      '标题段落识别率',
      generateRandomValue(0.89, 0.97),
      '%',
      '标题、段落等结构正确识别的比例'
    ),
    stylePreservation: createBaseMetric(
      '样式保留度',
      generateRandomValue(0.72, 0.86),
      '%',
      '粗体、斜体等样式保留的比例'
    ),
    contentCoverageRate: createBaseMetric(
      '内容覆盖率',
      generateRandomValue(0.92, 0.99),
      '%',
      '解析内容相对于原文档的完整性'
    ),
    parsingNoiseRate: createBaseMetric(
      '解析噪音率',
      generateRandomValue(0.02, 0.08),
      '%',
      '解析结果中噪音内容的比例'
    ),
    parsingSpeed: createBaseMetric(
      '解析速度',
      generateRandomValue(2.1, 8.5),
      'pages/min',
      '每分钟处理的页面数量'
    ),
    throughput: createBaseMetric(
      '处理吞吐量',
      generateRandomValue(150, 450),
      'docs/hour',
      '每小时处理的文档数量'
    )
  };
}

// 生成数据解锁指标模拟数据
export function generateDataUnlockingMetrics(): DataUnlockingMetrics {
  return {
    precisionAtK: [
      createBaseMetric('Precision@1', generateRandomValue(0.85, 0.95), '%', '前1个结果的精确率'),
      createBaseMetric('Precision@5', generateRandomValue(0.75, 0.90), '%', '前5个结果的精确率'),
      createBaseMetric('Precision@10', generateRandomValue(0.68, 0.85), '%', '前10个结果的精确率')
    ],
    recallAtK: [
      createBaseMetric('Recall@1', generateRandomValue(0.65, 0.80), '%', '前1个结果的召回率'),
      createBaseMetric('Recall@5', generateRandomValue(0.80, 0.92), '%', '前5个结果的召回率'),
      createBaseMetric('Recall@10', generateRandomValue(0.88, 0.96), '%', '前10个结果的召回率')
    ],
    f1Score: createBaseMetric(
      'F1分数',
      generateRandomValue(0.78, 0.89),
      'score',
      '精确率和召回率的调和平均'
    ),
    meanReciprocalRank: createBaseMetric(
      '平均倒数排名',
      generateRandomValue(0.72, 0.86),
      'score',
      '第一个正确答案排名位置的倒数平均值'
    ),
    meanAveragePrecision: createBaseMetric(
      '平均准确率均值',
      generateRandomValue(0.75, 0.88),
      'score',
      '综合考虑多个相关结果排名的指标'
    ),
    hitsAtK: [
      createBaseMetric('Hits@1', generateRandomValue(0.82, 0.93), '%', '前1个结果的命中率'),
      createBaseMetric('Hits@5', generateRandomValue(0.91, 0.97), '%', '前5个结果的命中率'),
      createBaseMetric('Hits@10', generateRandomValue(0.95, 0.99), '%', '前10个结果的命中率')
    ],
    kgQueryAccuracy: createBaseMetric(
      '知识图谱查询准确率',
      generateRandomValue(0.83, 0.94),
      '%',
      '知识图谱结构化查询的正确率'
    ),
    tripleExtractionPrecision: createBaseMetric(
      '三元组提取精确率',
      generateRandomValue(0.79, 0.91),
      '%',
      '提取的三元组中正确的比例'
    ),
    tripleExtractionRecall: createBaseMetric(
      '三元组提取召回率',
      generateRandomValue(0.76, 0.87),
      '%',
      '应提取的三元组中成功提取的比例'
    ),
    tripleExtractionF1: createBaseMetric(
      '三元组提取F1',
      generateRandomValue(0.77, 0.89),
      'score',
      '三元组提取精确率和召回率的平衡指标'
    ),
    queryLatency: createBaseMetric(
      '查询延迟',
      generateRandomValue(45, 180),
      'ms',
      '查询响应的平均时间'
    ),
    p95Latency: createBaseMetric(
      'P95延迟',
      generateRandomValue(120, 350),
      'ms',
      '95%查询的响应时间'
    ),
    p99Latency: createBaseMetric(
      'P99延迟',
      generateRandomValue(200, 500),
      'ms',
      '99%查询的响应时间'
    ),
    queryThroughput: createBaseMetric(
      '查询吞吐量',
      generateRandomValue(850, 1200),
      'QPS',
      '系统每秒处理的查询数量'
    ),
    indexBuildTime: createBaseMetric(
      '索引构建时间',
      generateRandomValue(12, 45),
      'min',
      '构建搜索索引所需的时间'
    ),
    indexSize: createBaseMetric(
      '索引大小',
      generateRandomValue(2.1, 8.7),
      'GB',
      '向量索引和知识图谱的存储大小'
    ),
    memoryUsage: createBaseMetric(
      '内存使用量',
      generateRandomValue(4.2, 12.8),
      'GB',
      '系统运行时的内存占用'
    ),
    knowledgeSourceMatchRate: createBaseMetric(
      '知识源匹配率',
      generateRandomValue(0.68, 0.84),
      '%',
      '直接从知识图谱获得答案的查询比例'
    ),
    vectorSearchFallbackRate: createBaseMetric(
      '向量搜索回退率',
      generateRandomValue(0.16, 0.32),
      '%',
      '需要回退到向量搜索的查询比例'
    )
  };
}

// 生成问答功能指标模拟数据
export function generateQAMetrics(): QAMetrics {
  return {
    qaAccuracy: createBaseMetric(
      '问答准确率',
      generateRandomValue(0.82, 0.94),
      '%',
      '问答系统回答正确的比例'
    ),
    exactMatch: createBaseMetric(
      '精确匹配率',
      generateRandomValue(0.76, 0.89),
      '%',
      '答案与标准答案完全匹配的比例'
    ),
    fuzzyMatchF1: createBaseMetric(
      '模糊匹配F1',
      generateRandomValue(0.83, 0.92),
      'score',
      '部分正确答案的F1评分'
    ),
    rougeN: createBaseMetric(
      'ROUGE-N',
      generateRandomValue(0.74, 0.87),
      'score',
      'N-gram重叠度评分'
    ),
    rougeL: createBaseMetric(
      'ROUGE-L',
      generateRandomValue(0.78, 0.90),
      'score',
      '最长公共子序列评分'
    ),
    bleuScore: createBaseMetric(
      'BLEU分数',
      generateRandomValue(0.71, 0.85),
      'score',
      '生成文本与参考答案的相似度'
    ),
    readabilityScore: createBaseMetric(
      '可读性评分',
      generateRandomValue(0.80, 0.93),
      'score',
      '答案的语言流畅度和可读性'
    ),
    logicalConsistency: createBaseMetric(
      '逻辑一致性',
      generateRandomValue(0.85, 0.95),
      'score',
      '答案逻辑的连贯性和一致性'
    ),
    multiHopAccuracy: createBaseMetric(
      '多跳推理准确率',
      generateRandomValue(0.68, 0.82),
      '%',
      '需要多步推理的复杂问题准确率'
    ),
    intermediateStepAccuracy: createBaseMetric(
      '中间步骤准确率',
      generateRandomValue(0.73, 0.86),
      '%',
      '推理过程中间步骤的正确性'
    ),
    supportingEvidenceAccuracy: createBaseMetric(
      '支持证据准确率',
      generateRandomValue(0.79, 0.91),
      '%',
      '找到正确支持证据的比例'
    ),
    reasoningPathAccuracy: createBaseMetric(
      '推理路径准确率',
      generateRandomValue(0.72, 0.87),
      '%',
      '推理路径的正确性'
    ),
    logicalConsistencyScore: createBaseMetric(
      '逻辑一致性评分',
      generateRandomValue(0.81, 0.93),
      'score',
      '推理过程的逻辑一致性'
    ),
    knowledgeBaseHitRate: createBaseMetric(
      '知识库命中率',
      generateRandomValue(0.74, 0.88),
      '%',
      '直接从内部知识库获得答案的比例'
    ),
    internetQueryRate: createBaseMetric(
      '互联网查询率',
      generateRandomValue(0.12, 0.26),
      '%',
      '需要联网搜索的问题比例'
    ),
    responseTime: createBaseMetric(
      '响应时间',
      generateRandomValue(1.2, 4.8),
      's',
      '问答系统的平均响应时间'
    ),
    complexQueryLatency: createBaseMetric(
      '复杂查询延迟',
      generateRandomValue(3.5, 8.2),
      's',
      '复杂推理问题的响应时间'
    ),
    qaSessionThroughput: createBaseMetric(
      '问答会话吞吐量',
      generateRandomValue(120, 280),
      'sessions/min',
      '每分钟处理的问答会话数量'
    ),
    domainSpecificAccuracy: [
      createBaseMetric('财务领域准确率', generateRandomValue(0.82, 0.94), '%', '财务相关问题的准确率'),
      createBaseMetric('技术领域准确率', generateRandomValue(0.78, 0.91), '%', '技术相关问题的准确率'),
      createBaseMetric('法律领域准确率', generateRandomValue(0.75, 0.87), '%', '法律相关问题的准确率'),
      createBaseMetric('医疗领域准确率', generateRandomValue(0.80, 0.92), '%', '医疗相关问题的准确率')
    ],
    businessTermHandling: createBaseMetric(
      '业务术语处理能力',
      generateRandomValue(0.79, 0.90),
      '%',
      '企业特有术语和缩写的正确处理比例'
    )
  };
}

// 生成综合指标模拟数据
export function generateOverallMetrics(): OverallMetrics {
  return {
    documentParsing: generateDocumentParsingMetrics(),
    dataUnlocking: generateDataUnlockingMetrics(),
    qa: generateQAMetrics(),
    systemHealth: {
      overallScore: createBaseMetric(
        '系统整体评分',
        generateRandomValue(0.82, 0.94),
        'score',
        '系统综合健康度评分'
      ),
      uptime: createBaseMetric(
        '系统可用时间',
        generateRandomValue(0.995, 0.999),
        '%',
        '系统正常运行时间比例'
      ),
      errorRate: createBaseMetric(
        '错误率',
        generateRandomValue(0.001, 0.01),
        '%',
        '系统处理请求的错误比例'
      ),
      userSatisfaction: createBaseMetric(
        '用户满意度',
        generateRandomValue(0.85, 0.95),
        'score',
        '用户对系统的满意度评分'
      )
    }
  };
}

// 生成图表趋势数据
export function generateTrendData(metricName: string, days: number = 30): MetricTrendData {
  const data: ChartDataPoint[] = [];
  const baseValue = generateRandomValue(0.7, 0.9);
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const variation = generateRandomValue(-0.05, 0.05);
    const value = Math.max(0, Math.min(1, baseValue + variation));
    
    data.push({
      timestamp: date.toISOString().split('T')[0],
      value: Number(value.toFixed(3)),
      label: date.toLocaleDateString()
    });
  }
  
  return {
    metricName,
    data,
    color: '#3b82f6'
  };
}