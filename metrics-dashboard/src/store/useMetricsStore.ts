import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  OverallMetrics, 
  DashboardConfig, 
  PageRoute, 
  ModuleStatus,
  MetricTrendData 
} from '@/types/metrics';
import { 
  generateOverallMetrics, 
  generateTrendData 
} from '@/data/mockData';

interface MetricsState {
  // 数据状态
  metrics: OverallMetrics | null;
  trendData: Record<string, MetricTrendData>;
  moduleStatuses: ModuleStatus[];
  lastUpdated: Date | null;
  loading: boolean;
  error: string | null;
  
  // UI状态
  currentPage: PageRoute;
  dashboardConfig: DashboardConfig;
  sidebarOpen: boolean;
  
  // 操作方法
  loadMetrics: () => Promise<void>;
  refreshMetrics: () => Promise<void>;
  updateTrendData: (metricName: string) => void;
  setCurrentPage: (page: PageRoute) => void;
  updateDashboardConfig: (config: Partial<DashboardConfig>) => void;
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// 默认仪表盘配置
const defaultDashboardConfig: DashboardConfig = {
  refreshInterval: 30000, // 30秒
  theme: 'light',
  selectedMetrics: [
    'textExtractionAccuracy',
    'tableDetectionRecall',
    'queryLatency',
    'qaAccuracy',
    'overallScore'
  ],
  chartTypes: {
    textExtractionAccuracy: 'gauge',
    tableDetectionRecall: 'bar',
    queryLatency: 'line',
    qaAccuracy: 'radar',
    overallScore: 'gauge'
  }
};

// 生成模块状态
function generateModuleStatuses(): ModuleStatus[] {
  const modules = [
    { name: '文档解析', key: 'documentParsing' },
    { name: '数据解锁', key: 'dataUnlocking' },
    { name: '问答功能', key: 'qaMetrics' }
  ];
  
  return modules.map(module => ({
    name: module.name,
    status: (['healthy', 'warning', 'critical'] as const)[Math.floor(Math.random() * 3)],
    score: Math.random() * 0.3 + 0.7, // 0.7-1.0
    lastUpdated: new Date()
  }));
}

// 模拟API延迟
const simulateApiDelay = (ms: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms));

export const useMetricsStore = create<MetricsState>()(
  persist(
    (set, get) => ({
      // 初始状态
      metrics: null,
      trendData: {},
      moduleStatuses: [],
      lastUpdated: null,
      loading: false,
      error: null,
      
      currentPage: 'dashboard',
      dashboardConfig: defaultDashboardConfig,
      sidebarOpen: false,
      
      // 加载指标数据
      loadMetrics: async () => {
        const state = get();
        if (state.loading) return;
        
        set({ loading: true, error: null });
        
        try {
          await simulateApiDelay(800);
          const metrics = generateOverallMetrics();
          const moduleStatuses = generateModuleStatuses();
          
          // 生成一些默认的趋势数据
          const trendData: Record<string, MetricTrendData> = {};
          const trendMetrics = [
            'textExtractionAccuracy',
            'tableDetectionRecall', 
            'queryLatency',
            'qaAccuracy',
            'overallScore'
          ];
          
          trendMetrics.forEach(metricName => {
            trendData[metricName] = generateTrendData(metricName);
          });
          
          set({
            metrics,
            trendData,
            moduleStatuses,
            lastUpdated: new Date(),
            loading: false
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : '加载数据时出现错误',
            loading: false
          });
        }
      },
      
      // 刷新指标数据
      refreshMetrics: async () => {
        const { loadMetrics } = get();
        await loadMetrics();
      },
      
      // 更新趋势数据
      updateTrendData: (metricName: string) => {
        const newTrendData = generateTrendData(metricName);
        set(state => ({
          trendData: {
            ...state.trendData,
            [metricName]: newTrendData
          }
        }));
      },
      
      // 设置当前页面
      setCurrentPage: (page: PageRoute) => {
        set({ currentPage: page });
      },
      
      // 更新仪表盘配置
      updateDashboardConfig: (config: Partial<DashboardConfig>) => {
        set(state => ({
          dashboardConfig: {
            ...state.dashboardConfig,
            ...config
          }
        }));
      },
      
      // 切换侧边栏
      toggleSidebar: () => {
        set(state => ({ sidebarOpen: !state.sidebarOpen }));
      },
      
      // 设置加载状态
      setLoading: (loading: boolean) => {
        set({ loading });
      },
      
      // 设置错误状态
      setError: (error: string | null) => {
        set({ error });
      }
    }),
    {
      name: 'metrics-dashboard-storage',
      partialize: (state) => ({
        dashboardConfig: state.dashboardConfig,
        currentPage: state.currentPage
      })
    }
  )
);

// 自动刷新 hook
export function useAutoRefresh() {
  const { refreshMetrics, dashboardConfig } = useMetricsStore();
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      refreshMetrics();
    }, dashboardConfig.refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshMetrics, dashboardConfig.refreshInterval]);
}

// 导入 React 用于 useEffect
import React from 'react';