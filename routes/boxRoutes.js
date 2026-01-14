const express = require('express');
const router = express.Router();
const boxController = require('../controllers/boxController');

router.get('/', boxController.getBoxes);
router.post('/', boxController.createBox);

router.get('/:id', boxController.getBoxById);
router.put('/:id', boxController.updateBox); // Full Update
router.patch('/:id', boxController.patchBox); // Status Update
router.delete('/:id', boxController.deleteBox);

module.exports = router;
