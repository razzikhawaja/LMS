const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

router.post('/borrow', borrowController.borrowBook);
router.post('/return', borrowController.returnBook);
router.get('/borrowed/:user_id', borrowController.viewBorrowedBooks);

module.exports = router;
