# 文档处理系统评估指标

## 解析器指标

解析器指标评估系统对各种文档类型（PDF、Word、Excel、PPT等）的解析能力和性能。这些指标衡量系统提取不同元素（如文本、表格、图片、公式）的准确性，以及维持原始文档结构的能力。高质量的解析是基础，因为它直接影响下游检索和问答任务的效果。指标涵盖准确性（内容提取的正确程度）、完整性（是否捕获所有内容）和效率（处理速度和资源使用）。

### 信息抽取指标

| 名称 | 字段 | 描述 | 已知数据集 | 已知排行榜 |
|------|-------|-------------|---------------|-------------------|
| 三元组提取F1 | parser | 知识三元组提取准确性的F1分数 | DocRED, TACRED | [TACRED Leaderboard](https://nlp.stanford.edu/projects/tacred/) |

| 名称 | 字段 | 描述 | 已知数据集 | 已知排行榜 |
|------|-------|-------------|---------------|-------------------|
| 文档解析成功率 | parser | 不同文档类型的整体解析成功率（PDF: >99%、DOC: >98%、PPT: >98%、Excel: >95%、图片: >99%，基于企业数据集10000+样本） | 企业自定义数据集 | - |
| 格式转换成功率 | parser | 将文档转换为可处理格式的成功率（DOC: >99%、PPT: >99%、PDF: N/A、Excel: >98%、图片: >99%，基于企业数据集） | 企业自定义数据集 | - |
| 文本提取率 | parser | 字符级文本提取准确率，相比Tencent文档解析提升7.11个百分点 | FUNSD, CORD, SROIE | [PapersWithCode OCR](https://paperswithcode.com/task/optical-character-recognition) |
| 表格提取率 | parser | 从文档中正确检测和提取表格的百分比，相比Tencent文档解析提升1.67个百分点 | PubTabNet, TableBank, ICDAR 2019 | [ICDAR Table Competition](https://icdar2019.org/) |
| 表格结构匹配率 | parser | 结构解析正确的表格百分比（93.50%完全匹配） | PubTables-1M, FinTabNet | [PubTables-1M Leaderboard](https://github.com/microsoft/table-transformer) |
| 表头准确率 | parser | 表头提取正确的表格百分比（结构匹配时96.03%） | 企业自定义数据集 | - |
| 表格数据内容准确率 | parser | 所有单元格内容提取正确的表格百分比（表头匹配时92.26%） | SciTSR, ICDAR 2013 | [ICDAR 2013 Table Competition](https://www.tamirhassan.com/html/dataset.html) |
| TEDS分数 | parser | 基于树编辑距离的表格结构和内容评估相似度 | PubTabNet | [PubTabNet Benchmark](https://github.com/ibm-aur-nlp/PubTabNet) |
| GriTS分数 | parser | 基于网格的表格结构识别分数，用于综合表格质量评估 | cTDaR 2020 Track B, FinTabNet | [cTDaR 2020 Competition](https://github.com/cndplab-founder/ICDAR2019_cTDaR) |
| 图片提取率 | parser | 嵌入图片、图表和图形检测的召回率，比Tencent文档解析低0.86个百分点 | DocFigure, ICDAR 2017 POD | [ICDAR 2017 POD Competition](https://icdar2017pod.github.io/) |
| 公式识别准确率 | parser | LaTeX识别BLEU分数(IM2LaTeX-100K)或表达式级准确率(CROHME-2024) | IM2LaTeX-100K, CROHME-2024 | [CROHME Competition](https://www.isical.ac.in/~crohme/) |
| 版面保真度 | parser | 文档结构保真度，包括标题、段落、列表和格式 | DocBank, PubLayNet | [PubLayNet Benchmark](https://github.com/ibm-aur-nlp/PubLayNet) |
| 内容覆盖率 | parser | 提取内容的整体完整性（文本、表格、图片） | DocVQA, RVL-CDIP | [DocVQA Leaderboard](https://rrc.cvc.uab.es/?ch=17) |
| 解析噪音率 | parser | 错误添加内容或格式错误的百分比 | 企业自定义数据集 | - |
| 解析速度 | parser | 每秒/每分钟处理的文档或页数（基于内部10万页混合测试集） | 企业混合文档集 | - |

### OCR相关指标

| 名称 | 字段 | 描述 | 已知数据集 | 已知排行榜 |
|------|-------|-------------|---------------|-------------------|
| 字符错误率（CER） | parser | 字符级别的识别错误率，越低越好 | ICDAR 2015, ICDAR 2019 MLT | [ICDAR Robust Reading](https://rrc.cvc.uab.es/) |
| 词错误率（WER） | parser | 单词级别的识别错误率，适用于英文等分词语言 | TextOCR, COCO-Text | [TextOCR Benchmark](https://textvqa.org/textocr/) |
| 文本行检测精度 | parser | 文本行边界框的IoU精度和召回率 | CTW1500, Total-Text | [CTW1500 Leaderboard](https://github.com/Yuliang-Liu/Curve-Text-Detector) |
| 端到端识别F1 | parser | 同时考虑文本检测和识别的综合F1分数 | ICDAR 2015 E2E, TextSpotter | [ICDAR 2015 E2E](https://rrc.cvc.uab.es/?ch=4) |
| 多语言OCR准确率 | parser | 非英语文本（中文、日文、阿拉伯文等）的识别准确率 | MLT 2019, MSRA-TD500 | [MLT 2019](https://rrc.cvc.uab.es/?ch=15) |
| 手写文本识别率 | parser | 手写文档的文本识别准确率 | IAM, RIMES, CVL | [IAM Handwriting](https://fki.tic.heia-fr.ch/databases/iam-handwriting-database) |
| 场景文本识别 | parser | 自然场景图片中的文本识别准确率 | ICDAR 2015 Scene Text, SVT | [Scene Text Benchmarks](https://paperswithcode.com/task/scene-text-recognition) |
| 扭曲文本识别 | parser | 弯曲、旋转、透视变换文本的识别准确率 | CUTE80, SVT-Perspective | [CUTE80 Dataset](https://github.com/Yuliang-Liu/Curve-Text-Detector) |
| OCR后处理纠错率 | parser | 使用语言模型纠正OCR错误的成功率 | ICDAR 2019 POST-OCR | [POST-OCR Competition](https://sites.google.com/view/icdar2019-postcorrectionocr) |
| 实时OCR速度 | parser | 每秒处理的字符数或图片数 | 内部基准测试 | - |

## 检索指标

检索指标衡量数据解锁层的有效性，该层结合向量数据库和知识图谱来存储和查询解析后的文档内容。这些指标同时评估搜索结果的质量（精确率、召回率、排名）和系统在不同规模下的性能。在企业场景中，检索质量直接决定了用户是否能够快速准确地找到相关信息。指标评估系统处理不同查询类型的能力，从简单的关键词搜索到复杂的结构化查询，以及随着数据量增长的扩展性。

### MTEB（大规模文本嵌入基准）相关指标

MTEB是目前最全面的文本嵌入评估基准，涵盖8个任务类别、58个数据集和112种语言。以下是与检索系统相关的MTEB任务：

| 名称 | 字段 | 描述 | 已知数据集 | 已知排行榜 |
|------|-------|-------------|---------------|-------------------|
| 精确率@K | retrieve | 前K个检索结果中相关结果的百分比 | MS MARCO, BEIR | [BEIR Benchmark](https://github.com/beir-cellar/beir) |
| 召回率@K | retrieve | 前K个结果中相关文档的覆盖率 | TREC-DL, Natural Questions | [MS MARCO Leaderboard](https://microsoft.github.io/msmarco/) |
| MRR（平均倒数排名） | retrieve | 第一个相关结果排名倒数的平均值 | MS MARCO Passage | [MS MARCO Passage Ranking](https://microsoft.github.io/msmarco/) |
| MAP（平均准确率均值） | retrieve | 多个查询的平均精确率 | TREC collections | [TREC Leaderboards](https://trec.nist.gov/) |
| 知识图谱查询准确率 | retrieve | 知识图谱结构化查询的正确性 | FB15k-237, WN18RR | [OGB Knowledge Graph](https://ogb.stanford.edu/docs/linkprop/) |
| 查询延迟 | retrieve | 查询的平均和P95/P99响应时间 | ANN-Benchmarks (Recall-Latency曲线) | [ANN-Benchmarks](http://ann-benchmarks.com/) |
| 查询吞吐量（QPS） | retrieve | 负载下每秒处理的查询数 | ANN-Benchmarks (Recall vs QPS) | [ANN-Benchmarks](http://ann-benchmarks.com/) |
| 索引构建时间 | retrieve | 将文档索引到向量/图数据库的时间 | FAISS benchmarks | [FAISS Wiki](https://github.com/facebookresearch/faiss/wiki) |
| 查询覆盖率 | retrieve | 由知识图谱vs向量搜索回答的查询百分比 | 企业自定义数据集 | - |
| MTEB检索性能 | retrieve | 在MTEB检索任务上的NDCG@10分数 | MTEB Retrieval (覆盖BEIR套件中的15个数据集) | [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard) |
| MTEB重排序性能 | retrieve | 在MTEB重排序任务上的MAP分数 | MTEB Reranking (4个数据集) | [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard) |
| MTEB语义相似度 | retrieve | 在MTEB STS任务上的Spearman相关系数 | MTEB STS (10个数据集) | [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard) |
| MTEB双语挖掘 | retrieve | 在跨语言文本匹配任务上的F1分数 | MTEB Bitext Mining (3个数据集) | [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard) |
| MTEB聚类性能 | retrieve | 在文本聚类任务上的V-measure分数 | MTEB Clustering (11个数据集) | [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard) |
| MTEB分类性能 | retrieve | 在文本分类任务上的准确率 | MTEB Classification (12个数据集，详见官方leaderboard) | [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard) |
| MTEB句对分类 | retrieve | 在句对分类任务上的AP分数 | MTEB Pair Classification (3个数据集) | [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard) |

## 问答指标

问答指标评估系统利用内部知识库和互联网资源回答各种类型问题的能力。这些指标涵盖不同的问题类型，包括事实型、推理型、总结型和多跳推理问题。评估重点在于答案正确性、生成响应的质量、推理能力和响应效率。对于RAG（检索增强生成）系统，额外的指标评估答案对检索上下文的忠实度以及系统避免幻觉的能力。这些指标对于确保系统在企业应用中提供准确、相关和可信的答案至关重要。

| 名称 | 字段 | 描述 | 已知数据集 | 已知排行榜 |
|------|-------|-------------|---------------|-------------------|
| 精确匹配（EM） | qa | 与真实答案完全匹配的答案百分比 | SQuAD 2.0, Natural Questions | [SQuAD 2.0 Leaderboard](https://rajpurkar.github.io/SQuAD-explorer/) |
| F1分数 | qa | 词元级F1用于部分答案正确性 | SQuAD, MRQA | [MRQA 2019](https://mrqa.github.io/2019/shared.html) |
| ROUGE分数 | qa | 用于总结质量的N-gram重叠（ROUGE-N, ROUGE-L） | CNN/DailyMail, XSum | [CNN/DailyMail Benchmark](https://paperswithcode.com/dataset/cnn-daily-mail-1) |
| BLEU分数 | qa | 基于精确率的生成文本质量指标 | WebNLG, MultiWOZ | [GEM Benchmark](https://gem-benchmark.com/) |
| 多跳推理准确率 | qa | 需要多步推理的问题的正确性 | HotpotQA, 2WikiMultiHopQA | [HotpotQA Leaderboard](https://hotpotqa.github.io/) |
| 支持证据精确率 | qa | 多跳推理检索证据的准确性 | HotpotQA, FEVER | [FEVER Leaderboard](https://fever.ai/leaderboard.html) |
| 自然语言推理链完整度 | qa | 使用Chain-of-Thought的推理步骤完整性 | EntailmentBank | [EntailmentBank](https://allenai.org/data/entailmentbank) |
| 形式化推理正确率 | qa | 逻辑推理和数学证明的正确性 | ProofWriter | - |
| 知识来源归因 | qa | 计算答案引用片段与其来源类型(内部KB/外部)的一致性比例（人工抽样核验200例） | 自定义指标 | - |
| 按类型的响应时间 | qa | 事实型vs复杂推理问题的平均延迟 | 自定义基准测试 | - |
| 领域特定准确率 | qa | 在行业/领域特定问题上的表现 | FinQA, BioASQ | [BioASQ](http://bioasq.org/) |
| 业务术语处理 | qa | 对企业特定术语和缩写的准确性 | 企业自定义数据集 | - |
| 答案完整性 | qa | 对答案全面性和相关性的人工评估 | ELI5, ASQA | [ELI5 Dataset](https://facebookresearch.github.io/ELI5/) |
| RAG忠实度 | qa | 答案相对于检索上下文的准确性 | RAGAS, TruLens | [RAGAS Framework](https://github.com/explodinggradients/ragas) |
| RAG上下文相关性 | qa | 检索文档与查询的相关性 | MS MARCO, BEIR | [BEIR Benchmark](https://github.com/beir-cellar/beir) |
| RAG答案相关性 | qa | 生成答案与问题的相关性 | RAGAS benchmarks | [RAGAS Metrics](https://docs.ragas.io/en/latest/concepts/metrics/) |
| RAG上下文精确率 | qa | 用于答案生成的上下文检索精确率 | 自定义RAG数据集 | - |
| RAG上下文召回率 | qa | 用于全面答案的相关上下文召回率 | KILT, FEVER | [KILT Benchmark](https://github.com/facebookresearch/KILT) |
| RAG幻觉率 | qa | 包含无支持声明的答案百分比（使用TruthfulQA作为开放域代理指标） | RAGAS Hallucination子集, FAccT | [RAGAS Metrics](https://docs.ragas.io/en/latest/concepts/metrics/) |

## 端到端RAG基准测试

端到端RAG基准测试旨在评估从文档解析到问答生成的完整RAG系统性能。与单独评估各个组件不同，这个基准测试关注整个系统的协同工作效果，包括文档处理、索引构建、检索质量和答案生成的综合表现。

### 数据集创建具体规划

#### 数据集属性定义

创建高质量的端到端RAG基准测试数据集需要系统化的规划。以下是数据集创建的核心属性表：

| 属性名 | 说明 | 示例值 | 必需性 |
|--------|------|---------|---------|
| **dataset_id** | 唯一标识符 | excel-finance-v1 | 必需 |
| **format** | 文档格式 | Excel, PDF, Word, PPT, Image | 必需 |
| **quantity** | 文档数量 | 10, 50, 100 | 必需 |
| **domain** | 应用领域 | 金融/医疗/技术/法律/教育 | 必需 |
| **source** | 数据来源 | 公开数据集/企业数据/合成生成 | 必需 |
| **language** | 语言类型 | 中文/英文/日文/多语言混合 | 必需 |
| **complexity** | 复杂度等级 | 简单/中等/复杂 | 必需 |
| **size_range** | 文档规模 | 1-10页/10-50页/50+页 | 必需 |
| **qa_count** | QA对数量 | 100, 500, 1000 | 必需 |
| **qa_types** | 问答类型分布 | 事实检索(40%)/推理(30%)/计算(30%) | 必需 |
| **special_features** | 特殊元素 | 表格/图表/公式/扫描文档 | 可选 |
| **annotation_method** | 标注方式 | 人工标注/半自动/LLM辅助 | 必需 |
| **quality_level** | 质量等级 | 金标准/银标准/铜标准 | 必需 |
| **creation_date** | 创建日期 | 2024-01-15 | 必需 |
| **version** | 版本号 | v1, v2, v3 | 必需 |
| **priority** | 实施优先级 | P0(核心)/P1(重要)/P2(补充) | 必需 |

#### 数据集创建计划表

以下是第一阶段计划创建的具体数据集：

| dataset_id | format | quantity | domain | source | language | complexity | size_range | qa_count | qa_types | special_features | priority |
|------------|--------|----------|---------|---------|-----------|------------|------------|----------|----------|------------------|----------|
| excel-finance-v1 | Excel | 10 | 金融 | 企业财报 | 中文 | 简单 | 1-10页 | 100 | 查找(60%)<br>计算(40%) | 简单表格 | P0 |
| excel-finance-v2 | Excel | 30 | 金融 | 企业财报 | 中文 | 复杂 | 10-50页 | 300 | 查找(30%)<br>计算(40%)<br>推理(30%) | 公式、透视表 | P1 |
| pdf-ocr-v1 | PDF | 20 | 混合 | 扫描文档 | 中文 | 中等 | 1-10页 | 200 | 事实(70%)<br>推理(30%) | 需要OCR | P0 |
| pdf-mixed-v1 | PDF | 50 | 技术 | 技术文档 | 英文 | 复杂 | 10-50页 | 500 | 事实(40%)<br>推理(40%)<br>总结(20%) | 图表、代码 | P1 |
| word-contract-v1 | Word | 15 | 法律 | 合同模板 | 中文 | 中等 | 10-50页 | 150 | 条款查找(50%)<br>逻辑判断(50%) | 格式化文本 | P1 |
| ppt-report-v1 | PPT | 10 | 商业 | 公司报告 | 中英混合 | 简单 | 10-30页 | 100 | 要点提取(60%)<br>总结(40%) | 图表、动画标记 | P2 |
| image-chart-v1 | Image | 30 | 金融 | 统计图表 | 多语言 | 中等 | N/A | 300 | 数据读取(50%)<br>趋势分析(50%) | 柱状图、折线图 | P0 |
| multimodal-v1 | 混合 | 20 | 技术 | 产品文档 | 英文 | 复杂 | 20-100页 | 400 | 跨模态推理(60%)<br>综合分析(40%) | 图文结合 | P2 |

#### 数据集质量控制标准

| 质量维度 | 评估标准 | 目标值 | 验证方法 |
|----------|----------|---------|----------|
| **标注一致性** | 多人标注的Cohen's Kappa系数 | >0.85 | 随机抽取10%样本进行多人标注 |
| **答案准确性** | 答案可验证率 | 100% | 每个答案必须有明确的文档来源 |
| **覆盖完整性** | 文档关键内容的QA覆盖率 | >85% | 检查是否有重要内容未被问及 |
| **难度分布** | 简单:中等:困难的比例 | 3:5:2 | 基于模型测试结果动态调整 |
| **错误率** | 标注错误和歧义的比例 | <2% | 专家审查和自动化检查结合 |

#### 数据集特征统计

基准测试需要追踪的数据集特征：

| 名称 | 字段 | 描述 | 统计方法 |
|------|-------|-------------|----------|
| 文档类型覆盖度 | dataset | 测试集中包含的文档类型多样性 | 统计各格式文档数量和比例 |
| 文档复杂度分布 | dataset | 简单、中等、复杂文档的比例分布 | 基于页数、元素类型等自动分类 |
| 语言覆盖范围 | dataset | 支持的语言种类和多语言文档比例 | 语言检测工具统计 |
| 领域多样性 | dataset | 涵盖的业务领域数量 | 基于预定义领域分类统计 |
| 文档规模分布 | dataset | 不同大小文档的分布 | 统计页数或字符数分布 |
| 表格密度 | dataset | 包含表格的文档比例及每文档平均表格数 | 自动检测表格元素 |
| 图表复杂度 | dataset | 包含图表、公式、流程图等复杂元素的比例 | 元素类型检测和统计 |
| QA类型平衡度 | dataset | 各类问答类型的分布均衡程度 | 计算各类型占比的标准差 |
| 多跳推理比例 | dataset | 需要多步推理的问题占比 | 基于问题标注统计 |
| 答案长度分布 | dataset | 短、中、长答案的分布情况 | 按字符数自动分类统计 |

### 问答设计

问答设计决定了基准测试的深度和广度。良好的问答设计应该覆盖不同类型的认知任务和实际应用场景：

| 名称 | 字段 | 描述 | 已知数据集 | 已知排行榜 |
|------|-------|-------------|---------------|-------------------|
| 问题类型分布 | qa_design | 事实型、推理型、总结型、比较型问题的比例 | 均衡问题集 | - |
| 答案长度分布 | qa_design | 短答案（<50字）、中等答案（50-200字）、长答案（>200字）的比例 | 答案长度统计 | - |
| 证据跨度 | qa_design | 单文档、跨文档、需要外部知识的问题比例 | 多跳问答集 | - |
| 推理深度 | qa_design | 直接提取、单步推理、多步推理问题的分布 | 推理链数据集 | - |
| 数值计算要求 | qa_design | 需要数值计算、统计分析的问题比例 | 定量分析问题集 | - |
| 表格理解深度 | qa_design | 简单查找、跨行列分析、多表关联的问题分布 | 表格问答数据集 | - |
| 时间推理 | qa_design | 需要时间序列理解、事件顺序推理的问题比例 | 时序推理数据集 | - |
| 否定性问题 | qa_design | 包含否定判断、不存在性验证的问题比例 | 否定性问答集 | - |
| 歧义处理 | qa_design | 存在歧义需要澄清或多角度回答的问题比例 | 歧义问题集 | - |
| 答案验证难度 | qa_design | 答案可自动验证vs需要人工评估的比例 | 自动评估问题集 | - |
| 多跳问答比例 | qa_design | 需要跨越多个文档或知识源进行推理的问题占比 | HotpotQA, 2WikiMultiHopQA | [HotpotQA](https://hotpotqa.github.io/) |
| 多跳推理路径长度 | qa_design | 2跳、3跳、4跳及以上推理路径的问题分布 | ComplexWebQuestions | - |
| 跨模态推理 | qa_design | 需要结合文本、表格、图片等多模态信息的问题比例 | MultiModalQA | - |
| 视觉问答（VQA）准确率 | qa_design | 基于图片、图表、流程图的问题回答正确率 | DocVQA, ChartQA, InfographicVQA | [DocVQA Leaderboard](https://rrc.cvc.uab.es/?ch=17) |
| 图表数据提取 | qa_design | ChartQA使用EM/F1评估，PlotQA使用QA Accuracy + Chart Parsing F1 | ChartQA (EM/F1), PlotQA (Acc+F1) | [ChartQA](https://github.com/vis-nlp/ChartQA) |
| 流程图理解 | qa_design | 理解流程图逻辑关系和决策路径的问题正确率 | FigureQA-Flow子集 | - |
| 截图问答 | qa_design | 基于软件界面截图、网页截图的问答准确率 | ScreenQA (CVPR 2021), WebSRC | - |
| 图文关联推理 | qa_design | 需要同时理解图片内容和相关文本描述的问题比例 | TextVQA, OCR-VQA | [TextVQA](https://textvqa.org/) |
| 复杂图表推理 | qa_design | 需要多步骤分析复杂可视化（如热力图、散点图）的问题准确率 | FigureQA, DVQA | - |
| 知识图谱实体链接 | qa_design | 将问题中的实体正确链接到知识图谱的准确率 | WikiData5M-EL, DBpedia Spotlight | [DBpedia Spotlight](https://www.dbpedia-spotlight.org/) |
| 知识图谱关系推理 | qa_design | 基于图谱关系进行推理的问题正确率 | NELL-995, WN18RR | [Knowledge Graph Reasoning](https://paperswithcode.com/task/knowledge-graph-completion) |
| 知识图谱路径查询 | qa_design | 需要在图谱中查找特定路径的问题准确率 | PathQuestions, ComplexWebQuestions | - |
| SPARQL查询生成 | qa_design | 将自然语言转换为正确SPARQL查询的准确率 | LC-QuAD 2.0, QALD-9 | [QALD Challenge](https://www.qald.aksw.org/) |
| 知识图谱补全 | qa_design | 预测缺失实体或关系的问题准确率 | ConceptNet, DBpedia | [ConceptNet Numberbatch](https://github.com/commonsense/conceptnet-numberbatch) |
| 时序知识图谱推理 | qa_design | 涉及时间维度的知识图谱查询准确率 | ICEWS, GDELT | - |
| 多跳图谱推理 | qa_design | 需要多步图谱遍历的复杂推理问题比例 | MetaQA, WebQuestionsSP | [MetaQA](https://github.com/yuyuz/MetaQA) |
| 图谱与文本融合 | qa_design | 需要结合知识图谱和非结构化文本的问题准确率 | HybridQA, OTT-QA | [HybridQA](https://hybridqa.github.io/) |

## 数据集创建方法

创建端到端RAG基准测试数据集有两种主要方法：混合开放数据集和从零开始创建。每种方法都有其优势和挑战。

### 方法一：混合开放数据集（Mixed with Open Benchmarks）

这种方法通过整合和改造现有的开放数据集来构建RAG基准测试。

#### 实施步骤

1. **收集相关开放数据集**
   - 文档解析：PubLayNet, DocBank, TableBank, FUNSD
   - OCR：ICDAR系列, TextOCR, SROIE
   - 检索：MS MARCO, BEIR, Natural Questions
   - 问答：SQuAD, HotpotQA, MRQA, DocVQA
   - 表格：WikiTableQuestions, TabFact, HybridQA

2. **数据集整合策略**
   - 格式统一：将不同数据集转换为统一的JSONL格式
   - ID映射：建立跨数据集的文档和问题ID映射
   - 元数据补充：添加领域、语言、难度等标签

3. **适配RAG场景**
   - 文档重组：将独立段落组合成完整文档
   - 检索对齐：为问答数据添加检索标注
   - 多跳增强：基于单跳问题构造多跳推理链

4. **质量控制**
   - 去重处理：删除重复或高度相似的样本
   - 一致性检查：验证标注的一致性
   - 覆盖度分析：确保各类型任务的均衡分布

#### 优势

- **快速启动**：利用现有资源，减少初期投入
- **学术认可**：基于已被广泛接受的数据集
- **基准对比**：可与现有研究结果直接比较
- **多样性保证**：不同数据集带来天然的多样性

#### 挑战

- **整合复杂度**：不同数据集格式和标注体系差异大
- **场景缺失**：某些企业场景在开放数据集中缺失
- **版权限制**：部分数据集有使用限制
- **质量不一**：不同来源的数据质量参差不齐

### 方法二：从零开始创建（Create from Scratch）

这种方法完全基于实际需求设计和创建新的数据集。

#### 实施步骤

1. **需求分析与设计**
   - 场景定义：明确目标应用场景和用户需求
   - 指标映射：确保覆盖所有评估指标
   - 规模规划：确定各类数据的数量和比例

2. **文档收集与准备**
   - 真实文档：从企业或公开渠道收集
   - 合成文档：使用模板生成特定类型文档
   - 格式多样化：确保涵盖所有目标格式

3. **标注体系建立**
   - 标注指南：制定详细的标注规范
   - 标注工具：开发或选择合适的标注平台
   - 质量控制：多人标注、交叉验证

4. **问答生成**
   - 人工创建：领域专家设计高质量问答
   - 半自动生成：使用LLM辅助生成初稿
   - 多轮迭代：持续优化问题质量和多样性

5. **评估与迭代**
   - 基线测试：使用多个模型建立基线
   - 难度校准：根据模型表现调整难度分布
   - 持续更新：根据反馈改进数据集

#### 优势

- **完全可控**：数据质量、分布、场景完全可控
- **场景针对性**：可精确匹配目标应用场景
- **无版权问题**：完全拥有数据集的知识产权
- **创新空间**：可设计新的任务类型和评估维度

#### 挑战

- **成本高昂**：需要大量人力和时间投入
- **标注难度**：高质量标注需要专业知识
- **规模限制**：难以快速达到大规模
- **偏见风险**：可能引入创建者的偏见

### 方法比较

| 维度 | 混合开放数据集 | 从零开始创建 |
|------|---------------|--------------|
| **初始成本** | 低 - 主要是整合成本 | 高 - 需要大量人力 |
| **时间周期** | 短 - 几周到几个月 | 长 - 几个月到一年 |
| **质量控制** | 中等 - 受限于原始质量 | 高 - 完全可控 |
| **场景覆盖** | 部分 - 可能缺失特定场景 | 完整 - 可定制所需场景 |
| **可扩展性** | 好 - 可持续添加新数据集 | 中等 - 扩展成本较高 |
| **学术价值** | 高 - 易于对比和引用 | 中等 - 需要时间获得认可 |
| **商业适用** | 中等 - 可能不完全匹配 | 高 - 精确匹配业务需求 |
| **维护成本** | 低 - 主要跟踪上游更新 | 高 - 需要持续投入 |

### 混合策略建议

实践中，最佳方案往往是两种方法的结合：

1. **核心基础**：使用开放数据集作为基础，确保学术可比性
2. **场景补充**：针对缺失场景从零创建数据
3. **迭代优化**：基于实际使用反馈持续改进
4. **分阶段实施**：
   - 第一阶段：70%开放数据集 + 30%自建数据
   - 第二阶段：根据评估结果调整比例
   - 持续阶段：逐步增加自建数据比例

这种混合策略既能快速启动，又能确保数据集的实用性和创新性。

### 数据集创建原则

为确保数据集的完整性、实用性和可扩展性，应遵循以下核心原则：

#### 1. 文档格式全覆盖原则

**所有常见文档格式必须纳入数据集**，确保评估的全面性：

- **办公文档**：Word (.docx), Excel (.xlsx), PowerPoint (.pptx)
- **通用格式**：PDF (原生/扫描), 纯文本 (.txt), Markdown (.md)
- **网页格式**：HTML, XML, JSON
- **图像格式**：PNG, JPG, TIFF (包含文字的图片)
- **专业格式**：LaTeX, CAD图纸, 电子表格公式

**实施要点**：

- 每种格式至少包含100个样本
- 覆盖简单、中等、复杂三个难度级别
- 包含格式特有的元素（如Excel公式、PPT动画标记）

#### 2. 问答类型完整性原则

**所有类型的问答任务必须设计相应的数据集**，不能有遗漏：

**必须包含的问答类型**：

- **基础类型**
  - 事实检索（Factual Retrieval）
  - 是非判断（Yes/No Questions）
  - 多选题（Multiple Choice）
  
- **理解类型**
  - 文本理解（Reading Comprehension）
  - 表格分析（Table QA）
  - 图表解读（Chart QA）
  
- **推理类型**
  - 单步推理（Single-hop Reasoning）
  - 多跳推理（Multi-hop Reasoning）
  - 数值计算（Numerical Reasoning）
  - 逻辑推断（Logical Inference）
  
- **生成类型**
  - 摘要生成（Summarization）
  - 对比分析（Comparative Analysis）
  - 解释说明（Explanation）
  
- **特殊类型**
  - 时序推理（Temporal Reasoning）
  - 否定判断（Negation Handling）
  - 歧义消解（Ambiguity Resolution）

**实施要点**：

- 每种类型至少设计1000个问答对
- 确保答案有明确的评估标准
- 标注问题所需的推理步骤

#### 3. 增量构建原则

**数据集必须支持增量式构建**，实现以下核心目标：

- **快速迭代**：支持敏捷开发，快速验证新想法
- **模块化测试**：每个组件可独立测试，降低调试复杂度
- **开发协作**：团队成员可以独立开发和测试各自的小数据集，然后共享到统一目录
- **渐进式集成**：从小规模验证到大规模部署的平滑过渡

**开发场景示例**：

# 开发者A：专注于表格解析

- 创建 excel/v1-dev/ 测试基础表格解析
- 验证通过后，提交为 excel/v1/
- 其他开发者可以基于v1继续开发v2

# 开发者B：专注于OCR功能

- 创建 ocr/test-handwriting/ 测试手写识别
- 独立测试OCR模块，不影响其他组件
- 测试成功后，集成到 ocr/v3/

# 开发者C：专注于多跳推理

- 使用已有的 excel/v1/ 和 pdf/v1/
- 创建 qa/reasoning/multi-hop-test/
- 验证多文档推理功能

**版本化增量结构**：

```
refactored-benchmark/
├── documents/
│   ├── excel/
│   │   ├── v1/                    # 初始版本：基础Excel文件
│   │   │   └── basic_tables/      # 10-20个简单表格
│   │   ├── v2/                    # 增量版本：复杂表格
│   │   │   ├── v1/               # 包含v1所有内容
│   │   │   └── complex_tables/    # 新增20个复杂表格
│   │   └── v3/                    # 增量版本：多表关联
│   │       ├── v2/               # 包含v2所有内容
│   │       └── linked_tables/     # 新增跨表引用案例
│   │
│   ├── pdf/
│   │   ├── v1/                    # 纯文本PDF
│   │   ├── v2/                    # v1 + 表格PDF
│   │   └── v3/                    # v2 + 扫描PDF
│   │   └── ...
│   │
│   ├── image/
│   │   └── ...                    # 图片文档版本化
│   └── ...                        # 其他文档类型
│
├── parser/
│   ├── ocr/
│   │   ├── dataset-v1.jsonl      # 基础OCR测试集
│   │   ├── dataset-v2.jsonl      # v1 + 多语言OCR
│   │   ├── dataset-v3.jsonl      # v2 + 手写识别
│   │   ├── docs/
│   │   │   ├── v1/               # v1版本说明
│   │   │   ├── v2/               # v2新增特性
│   │   │   └── ...
│   │   └── results/
│   │       ├── v1/               # v1基线结果
│   │       ├── v2/               # v2评测结果
│   │       └── ...
│   │
│   ├── table-parser/
│   │   ├── dataset-v1.jsonl       # 简单表格解析
│   │   ├── dataset-v2.jsonl       # v1 + 复杂表格
│   │   └── ...
│   └── ...                        # 其他解析器
│
├── qa/
│   ├── table-qa/
│   │   ├── dataset-v1.jsonl      # 简单查找（100问）
│   │   ├── dataset-v2.jsonl      # v1 + 聚合计算（200问）
│   │   ├── dataset-v3.jsonl      # v2 + 多表推理（500问）
│   │   ├── spec-v1.json          # v1评测规范
│   │   ├── spec-v2.json          # v2评测规范
│   │   └── ...
│   │
│   ├── reasoning/
│   │   ├── dataset-v1.jsonl      # 单步推理
│   │   ├── dataset-v2.jsonl      # v1 + 多跳推理
│   │   └── ...
│   │
│   ├── multimodal-qa/
│   │   └── ...
│   └── ...                        # 其他QA类型
│
├── retrieve/
│   ├── sparse/
│   │   ├── dataset-v1.jsonl       # BM25基础
│   │   ├── dataset-v2.jsonl       # v1 + TF-IDF
│   │   └── ...
│   └── ...                        # 其他检索方式
│
└── dev/                           # 开发测试目录
    ├── README.md                  # 开发指南
    ├── test-excel-formulas/       # 测试Excel公式解析
    │   ├── docs/                  # 测试文档
    │   └── qa/                    # 测试问题
    ├── test-ocr-quality/          # 测试OCR质量
    └── test-multi-hop/            # 测试多跳推理
```

**版本化增量策略**：

1. **版本规划原则**
   - **v1**：最小可行数据集（MVP），快速验证基本功能
   - **v2**：增加复杂度和规模，覆盖常见场景
   - **v3**：全面覆盖，包含边缘案例和高难度样本
   - **v4+**：持续优化，根据实际反馈迭代

2. **版本间关系**
   - 每个新版本完全包含前一版本内容（累积式）
   - 新版本标注文件记录增量内容
   - 保持数据ID稳定，便于追踪变化

3. **版本化实施示例（以表格RAG为例）**

   ```
   v1: 基础表格查找
   - documents/excel/v1/: 10个简单Excel（单表，规整数据）
   - qa/table-qa/dataset-v1.jsonl: 100个查找型问题
   - 目标：验证表格解析和简单检索
   
   v2: 增加表格复杂度  
   - 包含v1所有内容 + 20个复杂Excel（公式、多表）
   - 包含v1所有问题 + 200个计算型问题
   - 目标：测试数值计算和公式理解
   
   v3+: 持续增强...
   ```

4. **快速启动指南**
   - 选择一个垂直领域（如table-qa）
   - 从v1开始，10个文档 + 100个问题
   - 运行完整流程，建立基线
   - 根据结果决定v2的增强方向

5. **开发协作机制**

   ```
   # 开发分支管理
   refactored-benchmark/
   ├── dev/                          # 开发测试区
   │   ├── user1-ocr-test/          # 个人测试数据集
   │   ├── user2-table-qa/          # 个人测试数据集
   │   └── shared-test-v0.1/        # 共享测试集
   │
   ├── staging/                      # 预发布区
   │   └── v2-candidate/            # 准备合并到v2的数据
   │
   └── release/                      # 正式发布
       ├── v1/                      # 稳定版本
       └── v2/                      # 稳定版本
   ```

   **协作流程**：
   - 开发者在 `dev/` 目录创建个人测试集
   - 测试通过后，提交到 `staging/` 进行集成测试
   - 集成测试通过后，合并到 `release/` 正式版本
   - 支持多人并行开发不同模块

**实施建议**：

- 每个版本都应有明确的changelog
- 提供版本间的性能对比报告
- 支持指定版本运行：`python run.py --version v2`
- 维护版本兼容性矩阵
- 建立代码审查机制，确保数据质量
- 使用Git进行版本控制，便于追踪变更

#### 4. 实用性优先原则

**数据集设计必须贴近实际应用场景**：

- 包含真实世界的文档缺陷（如扫描倾斜、水印、噪点）
- 设计符合实际使用的问题（如"查找上季度销售额"而非"第3段第2句是什么"）
- 考虑多语言混合、专业术语、缩写等实际情况

#### 5. 可评估性原则

**每个数据点都必须有明确的评估方法**：

- 提供标准答案和可接受的答案变体
- 对于开放性问题，提供评估要点和打分标准
- 记录答案来源，支持溯源验证

遵循这些原则，可以构建一个既全面又实用、既标准又灵活的端到端RAG基准测试数据集。

### 候选集设计（Candidate Set Design）

#### 候选集的核心目的

**候选集的主要作用是将小规模测试数据扩展到指定规模，以评估系统在真实大规模环境下的性能。**

**典型场景**：

```
实际测试数据：10个文档 + 100个QA
目标测试规模：1,000个文档
需要候选集：990个补充文档

实际测试数据：50个文档 + 500个QA  
目标测试规模：10,000个文档
需要候选集：9,950个补充文档
```

#### 为什么需要候选集

1. **真实性能评估**：10个文档中检索的准确率与10,000个文档中检索的准确率完全不同
2. **规模可扩展性**：测试系统在不同规模下的性能退化情况
3. **噪音鲁棒性**：评估系统在大量无关文档中找到答案的能力
4. **标准化对比**：确保不同系统在相同规模下进行公平比较

#### 候选集构建原则

1. **标准规模设置**

   ```
   标准测试规模：
   - 小规模：1,000 文档（快速验证）
   - 中规模：10,000 文档（标准评测）
   - 大规模：100,000 文档（压力测试）
   
   规模选择依据：
   - 开发阶段：使用1K快速迭代
   - 集成测试：使用10K标准评测
   - 发布前：使用100K压力测试
   ```

2. **补充文档选择策略**

   ```
   候选集 = 核心测试文档 + 补充文档
   
   补充文档来源：
   - 同领域文档（30-40%）：增加检索难度
   - 相关主题文档（20-30%）：测试区分能力
   - 通用文档库（30-50%）：模拟真实噪音
   ```

3. **候选集结构示例**

   ```
   refactored-benchmark/
   ├── test-data/                     # 核心测试数据
   │   ├── excel-qa-v1/              # 10个Excel + 100个QA
   │   ├── pdf-ocr-v1/               # 20个PDF + 200个QA
   │   └── ...
   │
   ├── candidate-pool/                # 补充文档池
   │   ├── general/                  # 通用文档（Wikipedia、新闻等）
   │   ├── domain/                   # 领域文档（金融、医疗、技术）
   │   └── similar/                  # 相似文档（同类型但不含答案）
   │
   └── evaluation-sets/               # 预构建的评测集
       ├── excel-qa-1k/              # Excel QA + 990个补充文档
       │   ├── config.json           # 配置：指定使用哪些测试数据
       │   ├── doc-list.txt          # 1000个文档的完整列表
       │   └── qa-mapping.json       # QA与文档的对应关系
       │
       ├── excel-qa-10k/             # Excel QA + 9,990个补充文档
       └── full-test-100k/           # 所有测试数据 + 补充到100K
   ```

   **使用示例**：

   ```bash
   # 在1K规模下测试Excel QA
   python evaluate.py --test excel-qa-v1 --scale 1k
   
   # 系统自动：
   # 1. 加载 test-data/excel-qa-v1/ 的10个文档和100个QA
   # 2. 从 candidate-pool/ 随机选择990个补充文档
   # 3. 在1000个文档中进行检索和问答测试
   ```

4. **动态构建与静态构建**

   **静态候选集**（推荐用于标准评测）：
   - 预先构建，确保可重复性
   - 包含固定的文档ID映射
   - 提供完整的相关性标注

   **动态候选集**（用于鲁棒性测试）：
   - 运行时随机采样
   - 可调整干扰文档比例
   - 支持不同难度级别

5. **候选集质量控制**

   ```json
   {
     "candidate_set_id": "cs_v1_10k",
     "total_documents": 10000,
     "statistics": {
       "relevant_docs": 150,
       "topic_distractors": 1500,
       "domain_distractors": 3500,
       "noise_docs": 4850
     },
     "quality_metrics": {
       "relevance_distribution": "balanced",
       "difficulty_score": 0.75,
       "topic_coverage": ["finance", "tech", "medical"],
       "language_distribution": {"en": 0.6, "zh": 0.3, "ja": 0.1}
     },
     "validation": {
       "human_verified": true,
       "inter_annotator_agreement": 0.92
     }
   }
   ```

#### 候选集使用指南

1. **基本使用流程**

   ```python
   # 步骤1：选择核心测试集
   test_docs = load_test_data("excel-qa-v1")  # 10个文档
   test_qa = load_qa_pairs("excel-qa-v1")     # 100个QA
   
   # 步骤2：扩展到目标规模
   full_docs = expand_with_candidates(
       core_docs=test_docs,
       target_size=10000,      # 目标10K规模
       candidate_pool="domain" # 使用领域相关文档
   )
   
   # 步骤3：评测
   results = evaluate_rag(
       documents=full_docs,    # 10,000个文档
       questions=test_qa,      # 100个QA（仅针对10个核心文档）
       metrics=["recall@10", "mrr", "latency"]
   )
   ```

2. **性能对比测试**

   ```bash
   # 同一测试集在不同规模下的表现
   python evaluate.py --test excel-qa-v1 --scale 1k    # 99%准确率
   python evaluate.py --test excel-qa-v1 --scale 10k   # 92%准确率
   python evaluate.py --test excel-qa-v1 --scale 100k  # 85%准确率
   
   # 生成性能退化曲线
   python analyze.py --plot performance-vs-scale
   ```

#### 候选集评估指标

| 指标 | 描述 | 计算方法 |
|------|------|----------|
| **检索召回率@K** | 前K个结果中包含相关文档的比例 | Recall@K = 相关文档命中数 / 总相关文档数 |
| **检索精确率@K** | 前K个结果中相关文档的比例 | Precision@K = 相关文档数 / K |
| **首位命中率** | 第一个结果即为相关文档的比例 | MRR = 1 / 第一个相关文档的排名 |
| **噪音鲁棒性** | 随噪音文档增加的性能下降率 | 性能下降% = (基准性能 - 噪音性能) / 基准性能 |

#### 候选集的价值

通过候选集机制，我们可以：

- **控制变量**：保持测试QA不变，只改变文档规模，准确评估规模对性能的影响
- **快速扩展**：无需为每个规模创建新的QA，大幅降低数据集创建成本
- **真实模拟**：在接近生产环境的规模下测试，避免"玩具数据集"的误导
- **公平对比**：所有系统在相同规模下竞争，确保评测结果的可比性

简而言之，候选集让我们能够用少量高质量的测试数据，评估系统在大规模真实场景下的表现。
