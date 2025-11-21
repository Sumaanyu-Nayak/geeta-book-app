'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { getActivities, getChapters, deleteActivity } from '@/lib/api';
import { Plus, Edit, Trash2, Activity as ActivityIcon, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

const ACTIVITY_TYPES = {
  read: { label: 'Read', color: 'bg-blue-100 text-blue-800' },
  watch: { label: 'Watch', color: 'bg-purple-100 text-purple-800' },
  experiments: { label: 'Experiments', color: 'bg-green-100 text-green-800' },
  listen: { label: 'Listen', color: 'bg-yellow-100 text-yellow-800' },
  quiz: { label: 'Quiz', color: 'bg-red-100 text-red-800' },
  reflection: { label: 'Reflection', color: 'bg-indigo-100 text-indigo-800' },
  discussion: { label: 'Discussion', color: 'bg-pink-100 text-pink-800' },
  dailyVerse: { label: 'Daily Verse', color: 'bg-orange-100 text-orange-800' },
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [activitiesData, chaptersData] = await Promise.all([
        getActivities(),
        getChapters()
      ]);
      setActivities(activitiesData);
      setChapters(chaptersData);
    } catch (error) {
      toast.error('Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (activityId: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) {
      return;
    }

    try {
      await deleteActivity(activityId);
      toast.success('Activity deleted successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to delete activity');
    }
  };

  const filteredActivities = activities.filter(activity => {
    const chapterMatch = selectedChapter === 'all' || activity.chapterId === parseInt(selectedChapter);
    const typeMatch = selectedType === 'all' || activity.type === selectedType;
    return chapterMatch && typeMatch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Activities</h1>
            <p className="text-gray-600 mt-1">Manage chapter activities</p>
          </div>
          <Link
            href="/dashboard/activities/new"
            className="flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg hover:from-primary-700 hover:to-pink-700 transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Activity
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Chapters</option>
              {chapters.map((chapter) => (
                <option key={chapter.number} value={chapter.number}>
                  Chapter {chapter.number} - {chapter.titleEnglish}
                </option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {Object.entries(ACTIVITY_TYPES).map(([value, { label }]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity: any) => (
              <div
                key={activity._id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-pink-100 rounded-lg flex items-center justify-center">
                      <ActivityIcon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${ACTIVITY_TYPES[activity.type as keyof typeof ACTIVITY_TYPES]?.color || 'bg-gray-100 text-gray-800'}`}>
                        {ACTIVITY_TYPES[activity.type as keyof typeof ACTIVITY_TYPES]?.label || activity.type}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Chapter {activity.chapterId}</p>
                    </div>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-2">{activity.title}</h4>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {activity.description}
                </p>

                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
                  <Link
                    href={`/dashboard/activities/${activity._id}/edit`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(activity._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <ActivityIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first activity</p>
            <Link
              href="/dashboard/activities/new"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg hover:from-primary-700 hover:to-pink-700 transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Activity
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
