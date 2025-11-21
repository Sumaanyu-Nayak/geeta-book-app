const express = require('express');
const router = express.Router();
const verseController = require('../controllers/verseController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', verseController.createVerse);
router.put('/:id', verseController.updateVerse);
router.delete('/:id', verseController.deleteVerse);

module.exports = router;
