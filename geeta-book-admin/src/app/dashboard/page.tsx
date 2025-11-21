'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { getAnalytics } from '@/lib/api';
import { BookOpen, FileText, Activity, Users } from 'lucide-react';

interface Stats {
  totalChapters: number;
  totalVerses: number;
  totalActivities: number;
  totalUsers: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalChapters: 0,
    totalVerses: 0,
    totalActivities: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getAnalytics();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Chapters',
      value: stats.totalChapters,
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Verses',
      value: stats.totalVerses,
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      title: 'Total Activities',
      value: stats.totalActivities,
      icon: Activity,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-orange-500',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome to Bhagavad Geeta Admin Panel</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-pulse">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {card.value}
                      </p>
                    </div>
                    <div className={`${card.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a
                href="/dashboard/chapters"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900">Manage Chapters</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Add, edit, or delete chapters
                </p>
              </a>
              <a
                href="/dashboard/verses"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900">Manage Verses</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Add, edit, or delete verses
                </p>
              </a>
              <a
                href="/dashboard/activities"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900">Manage Activities</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Add, edit, or delete activities
                </p>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">System Online</p>
                  <p className="text-xs text-gray-600">Admin dashboard is running</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Database Connected</p>
                  <p className="text-xs text-gray-600">MongoDB connection active</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">API Operational</p>
                  <p className="text-xs text-gray-600">All endpoints responding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
