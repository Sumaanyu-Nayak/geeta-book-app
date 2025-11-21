'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { getVerses, getChapters, deleteVerse } from '@/lib/api';
import { Plus, Edit, Trash2, BookMarked, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function VersesPage() {
  const [verses, setVerses] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [versesData, chaptersData] = await Promise.all([
        getVerses(),
        getChapters()
      ]);
      setVerses(versesData);
      setChapters(chaptersData);
    } catch (error) {
      toast.error('Failed to load verses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (verseId: string) => {
    if (!confirm('Are you sure you want to delete this verse?')) {
      return;
    }

    try {
      await deleteVerse(verseId);
      toast.success('Verse deleted successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to delete verse');
    }
  };

  const filteredVerses = selectedChapter === 'all' 
    ? verses 
    : verses.filter(v => v.chapterId === parseInt(selectedChapter));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Verses</h1>
            <p className="text-gray-600 mt-1">Manage all verses of Bhagavad Geeta</p>
          </div>
          <Link
            href="/dashboard/verses/new"
            className="flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg hover:from-primary-700 hover:to-pink-700 transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Verse
          </Link>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label htmlFor="chapter-select" className="sr-only">Filter by chapter</label>
              <select
                id="chapter-select"
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                aria-label="Filter by chapter"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Chapters</option>
                {chapters.map((chapter) => (
                  <option key={chapter.number} value={chapter.number}>
                    Chapter {chapter.number} - {chapter.titleEnglish}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredVerses.map((verse: any) => (
              <div
                key={verse._id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-pink-100 rounded-lg flex items-center justify-center">
                        <BookMarked className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-bold text-gray-900">
                          Chapter {verse.chapterId} - Verse {verse.verseNumber}
                        </h3>
                        <p className="text-sm text-gray-500">Verse ID: {verse.id}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Sanskrit:</p>
                        <p className="text-gray-900 font-serif">{verse.textSanskrit}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Transliteration:</p>
                        <p className="text-gray-600 italic">{verse.textTransliteration}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Translation:</p>
                        <p className="text-gray-900">{verse.translationEnglish}</p>
                      </div>
                      {verse.explanation && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Explanation:</p>
                          <p className="text-gray-600 text-sm line-clamp-2">{verse.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Link
                      href={`/dashboard/verses/${verse._id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(verse._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredVerses.length === 0 && (
          <div className="text-center py-12">
            <BookMarked className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No verses yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first verse</p>
            <Link
              href="/dashboard/verses/new"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg hover:from-primary-700 hover:to-pink-700 transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Verse
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
