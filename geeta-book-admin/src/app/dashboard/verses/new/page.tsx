'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { createVerse, getChapters } from '@/lib/api';
import { Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function NewVersePage() {
  const router = useRouter();
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    chapterId: '',
    verseNumber: '',
    textSanskrit: '',
    textTransliteration: '',
    translationEnglish: '',
    translationHindi: '',
    explanation: '',
    videoUrl: '',
    audioUrl: '',
    images: [] as string[],
  });

  useEffect(() => {
    loadChapters();
  }, []);

  const loadChapters = async () => {
    try {
      const data = await getChapters();
      setChapters(data);
    } catch (error) {
      toast.error('Failed to load chapters');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createVerse({
        ...formData,
        chapterId: parseInt(formData.chapterId),
        verseNumber: parseInt(formData.verseNumber),
      });
      toast.success('Verse created successfully');
      router.push('/dashboard/verses');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create verse');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Verse</h1>
            <p className="text-gray-600 mt-1">Create a new verse in Bhagavad Geeta</p>
          </div>
          <Link
            href="/dashboard/verses"
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
                Verse Number *
              </label>
              <input
                type="number"
                name="verseNumber"
                value={formData.verseNumber}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sanskrit Text *
            </label>
            <textarea
              name="textSanskrit"
              value={formData.textSanskrit}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-serif"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transliteration *
            </label>
            <textarea
              name="textTransliteration"
              value={formData.textTransliteration}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent italic"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              English Translation *
            </label>
            <textarea
              name="translationEnglish"
              value={formData.translationEnglish}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hindi Translation *
            </label>
            <textarea
              name="translationHindi"
              value={formData.translationHindi}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Explanation *
            </label>
            <textarea
              name="explanation"
              value={formData.explanation}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL
              </label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Audio URL
              </label>
              <input
                type="url"
                name="audioUrl"
                value={formData.audioUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link
              href="/dashboard/verses"
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
              {loading ? 'Creating...' : 'Create Verse'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
