const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.registerUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users', userController.viewUsers);

module.exports = router;
