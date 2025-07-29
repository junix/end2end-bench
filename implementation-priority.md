# 实施优先级建议

## 第一阶段：核心功能补充（高优先级）

### 1. 完善 Retrieve 模块
```
retrieve/
├── sparse-retrieval/      # BM25基准
├── dense-retrieval/       # 向量检索
└── hybrid-retrieval/      # 混合方案
```
**原因**：检索是RAG的核心，当前完全空缺

### 2. 扩展 QA 类型
```
qa/
├── factual-retrieval/     # 事实型问答
├── table-qa/              # 表格问答
└── multimodal-qa/         # 多模态问答
```
**原因**：仅有reasoning不够全面

### 3. 建立评估体系
```
evaluation/
├── parsing/               # 解析指标
├── retrieval/             # 检索指标
└── qa/                    # 问答指标
```
**原因**：需要标准化的评估方法

## 第二阶段：增强现有模块（中优先级）

### 4. Parser 增强
- 添加 layout-parser（版面分析）
- 添加 entity-extractor（实体抽取）
- OCR添加多语言支持

### 5. Documents 分类
- 按复杂度分级（simple/medium/complex）
- 添加多语言文档集
- 为每类文档添加元数据

### 6. Annotations 标注
- 解析真值标注
- 检索相关性标注
- QA答案标注

## 第三阶段：高级功能（低优先级）

### 7. Knowledge Graph
- 知识图谱构建
- 图谱推理
- RAG-KG融合

### 8. 复杂场景
- 时序推理
- 否定处理
- 歧义消解

### 9. Tools & Baselines
- 数据生成工具
- 可视化工具
- 基线模型结果

## 实施建议

1. **数据格式统一**：所有新增组件使用JSONL格式
2. **评估指标对齐**：确保覆盖metrics.md中的所有指标
3. **模块化设计**：每个组件独立运行，便于扩展
4. **文档先行**：每个新组件都要有清晰的文档

## 快速启动清单

- [ ] 创建retrieve/sparse-retrieval基本结构
- [ ] 实现qa/factual-retrieval数据集
- [ ] 建立evaluation/qa/accuracy-metrics.py
- [ ] 编写整体README文档
- [ ] 设置基本的requirements.txt