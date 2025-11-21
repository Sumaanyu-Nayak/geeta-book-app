const express = require('express');
const router = express.Router();
const verseActivityController = require('../controllers/verseActivityController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', verseActivityController.createVerseActivity);
router.put('/:id', verseActivityController.updateVerseActivity);
router.delete('/:id', verseActivityController.deleteVerseActivity);

module.exports = router;
