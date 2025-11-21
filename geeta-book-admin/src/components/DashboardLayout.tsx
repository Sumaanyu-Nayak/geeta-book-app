'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Activity, 
  BarChart3, 
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Beaker
} from 'lucide-react';
import { logout } from '@/lib/api';
import { useTheme } from '@/contexts/ThemeContext';
import toast from 'react-hot-toast';

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen, label: 'Chapters', href: '/dashboard/chapters' },
  { icon: FileText, label: 'Verses', href: '/dashboard/verses' },
  { icon: Activity, label: 'Activities', href: '/dashboard/activities' },
  { icon: Beaker, label: 'Experiments', href: '/dashboard/experiments' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (!token) {
      router.push('/login');
    } else if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 dark:from-primary-700 dark:via-primary-800 dark:to-accent-700 shadow-2xl`}>
        <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
          <div className="flex items-center justify-between mb-8 px-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-3xl">🕉️</span>
                Geeta Admin
              </h2>
              <p className="text-primary-100 text-xs mt-1">Content Management</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white hover:bg-white/10 p-1 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-1 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 shadow-lg'
                      : 'text-white hover:bg-white/10 dark:hover:bg-white/5'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={`w-5 h-5 mr-3 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-2 pt-4 border-t border-white/10">
            <button
              onClick={toggleTheme}
              className="flex items-center w-full px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-200"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-5 h-5 mr-3" />
                  <span className="font-medium">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 mr-3" />
                  <span className="font-medium">Dark Mode</span>
                </>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4 ml-auto">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 rounded-full flex items-center justify-center ring-2 ring-primary-200 dark:ring-primary-700 shadow-lg">
                <span className="text-primary-600 dark:text-primary-300 font-bold text-lg">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 animate-fadeIn">{children}</main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden animate-fadeIn"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
