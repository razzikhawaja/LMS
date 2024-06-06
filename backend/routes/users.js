const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth } = require('../auth');

router.post('/users', requireAuth, userController.registerUser);
router.put('/users/:id', requireAuth, userController.updateUser);
router.delete('/users/:id', requireAuth, userController.deleteUser);
router.get('/users', requireAuth, userController.viewUsers);

module.exports = router;
