'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { getChapters, deleteChapter } from '@/lib/api';
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ChaptersPage() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChapters();
  }, []);

  const loadChapters = async () => {
    try {
      const data = await getChapters();
      setChapters(data);
    } catch (error) {
      toast.error('Failed to load chapters');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (chapterId: number) => {
    if (!confirm('Are you sure you want to delete this chapter and all its verses?')) {
      return;
    }

    try {
      await deleteChapter(chapterId.toString());
      toast.success('Chapter deleted successfully');
      loadChapters();
    } catch (error) {
      toast.error('Failed to delete chapter');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Chapters</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage all chapters of Bhagavad Geeta</p>
          </div>
          <Link
            href="/dashboard/chapters/new"
            className="flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg hover:from-primary-700 hover:to-pink-700 transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Chapter
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter: any) => (
              <div
                key={chapter.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-pink-100 dark:from-primary-900 dark:to-pink-900 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        Chapter {chapter.chapterNumber}
                      </h3>
                    </div>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{chapter.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {chapter.summary}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    {chapter.versesCount || 0} verses
                  </span>
                  <div className="flex space-x-2">
                    <Link
                      href={`/dashboard/chapters/${chapter.chapterNumber}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(chapter.chapterNumber)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && chapters.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No chapters yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first chapter</p>
            <Link
              href="/dashboard/chapters/new"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg hover:from-primary-700 hover:to-pink-700 transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Chapter
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
