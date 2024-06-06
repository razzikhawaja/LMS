const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { requireAuth } = require('../auth');

/**
 * @swagger
 * /api/borrow:
 *   post:
 *     summary: Borrow a book
 *     security:
 *       - bearerAuth: []
 *     tags: [Borrow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user borrowing the book
 *               bookId:
 *                 type: string
 *                 description: The ID of the book being borrowed
 *             example:
 *               userId: "user_id"
 *               bookId: "book_id"
 *     responses:
 *       200:
 *         description: The book was successfully borrowed
 *       401:
 *         description: Unauthorized
 */
router.post('/borrow', requireAuth, borrowController.borrowBook);

/**
 * @swagger
 * /api/return:
 *   post:
 *     summary: Return a book
 *     security:
 *       - bearerAuth: []
 *     tags: [Return]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user returning the book
 *               bookId:
 *                 type: string
 *                 description: The ID of the book being returned
 *             example:
 *               userId: "user_id"
 *               bookId: "book_id"
 *     responses:
 *       200:
 *         description: The book was successfully returned
 *       401:
 *         description: Unauthorized
 */
router.post('/return', requireAuth, borrowController.returnBook);

/**
 * @swagger
 * /api/borrowed:
 *   get:
 *     summary: View borrowed books
 *     security:
 *       - bearerAuth: []
 *     tags: [Borrow]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A list of borrowed books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized
 */
router.get('/borrowed', requireAuth, borrowController.viewBorrowedBooks);

module.exports = router;
