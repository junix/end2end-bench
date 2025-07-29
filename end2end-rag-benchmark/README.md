# End-to-End RAG Benchmark Dataset

## 概述

本数据集是一个全面的端到端检索增强生成（RAG）系统基准测试集，旨在评估从文档解析到问答生成的完整RAG流程。数据集涵盖多种文档类型、多语言内容、复杂查询场景，以及丰富的评估维度。

## 数据集特点

- **文档类型多样性**：PDF、Word、Excel、PPT、图片等
- **内容复杂度分级**：简单文本、复杂表格、图表公式、扫描文档
- **多语言支持**：中文、日文、英文及混合语言文档
- **问答场景全面**：事实检索、表格分析、多跳推理、多模态理解等
- **评估维度丰富**：解析质量、检索效果、答案准确性、推理能力

## 目录结构

```
end2end-rag-benchmark/
├── raw_documents/          # 原始文档集合
│   ├── pdf/               # PDF文档
│   │   ├── simple/        # 简单PDF（纯文本为主）
│   │   ├── complex/       # 复杂PDF（包含表格、图表、公式）
│   │   └── scanned/       # 扫描版PDF（需要OCR）
│   ├── office/            # Office文档
│   │   ├── word/          # Word文档（.docx）
│   │   ├── excel/         # Excel表格（.xlsx）
│   │   └── powerpoint/    # PPT演示文稿（.pptx）
│   ├── images/            # 图片文档
│   │   ├── charts/        # 统计图表
│   │   ├── diagrams/      # 流程图、架构图
│   │   └── screenshots/   # 软件界面截图
│   └── multilingual/      # 多语言文档
│       ├── chinese/       # 中文文档
│       ├── japanese/      # 日文文档
│       └── mixed/         # 多语言混合文档
│
├── parsed_data/           # 解析后的结构化数据
│   ├── text_extraction/   # 文本提取结果
│   ├── table_extraction/  # 表格提取结果
│   ├── image_extraction/  # 图片提取结果
│   └── knowledge_graphs/  # 知识图谱抽取结果
│
├── qa_sets/               # 问答数据集
│   ├── factual_retrieval/ # 事实检索型问答
│   ├── table_qa/          # 表格相关问答
│   ├── reasoning/         # 推理型问答
│   ├── summarization/     # 总结型问答
│   ├── multimodal/        # 多模态问答
│   ├── knowledge_graph/   # 知识图谱问答
│   └── complex_scenarios/ # 复杂场景问答
│
├── annotations/           # 标注数据
│   ├── parsing_ground_truth/  # 解析真值标注
│   ├── retrieval_relevance/   # 检索相关性标注
│   └── answer_evaluation/     # 答案评估标注
│
├── evaluation_scripts/    # 评估脚本
├── baseline_results/      # 基线模型结果
└── tools/                 # 工具脚本
```

## 数据格式说明

### 1. 问答数据格式 (JSON)

```json
{
  "qa_id": "unique_question_id",
  "question": "问题文本",
  "question_type": "factual|reasoning|summarization|...",
  "answer": "标准答案",
  "alternative_answers": ["可接受的其他答案"],
  "source_documents": ["doc_id1", "doc_id2"],
  "evidence": {
    "text_snippets": ["相关文本片段"],
    "tables": ["table_id1"],
    "images": ["image_id1"]
  },
  "reasoning_steps": ["推理步骤1", "推理步骤2"],
  "difficulty": "easy|medium|hard",
  "metadata": {
    "domain": "finance|medical|legal|tech",
    "language": "zh|en|ja|mixed",
    "requires_numerical_computation": true/false,
    "requires_multi_hop": true/false
  }
}
```

### 2. 文档元数据格式

```json
{
  "doc_id": "unique_document_id",
  "filename": "original_filename.pdf",
  "doc_type": "pdf|word|excel|ppt|image",
  "language": "zh|en|ja|mixed",
  "domain": "finance|medical|legal|tech",
  "complexity": "simple|medium|complex",
  "page_count": 10,
  "contains_tables": true,
  "table_count": 5,
  "contains_images": true,
  "image_count": 3,
  "contains_formulas": false,
  "file_size_mb": 2.5,
  "creation_date": "2024-01-01",
  "annotations_available": ["text", "table", "layout"]
}
```

## 评估指标

### 解析器评估
- 文本提取准确率
- 表格结构识别准确率
- 图片/图表检测召回率
- OCR字符错误率（CER）
- 版面保真度

### 检索评估
- Precision@K
- Recall@K
- MRR（平均倒数排名）
- NDCG（归一化折损累计增益）
- 查询延迟

### 问答评估
- 精确匹配（EM）
- F1分数
- ROUGE分数（总结任务）
- 多跳推理准确率
- 答案归因准确率

## 使用方法

### 1. 数据加载

```python
import json
import os

# 加载问答数据
with open('qa_sets/factual_retrieval/single_doc_qa.json', 'r') as f:
    qa_data = json.load(f)

# 加载文档元数据
with open('metadata.json', 'r') as f:
    metadata = json.load(f)
```

### 2. 评估示例

```python
from evaluation_scripts.qa_metrics import evaluate_qa

# 运行问答评估
results = evaluate_qa(
    predictions='your_model_predictions.json',
    ground_truth='qa_sets/factual_retrieval/single_doc_qa.json',
    metrics=['em', 'f1', 'rouge']
)
```

### 3. 基线对比

```python
# 加载基线结果
baseline_results = load_baseline('baseline_results/qa_baselines/bert_baseline.json')

# 对比你的模型
compare_results(your_results, baseline_results)
```

## 数据集统计

- **文档总数**: 10,000+
- **问答对总数**: 50,000+
- **支持语言**: 中文、英文、日文
- **覆盖领域**: 金融、医疗、法律、技术
- **平均文档长度**: 15页
- **表格密集文档比例**: 35%
- **多模态问答比例**: 25%

## 引用

如果您使用本数据集，请引用：

```bibtex
@dataset{end2end_rag_benchmark,
  title={End-to-End RAG Benchmark Dataset},
  author={Your Organization},
  year={2024},
  publisher={Your Publisher}
}
```

## 许可证

本数据集采用 [具体许可证] 许可。

## 联系方式

- 问题反馈：issues@example.com
- 数据集维护：dataset@example.com