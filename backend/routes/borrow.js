const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { requireAuth } = require('../auth');

router.post('/borrow', requireAuth, borrowController.borrowBook);
router.post('/return', requireAuth, borrowController.returnBook);
router.get('/borrowed/:user_id', requireAuth, borrowController.viewBorrowedBooks);

module.exports = router;
