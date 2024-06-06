const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { requireAuth } = require('../auth');

router.post('/books', requireAuth, bookController.addBook);
router.put('/books/:id', requireAuth, bookController.updateBook);
router.delete('/books/:id', requireAuth, bookController.deleteBook);
router.get('/books', requireAuth, bookController.viewBooks);

module.exports = router;
