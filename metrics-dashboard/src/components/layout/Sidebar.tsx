import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  FileText, 
  Database, 
  MessageSquare, 
  Settings, 
  Home,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/utils';
import { useMetricsStore } from '@/store/useMetricsStore';
import type { PageRoute } from '@/types/metrics';

interface NavigationItem {
  id: PageRoute;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: '总览仪表盘',
    icon: <Home className="w-5 h-5" />,
    description: '系统整体指标概览'
  },
  {
    id: 'document-parsing',
    label: '文档解析',
    icon: <FileText className="w-5 h-5" />,
    description: '文档解析功能指标'
  },
  {
    id: 'data-unlocking',
    label: '数据解锁',
    icon: <Database className="w-5 h-5" />,
    description: '向量库与知识图谱指标'
  },
  {
    id: 'qa-metrics',
    label: '问答功能',
    icon: <MessageSquare className="w-5 h-5" />,
    description: '问答系统性能指标'
  },
  {
    id: 'settings',
    label: '设置',
    icon: <Settings className="w-5 h-5" />,
    description: '系统配置与设置'
  }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { 
    currentPage, 
    sidebarOpen, 
    moduleStatuses,
    setCurrentPage, 
    toggleSidebar 
  } = useMetricsStore();

  const sidebarVariants = {
    open: { 
      width: '260px',
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    closed: { 
      width: '64px',
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  const getModuleStatus = (pageId: PageRoute) => {
    const statusMap: Record<string, string> = {
      'document-parsing': '文档解析',
      'data-unlocking': '数据解锁',
      'qa-metrics': '问答功能'
    };
    
    const moduleName = statusMap[pageId];
    if (!moduleName) return null;
    
    return moduleStatuses.find(status => status.name === moduleName);
  };

  const getStatusColor = (status?: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={sidebarOpen ? 'open' : 'closed'}
      className={cn(
        'h-screen bg-card border-r border-border flex flex-col flex-shrink-0',
        'fixed left-0 top-0 z-40 lg:relative lg:z-0',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <motion.div
          initial={false}
          animate={{ opacity: sidebarOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center space-x-3"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="font-semibold text-foreground">指标监控</h1>
              <p className="text-xs text-muted-foreground">网格系统</p>
            </div>
          )}
        </motion.div>
        
        <button
          onClick={toggleSidebar}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-accent transition-colors"
        >
          {sidebarOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navigationItems.map((item) => {
          const isActive = currentPage === item.id;
          const moduleStatus = getModuleStatus(item.id);
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                'w-full flex items-center p-3 rounded-lg transition-all duration-200',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="relative flex-shrink-0">
                  {item.icon}
                  {moduleStatus && (
                    <div 
                      className={cn(
                        'absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background',
                        getStatusColor(moduleStatus.status)
                      )}
                    />
                  )}
                </div>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    opacity: sidebarOpen ? 1 : 0,
                    x: sidebarOpen ? 0 : -10
                  }}
                  transition={{ duration: 0.2 }}
                  className="min-w-0 flex-1 text-left overflow-hidden"
                >
                  {sidebarOpen && (
                    <>
                      <div className="font-medium text-sm line-clamp-1">
                        {item.label}
                      </div>
                      <div className="text-xs opacity-75 line-clamp-1 mt-0.5">
                        {item.description}
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <motion.div
        initial={false}
        animate={{ opacity: sidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="p-4 border-t border-border"
      >
        {sidebarOpen && (
          <div className="text-center">
            <div className="text-xs text-muted-foreground">
              网格系统测试指标
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              v1.0.0
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}