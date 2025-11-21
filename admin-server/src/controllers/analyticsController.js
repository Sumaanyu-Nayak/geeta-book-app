// Use local models
const Chapter = require('../models/Chapter');
const Verse = require('../models/Verse');
const Activity = require('../models/Activity');
const VerseActivity = require('../models/VerseActivity');
const UserProgress = require('../models/UserProgress');

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Private
exports.getAnalytics = async (req, res) => {
  try {
    const [totalChapters, totalVerses, totalActivities, totalVerseActivities, userProgress] = await Promise.all([
      Chapter.countDocuments(),
      Verse.countDocuments(),
      Activity.countDocuments(),
      VerseActivity.countDocuments(),
      UserProgress.countDocuments(),
    ]);

    res.json({
      totalChapters,
      totalVerses,
      totalActivities: totalActivities + totalVerseActivities,
      totalUsers: userProgress,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Server error fetching analytics', error: error.message });
  }
};

// @desc    Get user statistics
// @route   GET /api/admin/analytics/users
// @access  Private
exports.getUserStats = async (req, res) => {
  try {
    const totalUsers = await UserProgress.countDocuments();
    const activeUsers = await UserProgress.countDocuments({ lastRead: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });
    
    res.json({
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
    });
  } catch (error) {
    console.error('User stats error:', error);
    res.status(500).json({ message: 'Server error fetching user stats', error: error.message });
  }
};

// @desc    Get content statistics
// @route   GET /api/admin/analytics/content
// @access  Private
exports.getContentStats = async (req, res) => {
  try {
    // Get most read chapters
    const popularChapters = await UserProgress.aggregate([
      { $group: { _id: '$chapterId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'chapters',
          localField: '_id',
          foreignField: 'chapterNumber',
          as: 'chapter'
        }
      },
      { $unwind: '$chapter' },
      {
        $project: {
          chapterId: '$_id',
          chapterName: '$chapter.name',
          reads: '$count'
        }
      }
    ]);

    // Get activity completion stats
    const completedActivities = await UserProgress.aggregate([
      { $unwind: '$completedActivities' },
      { $count: 'total' }
    ]);

    res.json({
      popularChapters,
      totalCompletedActivities: completedActivities[0]?.total || 0,
    });
  } catch (error) {
    console.error('Content stats error:', error);
    res.status(500).json({ message: 'Server error fetching content stats', error: error.message });
  }
};

// @desc    Get chapter statistics
// @route   GET /api/admin/analytics/chapters
// @access  Private
exports.getChapterStats = async (req, res) => {
  try {
    const chapters = await Chapter.find().lean();
    const chapterStats = await Promise.all(
      chapters.map(async (chapter) => {
        const verses = await Verse.countDocuments({ chapterId: chapter.chapterNumber });
        const activities = await Activity.countDocuments({ chapterId: chapter.chapterNumber });
        
        return {
          chapterNumber: chapter.chapterNumber,
          chapterName: chapter.name,
          totalVerses: verses,
          totalActivities: activities,
        };
      })
    );

    res.json(chapterStats);
  } catch (error) {
    console.error('Chapter stats error:', error);
    res.status(500).json({ message: 'Server error fetching chapter stats', error: error.message });
  }
};
