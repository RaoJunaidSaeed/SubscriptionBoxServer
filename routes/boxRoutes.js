const express = require('express');
const router = express.Router();
const boxController = require('../controllers/boxController');
const { restrictToAdmin } = require('../middleware/auth'); // Import the admin check

// --- PUBLIC VIEWING ---
// Any authenticated user can see the available boxes
router.get('/', boxController.getBoxes);
router.get('/:id', boxController.getBoxById);

// --- ADMIN MANAGEMENT (CRUD) ---
// Only users with role: 'admin' can perform these actions
router.post('/', restrictToAdmin, boxController.createBox);
router.put('/:id', restrictToAdmin, boxController.updateBox); // Full Update
router.patch('/:id', restrictToAdmin, boxController.patchBox); // Status Update
router.delete('/:id', restrictToAdmin, boxController.deleteBox);

module.exports = router;
