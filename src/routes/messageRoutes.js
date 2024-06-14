const express = require('express');
const router = express.Router();

const controller = require('../controllers/messageController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
// get all messages
router.get('/', controller.readAllMessage);

// creates new message
router.post('/', jwtMiddleware.verifyToken,  controller.createMessage);

// gets message by ID
router.get('/:id', controller.readMessageById);

// updates message by ID
router.put('/:id', jwtMiddleware.verifyToken, controller.verifyMessageAssociation,controller.updateMessageById);

// deletes message by ID
router.delete('/:id', jwtMiddleware.verifyToken, controller.verifyMessageAssociation, controller.deleteMessageById);

module.exports = router;