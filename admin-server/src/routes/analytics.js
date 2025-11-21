const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', analyticsController.getAnalytics);
router.get('/users', analyticsController.getUserStats);
router.get('/content', analyticsController.getContentStats);
router.get('/chapters', analyticsController.getChapterStats);

module.exports = router;
