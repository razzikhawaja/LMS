const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in to get a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               contact_number:
 *                 type: string
 *                 description: The user's contact number
 *             example:
 *               email: "ali@gmail.com"
 *               contact_number: "1234567890"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', authController.login);

module.exports = router;
