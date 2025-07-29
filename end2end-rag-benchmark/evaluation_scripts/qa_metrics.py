#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
End-to-End RAG Benchmark QA Evaluation Script

This script provides evaluation metrics for question-answering tasks including:
- Exact Match (EM)
- F1 Score
- ROUGE Scores
- Multi-hop Reasoning Accuracy
- Answer Attribution Accuracy
"""

import json
import argparse
from typing import Dict, List, Tuple, Any
from collections import Counter
import numpy as np
from dataclasses import dataclass


@dataclass
class QAMetrics:
    """Container for QA evaluation metrics"""
    exact_match: float
    f1_score: float
    rouge_1: float
    rouge_2: float
    rouge_l: float
    multi_hop_accuracy: float = 0.0
    attribution_accuracy: float = 0.0


def normalize_answer(s: str) -> str:
    """Normalize answer string for comparison"""
    # Convert to lowercase
    s = s.lower()
    # Remove punctuation
    s = ''.join(c for c in s if c.isalnum() or c.isspace())
    # Remove extra whitespace
    s = ' '.join(s.split())
    return s


def compute_exact_match(prediction: str, ground_truth: str, alternatives: List[str] = None) -> float:
    """
    Compute exact match score
    
    Args:
        prediction: Predicted answer
        ground_truth: Ground truth answer
        alternatives: List of acceptable alternative answers
        
    Returns:
        1.0 if match found, 0.0 otherwise
    """
    pred_norm = normalize_answer(prediction)
    truth_norm = normalize_answer(ground_truth)
    
    if pred_norm == truth_norm:
        return 1.0
    
    if alternatives:
        for alt in alternatives:
            if pred_norm == normalize_answer(alt):
                return 1.0
    
    return 0.0


def compute_f1_score(prediction: str, ground_truth: str) -> float:
    """
    Compute token-level F1 score
    
    Args:
        prediction: Predicted answer
        ground_truth: Ground truth answer
        
    Returns:
        F1 score between 0 and 1
    """
    pred_tokens = normalize_answer(prediction).split()
    truth_tokens = normalize_answer(ground_truth).split()
    
    if not pred_tokens or not truth_tokens:
        return 0.0
    
    common = Counter(pred_tokens) & Counter(truth_tokens)
    num_common = sum(common.values())
    
    if num_common == 0:
        return 0.0
    
    precision = num_common / len(pred_tokens)
    recall = num_common / len(truth_tokens)
    f1 = 2 * (precision * recall) / (precision + recall)
    
    return f1


def compute_rouge_scores(prediction: str, ground_truth: str) -> Dict[str, float]:
    """
    Compute ROUGE scores (simplified version)
    
    Args:
        prediction: Predicted answer
        ground_truth: Ground truth answer
        
    Returns:
        Dictionary with ROUGE-1, ROUGE-2, and ROUGE-L scores
    """
    def get_ngrams(text: str, n: int) -> List[str]:
        tokens = normalize_answer(text).split()
        return [' '.join(tokens[i:i+n]) for i in range(len(tokens)-n+1)]
    
    def lcs_length(s1: List[str], s2: List[str]) -> int:
        m, n = len(s1), len(s2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if s1[i-1] == s2[j-1]:
                    dp[i][j] = dp[i-1][j-1] + 1
                else:
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1])
        
        return dp[m][n]
    
    # ROUGE-1 (unigram overlap)
    pred_1grams = set(get_ngrams(prediction, 1))
    truth_1grams = set(get_ngrams(ground_truth, 1))
    if truth_1grams:
        rouge_1 = len(pred_1grams & truth_1grams) / len(truth_1grams)
    else:
        rouge_1 = 0.0
    
    # ROUGE-2 (bigram overlap)
    pred_2grams = set(get_ngrams(prediction, 2))
    truth_2grams = set(get_ngrams(ground_truth, 2))
    if truth_2grams:
        rouge_2 = len(pred_2grams & truth_2grams) / len(truth_2grams)
    else:
        rouge_2 = 0.0
    
    # ROUGE-L (longest common subsequence)
    pred_tokens = normalize_answer(prediction).split()
    truth_tokens = normalize_answer(ground_truth).split()
    if truth_tokens:
        lcs_len = lcs_length(pred_tokens, truth_tokens)
        rouge_l = lcs_len / len(truth_tokens)
    else:
        rouge_l = 0.0
    
    return {
        'rouge_1': rouge_1,
        'rouge_2': rouge_2,
        'rouge_l': rouge_l
    }


def evaluate_multi_hop_reasoning(
    prediction: str,
    ground_truth: str,
    reasoning_steps: List[str],
    predicted_steps: List[str] = None
) -> float:
    """
    Evaluate multi-hop reasoning accuracy
    
    Args:
        prediction: Final predicted answer
        ground_truth: Ground truth answer
        reasoning_steps: Expected reasoning steps
        predicted_steps: Predicted reasoning steps (if available)
        
    Returns:
        Score between 0 and 1
    """
    # First check if final answer is correct
    answer_score = compute_exact_match(prediction, ground_truth)
    
    if not predicted_steps or not reasoning_steps:
        return answer_score
    
    # Evaluate reasoning path similarity
    step_scores = []
    for expected_step in reasoning_steps:
        step_found = False
        for pred_step in predicted_steps:
            if compute_f1_score(pred_step, expected_step) > 0.5:
                step_found = True
                break
        step_scores.append(1.0 if step_found else 0.0)
    
    reasoning_score = np.mean(step_scores) if step_scores else 0.0
    
    # Combine answer and reasoning scores
    return 0.7 * answer_score + 0.3 * reasoning_score


def evaluate_answer_attribution(
    prediction: str,
    evidence: Dict[str, List[str]],
    predicted_sources: List[str] = None
) -> float:
    """
    Evaluate answer attribution accuracy
    
    Args:
        prediction: Predicted answer
        evidence: Expected evidence sources
        predicted_sources: Predicted source citations
        
    Returns:
        Attribution accuracy score
    """
    if not predicted_sources:
        return 0.0
    
    expected_sources = set()
    for source_type, sources in evidence.items():
        expected_sources.update(sources)
    
    if not expected_sources:
        return 1.0 if not predicted_sources else 0.0
    
    correct_attributions = len(set(predicted_sources) & expected_sources)
    precision = correct_attributions / len(predicted_sources) if predicted_sources else 0.0
    recall = correct_attributions / len(expected_sources)
    
    if precision + recall == 0:
        return 0.0
    
    return 2 * (precision * recall) / (precision + recall)


def evaluate_qa_dataset(
    predictions_file: str,
    ground_truth_file: str,
    output_file: str = None
) -> Dict[str, Any]:
    """
    Evaluate QA predictions against ground truth
    
    Args:
        predictions_file: Path to predictions JSON file
        ground_truth_file: Path to ground truth JSON file
        output_file: Optional path to save detailed results
        
    Returns:
        Dictionary with aggregated metrics
    """
    # Load data
    with open(predictions_file, 'r', encoding='utf-8') as f:
        predictions = json.load(f)
    
    with open(ground_truth_file, 'r', encoding='utf-8') as f:
        ground_truth = json.load(f)
    
    # Evaluate each QA pair
    results = []
    metrics_by_type = {}
    
    for qa in ground_truth['qa_pairs']:
        qa_id = qa['qa_id']
        
        if qa_id not in predictions:
            continue
        
        pred = predictions[qa_id]
        
        # Compute metrics
        em_score = compute_exact_match(
            pred['answer'],
            qa['answer'],
            qa.get('alternative_answers', [])
        )
        
        f1_score = compute_f1_score(pred['answer'], qa['answer'])
        
        rouge_scores = compute_rouge_scores(pred['answer'], qa['answer'])
        
        # Multi-hop reasoning (if applicable)
        multi_hop_score = 0.0
        if qa.get('reasoning_steps'):
            multi_hop_score = evaluate_multi_hop_reasoning(
                pred['answer'],
                qa['answer'],
                qa['reasoning_steps'],
                pred.get('reasoning_steps')
            )
        
        # Answer attribution (if applicable)
        attribution_score = 0.0
        if 'predicted_sources' in pred:
            attribution_score = evaluate_answer_attribution(
                pred['answer'],
                qa.get('evidence', {}),
                pred['predicted_sources']
            )
        
        result = {
            'qa_id': qa_id,
            'question_type': qa['question_type'],
            'exact_match': em_score,
            'f1_score': f1_score,
            **rouge_scores,
            'multi_hop_accuracy': multi_hop_score,
            'attribution_accuracy': attribution_score
        }
        
        results.append(result)
        
        # Aggregate by question type
        q_type = qa['question_type']
        if q_type not in metrics_by_type:
            metrics_by_type[q_type] = []
        metrics_by_type[q_type].append(result)
    
    # Compute aggregated metrics
    aggregated = {
        'total_questions': len(results),
        'overall_metrics': {
            'exact_match': np.mean([r['exact_match'] for r in results]),
            'f1_score': np.mean([r['f1_score'] for r in results]),
            'rouge_1': np.mean([r['rouge_1'] for r in results]),
            'rouge_2': np.mean([r['rouge_2'] for r in results]),
            'rouge_l': np.mean([r['rouge_l'] for r in results])
        },
        'metrics_by_type': {}
    }
    
    # Add multi-hop and attribution metrics if present
    multi_hop_results = [r for r in results if r['multi_hop_accuracy'] > 0]
    if multi_hop_results:
        aggregated['overall_metrics']['multi_hop_accuracy'] = np.mean(
            [r['multi_hop_accuracy'] for r in multi_hop_results]
        )
    
    attribution_results = [r for r in results if r['attribution_accuracy'] > 0]
    if attribution_results:
        aggregated['overall_metrics']['attribution_accuracy'] = np.mean(
            [r['attribution_accuracy'] for r in attribution_results]
        )
    
    # Compute metrics by question type
    for q_type, type_results in metrics_by_type.items():
        aggregated['metrics_by_type'][q_type] = {
            'count': len(type_results),
            'exact_match': np.mean([r['exact_match'] for r in type_results]),
            'f1_score': np.mean([r['f1_score'] for r in type_results]),
            'rouge_1': np.mean([r['rouge_1'] for r in type_results]),
            'rouge_2': np.mean([r['rouge_2'] for r in type_results]),
            'rouge_l': np.mean([r['rouge_l'] for r in type_results])
        }
    
    # Save detailed results if requested
    if output_file:
        output_data = {
            'aggregated_metrics': aggregated,
            'detailed_results': results
        }
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=2)
    
    return aggregated


def main():
    parser = argparse.ArgumentParser(
        description='Evaluate QA predictions for End-to-End RAG Benchmark'
    )
    parser.add_argument(
        '--predictions',
        required=True,
        help='Path to predictions JSON file'
    )
    parser.add_argument(
        '--ground-truth',
        required=True,
        help='Path to ground truth JSON file'
    )
    parser.add_argument(
        '--output',
        help='Path to save detailed results (optional)'
    )
    
    args = parser.parse_args()
    
    results = evaluate_qa_dataset(
        args.predictions,
        args.ground_truth,
        args.output
    )
    
    # Print results
    print("\n=== End-to-End RAG QA Evaluation Results ===\n")
    
    print(f"Total Questions Evaluated: {results['total_questions']}")
    print("\nOverall Metrics:")
    for metric, value in results['overall_metrics'].items():
        print(f"  {metric}: {value:.3f}")
    
    print("\nMetrics by Question Type:")
    for q_type, metrics in results['metrics_by_type'].items():
        print(f"\n  {q_type} (n={metrics['count']}):")
        for metric, value in metrics.items():
            if metric != 'count':
                print(f"    {metric}: {value:.3f}")


if __name__ == '__main__':
    main()