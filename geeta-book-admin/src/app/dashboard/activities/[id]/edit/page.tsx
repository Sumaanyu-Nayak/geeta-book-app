'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { getActivity, updateActivity, getChapters } from '@/lib/api';
import { Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

const ACTIVITY_TYPES = [
  { value: 'read', label: 'Read' },
  { value: 'watch', label: 'Watch' },
  { value: 'experiments', label: 'Experiments' },
  { value: 'listen', label: 'Listen' },
  { value: 'quiz', label: 'Quiz' },
  { value: 'reflection', label: 'Reflection' },
  { value: 'discussion', label: 'Discussion' },
  { value: 'dailyVerse', label: 'Daily Verse' },
];

export default function EditActivityPage() {
  const router = useRouter();
  const params = useParams();
  const activityId = params.id as string;
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [formData, setFormData] = useState({
    chapterId: '',
    title: '',
    description: '',
    type: '',
    iconUrl: '',
  });

  useEffect(() => {
    loadData();
  }, [activityId]);

  const loadData = async () => {
    try {
      const [activityData, chaptersData] = await Promise.all([
        getActivity(activityId),
        getChapters()
      ]);
      setChapters(chaptersData);
      setFormData({
        chapterId: activityData.chapterId?.toString() || '',
        title: activityData.title || '',
        description: activityData.description || '',
        type: activityData.type || '',
        iconUrl: activityData.iconUrl || '',
      });
    } catch (error) {
      toast.error('Failed to load activity');
      router.push('/dashboard/activities');
    } finally {
      setDataLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateActivity(activityId, {
        ...formData,
        chapterId: parseInt(formData.chapterId),
      });
      toast.success('Activity updated successfully');
      router.push('/dashboard/activities');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update activity');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (dataLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Activity</h1>
            <p className="text-gray-600 mt-1">Update activity information</p>
          </div>
          <Link
            href="/dashboard/activities"
            className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chapter *
              </label>
              <select
                name="chapterId"
                value={formData.chapterId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Chapter</option>
                {chapters.map((chapter) => (
                  <option key={chapter.number} value={chapter.number}>
                    Chapter {chapter.number} - {chapter.titleEnglish}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Type</option>
                {ACTIVITY_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter activity title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe the activity in detail"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon URL
            </label>
            <input
              type="url"
              name="iconUrl"
              value={formData.iconUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://example.com/icon.png"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link
              href="/dashboard/activities"
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg hover:from-primary-700 hover:to-pink-700 transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5 mr-2" />
              {loading ? 'Updating...' : 'Update Activity'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
