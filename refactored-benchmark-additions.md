# Refactored Benchmark 扩展建议

## 概述

基于现有的 `refactored-benchmark` 结构和端到端RAG基准测试需求，以下是建议添加的关键组件，以构建一个功能完整的评测数据集。

## 1. Documents 文件夹扩展

### 现有内容保留
- audio, excel, html, image, pdf, ppt, video, word

### 建议添加
```
documents/
├── mixed-format/          # 混合格式文档
│   ├── multimedia-reports # 多媒体报告
│   └── cross-references   # 交叉引用文档
├── multilingual/          # 多语言文档集
│   ├── chinese/
│   ├── japanese/
│   └── mixed-language/
└── complexity-levels/     # 按复杂度分类
    ├── simple/
    ├── medium/
    └── complex/
```

### 各文件类型的细分
- **PDF**: 添加 simple-text, complex-layout, scanned-ocr, scientific-papers 子类别
- **Image**: 添加 charts, diagrams, screenshots, handwritten, infographics 子类别
- **Excel**: 添加 financial-reports, complex-formulas, pivot-tables 子类别

## 2. Parser 解析器扩展

### 建议新增解析器
```
parser/
├── layout-parser/         # 版面分析
│   ├── dataset-documents.jsonl
│   ├── ground-truth/
│   └── metrics/
├── formula-parser/        # 公式解析（数学、化学）
│   ├── dataset-math.jsonl
│   └── dataset-chemical.jsonl
├── entity-extractor/      # 实体抽取
│   ├── dataset-ner.jsonl
│   └── dataset-relations.jsonl
└── multimodal-parser/     # 多模态解析
    └── dataset-mixed.jsonl
```

### 现有解析器增强
- **OCR**: 添加多语言数据集、CER/WER评估指标
- **Table-parser**: 添加复杂表格、嵌套表格数据集，TEDS评分

## 3. QA 问答扩展

### 建议新增问答类型
```
qa/
├── factual-retrieval/     # 事实检索
│   ├── dataset-single-doc.jsonl
│   └── dataset-multi-doc.jsonl
├── table-qa/              # 表格问答
│   ├── dataset-lookup.jsonl
│   ├── dataset-aggregation.jsonl
│   └── dataset-cross-table.jsonl
├── summarization/         # 摘要生成
│   ├── dataset-extractive.jsonl
│   └── dataset-abstractive.jsonl
├── multimodal-qa/         # 多模态问答
│   ├── dataset-chart-qa.jsonl
│   └── dataset-diagram-qa.jsonl
├── knowledge-graph-qa/    # 知识图谱问答
│   ├── dataset-entity-linking.jsonl
│   └── dataset-sparql-generation.jsonl
└── complex-scenarios/     # 复杂场景
    ├── dataset-temporal.jsonl
    ├── dataset-negation.jsonl
    └── dataset-ambiguity.jsonl
```

### Reasoning 增强
- 分离 single-hop 和 multi-hop 推理
- 添加 logical-inference 逻辑推理

## 4. Retrieve 检索扩展

### 完整的检索体系
```
retrieve/
├── sparse-retrieval/      # 稀疏检索（BM25, TF-IDF）
├── dense-retrieval/       # 稠密检索（向量检索）
│   └── embeddings/        # 预计算的嵌入向量
├── hybrid-retrieval/      # 混合检索
├── knowledge-graph-retrieval/ # 图检索
│   └── graph-db/          # 图数据库
├── multimodal-retrieval/  # 多模态检索
└── cross-lingual/         # 跨语言检索
```

## 5. 新增顶层目录

### Knowledge-graph 知识图谱
```
knowledge-graph/
├── construction/          # 图谱构建
├── reasoning/            # 图谱推理
└── integration/          # RAG-KG融合
```

### Evaluation 评估框架
```
evaluation/
├── end2end/              # 端到端评估
├── parsing/              # 解析评估
├── retrieval/            # 检索评估
├── qa/                   # 问答评估
└── leaderboard/          # 排行榜
```

### Baselines 基线模型
```
baselines/
├── parsing/              # 解析基线（Tesseract, PaddleOCR, LayoutLM）
├── retrieval/            # 检索基线（BM25, DPR, ColBERT）
├── qa/                   # 问答基线（BERT-QA, GPT-RAG）
└── end2end/              # 端到端基线
```

### Annotations 标注数据
```
annotations/
├── parsing-ground-truth/  # 解析真值
├── retrieval-relevance/   # 检索相关性
└── qa-annotations/        # 问答标注
```

### Tools 工具集
```
tools/
├── data-generation/       # 数据生成
├── data-validation/       # 数据验证
├── visualization/         # 可视化
└── conversion/           # 格式转换
```

## 6. 配置和文档

### 新增文件
- `configs/`: 数据集、评估、模型配置
- `results/`: 实验结果存储
- `docs/`: 详细文档
- `requirements.txt`: Python依赖
- `CITATION.cff`: 引用信息

## 7. 数据格式标准化

### JSONL 格式示例

**QA数据格式**:
```json
{
  "id": "qa_001",
  "question": "问题文本",
  "answer": "答案",
  "type": "factual|reasoning|summary",
  "source_docs": ["doc_id1", "doc_id2"],
  "evidence": {...},
  "difficulty": "easy|medium|hard",
  "metadata": {...}
}
```

**检索数据格式**:
```json
{
  "query_id": "q_001",
  "query": "查询文本",
  "relevant_docs": ["doc_001", "doc_002"],
  "relevance_scores": [1.0, 0.8],
  "negative_docs": ["doc_003"]
}
```

## 8. 评估指标完整性

确保覆盖 metrics.md 中的所有指标：
- **解析**: CER, WER, TEDS, 表格F1, 版面保真度
- **检索**: P@K, R@K, MRR, NDCG, 查询延迟
- **问答**: EM, F1, ROUGE, 多跳准确率, 归因准确率

## 9. 多语言和领域支持

- 中文、英文、日文及混合语言
- 金融、医疗、法律、技术等领域
- 领域特定术语和缩写处理

## 10. 性能基准

- 不同规模数据集（1K, 10K, 100K文档）
- 延迟和吞吐量测试
- 资源消耗监控

通过这些扩展，`refactored-benchmark` 将成为一个全面的端到端RAG评测基准，支持从文档解析到最终问答的完整流程评估。