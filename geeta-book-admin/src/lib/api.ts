import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = async (email: string, password: string) => {
  const { data } = await api.post('/admin/login', { email, password });
  return data;
};

export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};

// Chapters
export const getChapters = async () => {
  const { data } = await api.get('/chapters');
  return data;
};

export const getChapter = async (id: string) => {
  const { data } = await api.get(`/chapters/${id}`);
  return data;
};

export const createChapter = async (chapter: any) => {
  const { data } = await api.post('/admin/chapters', chapter);
  return data;
};

export const updateChapter = async (id: string, chapter: any) => {
  const { data } = await api.put(`/admin/chapters/${id}`, chapter);
  return data;
};

export const deleteChapter = async (id: string) => {
  const { data } = await api.delete(`/admin/chapters/${id}`);
  return data;
};

// Verses
export const getVerses = async (chapterId?: string) => {
  const url = chapterId ? `/verses?chapterId=${chapterId}` : '/verses';
  const { data } = await api.get(url);
  return data;
};

export const getVerse = async (id: string) => {
  const { data } = await api.get(`/verses/${id}`);
  return data;
};

export const createVerse = async (verse: any) => {
  const { data } = await api.post('/admin/verses', verse);
  return data;
};

export const updateVerse = async (id: string, verse: any) => {
  const { data } = await api.put(`/admin/verses/${id}`, verse);
  return data;
};

export const deleteVerse = async (id: string) => {
  const { data } = await api.delete(`/admin/verses/${id}`);
  return data;
};

// Activities
export const getActivities = async () => {
  const { data } = await api.get('/activities');
  return data;
};

export const getActivity = async (id: string) => {
  const { data } = await api.get(`/activities/${id}`);
  return data;
};

export const createActivity = async (activity: any) => {
  const { data } = await api.post('/admin/activities', activity);
  return data;
};

export const updateActivity = async (id: string, activity: any) => {
  const { data } = await api.put(`/admin/activities/${id}`, activity);
  return data;
};

export const deleteActivity = async (id: string) => {
  const { data } = await api.delete(`/admin/activities/${id}`);
  return data;
};

// Verse Activities
export const getVerseActivities = async () => {
  const { data } = await api.get('/verse-activities');
  return data;
};

export const getVerseActivity = async (id: string) => {
  const { data } = await api.get(`/verse-activities/${id}`);
  return data;
};

export const createVerseActivity = async (activity: any) => {
  const { data } = await api.post('/admin/verse-activities', activity);
  return data;
};

export const updateVerseActivity = async (id: string, activity: any) => {
  const { data } = await api.put(`/admin/verse-activities/${id}`, activity);
  return data;
};

export const deleteVerseActivity = async (id: string) => {
  const { data } = await api.delete(`/admin/verse-activities/${id}`);
  return data;
};

// Analytics
export const getAnalytics = async () => {
  const { data } = await api.get('/admin/analytics');
  return data;
};

export const getUserStats = async () => {
  const { data } = await api.get('/admin/analytics/users');
  return data;
};

export const getContentStats = async () => {
  const { data } = await api.get('/admin/analytics/content');
  return data;
};

export default api;
