import React, { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { ProductivityDashboard } from '@/pages/ProductivityDashboard';
import { DocumentParsing } from '@/pages/DocumentParsing';
import { DataUnlocking } from '@/pages/DataUnlocking';
import { useMetricsStore } from '@/store/useMetricsStore';
import type { PageRoute } from '@/types/metrics';

function QAMetricsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">问答功能模块</h1>
      <p className="text-muted-foreground">问答功能指标展示页面（开发中...）</p>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">系统设置</h1>
      <p className="text-muted-foreground">系统配置与设置页面（开发中...）</p>
    </div>
  );
}

function App() {
  const { currentPage, dashboardConfig } = useMetricsStore();

  // 应用主题
  useEffect(() => {
    if (dashboardConfig.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dashboardConfig.theme]);

  // 根据当前页面渲染对应组件
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'productivity':
        return <ProductivityDashboard />;
      case 'document-parsing':
        return <DocumentParsing />;
      case 'data-unlocking':
        return <DataUnlocking />;
      case 'qa-metrics':
        return <QAMetricsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;
