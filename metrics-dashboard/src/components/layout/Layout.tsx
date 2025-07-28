import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useMetricsStore } from '@/store/useMetricsStore';
import { cn } from '@/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { 
    sidebarOpen, 
    loading, 
    error,
    loadMetrics,
    setError 
  } = useMetricsStore();

  // 初始化加载数据
  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  // 全局错误处理
  const handleErrorDismiss = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* 侧边栏 */}
        <Sidebar />
        
        {/* 移动端遮罩层 */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-30 lg:hidden"
              onClick={() => useMetricsStore.getState().toggleSidebar()}
            />
          )}
        </AnimatePresence>

        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {/* 顶部导航 */}
          <Header />
          
          {/* 主内容 */}
          <main className="flex-1 relative overflow-auto">
            {/* 错误提示 */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50"
                >
                  <div className="bg-destructive text-destructive-foreground px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3">
                    <div className="font-medium">错误</div>
                    <div>{error}</div>
                    <button
                      onClick={handleErrorDismiss}
                      className="ml-4 text-destructive-foreground/80 hover:text-destructive-foreground"
                    >
                      ✕
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 加载状态覆盖层 */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center"
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 1, 
                        repeat: Infinity, 
                        ease: 'linear' 
                      }}
                      className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                    />
                    <div className="text-foreground font-medium">
                      加载中...
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 页面内容 */}
            <motion.div
              key={useMetricsStore.getState().currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}

// 页面容器组件
interface PageContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ 
  title, 
  description, 
  children, 
  className 
}: PageContainerProps) {
  return (
    <div className={cn('px-12 py-10 md:px-20 md:py-14 lg:px-32 lg:py-20', className)}>
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 line-clamp-2">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground text-base md:text-lg line-clamp-2">
              {description}
            </p>
          )}
        </motion.div>

        {/* 页面内容 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full overflow-hidden"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}