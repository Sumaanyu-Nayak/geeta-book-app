'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getVerseActivity, updateVerseActivity, getChapters, getVerses } from '@/lib/api';
import { ArrowLeft, Plus, X } from 'lucide-react';
import Link from 'next/link';

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

export default function EditVerseActivityPage() {
  const router = useRouter();
  const params = useParams();
  const activityId = params.id as string;

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    chapterId: '',
    verseNumber: '',
    title: '',
    description: '',
    type: 'experiment',
    duration: '',
    difficulty: 'beginner',
    iconUrl: '',
    order: 0,
  });
  const [instructions, setInstructions] = useState<{ step: number; description: string }[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);

  const activityTypes = [
    'experiment',
    'meditation',
    'reflection',
    'practice',
    'journaling',
    'daily_challenge',
  ];

  useEffect(() => {
    loadData();
  }, [activityId]);

  useEffect(() => {
    if (formData.chapterId && chapters.length > 0) {
      loadVerses(formData.chapterId);
    }
  }, [formData.chapterId, chapters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [activityData, chaptersData] = await Promise.all([
        getVerseActivity(activityId),
        getChapters(),
      ]);

      setChapters(chaptersData);
      setFormData({
        chapterId: activityData.chapterId,
        verseNumber: activityData.verseNumber.toString(),
        title: activityData.title,
        description: activityData.description,
        type: activityData.type,
        duration: activityData.duration,
        difficulty: activityData.difficulty,
        iconUrl: activityData.iconUrl || '',
        order: activityData.order,
      });
      setInstructions(activityData.instructions.length > 0 ? activityData.instructions : [{ step: 1, description: '' }]);
      setBenefits(activityData.benefits.length > 0 ? activityData.benefits : ['']);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Failed to load verse activity');
    } finally {
      setLoading(false);
    }
  };

  const loadVerses = async (chapterId: string) => {
    try {
      const data = await getVerses(chapterId);
      setVerses(data);
    } catch (error) {
      console.error('Error loading verses:', error);
    }
  };

  const addInstruction = () => {
    setInstructions([...instructions, { step: instructions.length + 1, description: '' }]);
  };

  const removeInstruction = (index: number) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    const reIndexed = newInstructions.map((inst, i) => ({ ...inst, step: i + 1 }));
    setInstructions(reIndexed);
  };

  const updateInstruction = (index: number, description: string) => {
    const newInstructions = [...instructions];
    newInstructions[index].description = description;
    setInstructions(newInstructions);
  };

  const addBenefit = () => {
    setBenefits([...benefits, '']);
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const filteredInstructions = instructions.filter((inst) => inst.description.trim());
      const filteredBenefits = benefits.filter((benefit) => benefit.trim());

      await updateVerseActivity(activityId, {
        ...formData,
        chapterId: formData.chapterId, // Keep as string
        verseNumber: parseInt(formData.verseNumber),
        instructions: filteredInstructions,
        benefits: filteredBenefits,
      });

      router.push('/dashboard/experiments');
    } catch (error) {
      console.error('Error updating verse activity:', error);
      alert('Failed to update verse activity');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading verse activity...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/experiments"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Verse Activity</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Update verse-specific activity details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chapter *
              </label>
              <select
                required
                value={formData.chapterId}
                onChange={(e) => setFormData({ ...formData, chapterId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Chapter</option>
                {chapters.map((chapter) => (
                  <option key={chapter._id} value={chapter.number}>
                    Chapter {chapter.number}: {chapter.titleEnglish}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Verse *
              </label>
              <select
                required
                value={formData.verseNumber}
                onChange={(e) => setFormData({ ...formData, verseNumber: e.target.value })}
                disabled={!formData.chapterId}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
              >
                <option value="">Select Verse</option>
                {verses.map((verse) => (
                  <option key={verse._id} value={verse.verseNumber}>
                    Verse {verse.verseNumber}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter activity title"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter activity description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {activityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty *
              </label>
              <select
                required
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration *
              </label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="e.g., 15 minutes"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon URL
              </label>
              <input
                type="url"
                value={formData.iconUrl}
                onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://example.com/icon.png"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Instructions</h2>
            <button
              type="button"
              onClick={addInstruction}
              className="inline-flex items-center px-3 py-1.5 text-sm border border-indigo-300 dark:border-indigo-600 rounded-lg text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Step
            </button>
          </div>

          <div className="space-y-4">
            {instructions.map((instruction, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full flex items-center justify-center font-medium">
                  {instruction.step}
                </div>
                <div className="flex-1">
                  <textarea
                    value={instruction.description}
                    onChange={(e) => updateInstruction(index, e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter instruction step"
                  />
                </div>
                {instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="flex-shrink-0 p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Benefits</h2>
            <button
              type="button"
              onClick={addBenefit}
              className="inline-flex items-center px-3 py-1.5 text-sm border border-indigo-300 dark:border-indigo-600 rounded-lg text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Benefit
            </button>
          </div>

          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter benefit"
                  />
                </div>
                {benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="flex-shrink-0 p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href="/dashboard/experiments"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
