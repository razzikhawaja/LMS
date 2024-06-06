const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { requireAuth } = require('../auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - genre
 *         - publication_year
 *         - borrowed
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         genre:
 *           type: string
 *           description: The genre of the book
 *         publication_year:
 *           type: integer
 *           description: The publication year of the book
 *         borrowed:
 *           type: boolean
 *           description: The borrowed status of the book
 *       example:
 *         title: The Great Gatsby
 *         author: F. Scott Fitzgerald
 *         genre: Fiction
 *         publication_year: 1925
 *         borrowed: false
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized
 */
router.post('/books', requireAuth, bookController.addBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was updated
  *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized
 */
router.put('/books/:id', requireAuth, bookController.updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: The book was deleted
 *       401:
 *         description: Unauthorized
 */
router.delete('/books/:id', requireAuth, bookController.deleteBook);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized
 */
router.get('/books', requireAuth, bookController.viewBooks);

module.exports = router;
