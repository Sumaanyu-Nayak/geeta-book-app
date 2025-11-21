'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getVerseActivities, getChapters, getVerses, deleteVerseActivity } from '@/lib/api';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

interface VerseActivity {
  _id: string;
  chapterId: string;
  verseNumber: number;
  title: string;
  description: string;
  type: string;
  instructions: { step: number; description: string }[];
  duration: string;
  difficulty: string;
  benefits: string[];
  iconUrl?: string;
  order: number;
}

interface Chapter {
  _id: string;
  number: number;
  titleEnglish: string;
}

interface Verse {
  _id: string;
  chapterId: number;
  verseNumber: number;
  textSanskrit: string;
}

export default function VerseActivitiesPage() {
  const [activities, setActivities] = useState<VerseActivity[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChapter, setFilterChapter] = useState('');
  const [filterVerse, setFilterVerse] = useState('');
  const [filterType, setFilterType] = useState('');

  const activityTypes = [
    'experiment',
    'meditation',
    'reflection',
    'practice',
    'journaling',
    'daily_challenge',
  ];

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  const typeColors = {
    experiment: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    meditation: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    reflection: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    practice: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    journaling: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    daily_challenge: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (filterChapter) {
      loadVerses(filterChapter);
    } else {
      setVerses([]);
      setFilterVerse('');
    }
  }, [filterChapter]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [activitiesData, chaptersData] = await Promise.all([
        getVerseActivities(),
        getChapters(),
      ]);
      setActivities(activitiesData);
      setChapters(chaptersData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadVerses = async (chapterId: string) => {
    try {
      const versesData = await getVerses(chapterId);
      setVerses(versesData);
    } catch (error) {
      console.error('Error loading verses:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this verse activity?')) return;

    try {
      await deleteVerseActivity(id);
      setActivities(activities.filter((activity) => activity._id !== id));
    } catch (error) {
      console.error('Error deleting verse activity:', error);
      alert('Failed to delete verse activity');
    }
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChapter = !filterChapter || activity.chapterId === filterChapter;
    const matchesVerse = !filterVerse || activity.verseNumber === parseInt(filterVerse);
    const matchesType = !filterType || activity.type === filterType;

    return matchesSearch && matchesChapter && matchesVerse && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading verse activities...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Verse Activities</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage verse-specific activities, experiments, and practices
          </p>
        </div>
        <Link
          href="/dashboard/experiments/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Verse Activity
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Search className="w-4 h-4 inline mr-1" />
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search activities..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Filter className="w-4 h-4 inline mr-1" />
              Chapter
            </label>
            <select
              value={filterChapter}
              onChange={(e) => setFilterChapter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Chapters</option>
              {chapters.map((chapter) => (
                <option key={chapter._id} value={chapter.number}>
                  Chapter {chapter.number}: {chapter.titleEnglish}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Filter className="w-4 h-4 inline mr-1" />
              Verse
            </label>
            <select
              value={filterVerse}
              onChange={(e) => setFilterVerse(e.target.value)}
              disabled={!filterChapter}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Verses</option>
              {verses.map((verse) => (
                <option key={verse._id} value={verse.verseNumber}>
                  Verse {verse.verseNumber}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Filter className="w-4 h-4 inline mr-1" />
              Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Types</option>
              {activityTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredActivities.map((activity) => (
          <div
            key={activity._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {activity.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Ch {activity.chapterId}, Verse {activity.verseNumber}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[activity.type as keyof typeof typeColors]}`}>
                      {activity.type.replace('_', ' ')}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[activity.difficulty as keyof typeof difficultyColors]}`}>
                      {activity.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {activity.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  ⏱️ Duration: {activity.duration}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  📋 {activity.instructions.length} steps
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  ✨ {activity.benefits.length} benefits
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/dashboard/experiments/${activity._id}/edit`}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(activity._id)}
                  className="px-3 py-2 border border-red-300 dark:border-red-600 rounded-lg text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No verse activities found</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Try adjusting your filters or create a new verse activity
          </p>
        </div>
      )}
    </div>
    </DashboardLayout>
  );
}
