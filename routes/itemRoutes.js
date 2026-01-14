const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
// Import the middleware we created in the previous step
const { restrictToAdmin } = require('../middleware/auth');

// --- PUBLIC ROUTES ---
// Any authenticated user can view the global inventory
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItemById);

// --- ADMIN ONLY ROUTES ---
// Only users with role: 'admin' in MongoDB can perform these actions
router.post('/', restrictToAdmin, itemController.createItem);
router.patch('/:id', restrictToAdmin, itemController.updateItem);
router.delete('/:id', restrictToAdmin, itemController.deleteItem);

module.exports = router;
