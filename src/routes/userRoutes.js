const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

// gets all users
router.get('/', controller.readAllUsers);

//get leaderboard
router.get('/leaderboard', controller.getSortedUsers);

// gets users by userID
router.get('/:user_id', controller.readUserbyId);

// updates user details by userID
router.put('/:user_id', controller.checkUsernameOrEmailExist , controller.modifyUser);

// deletes user by userID
router.delete('/:user_id', controller.deleteUser);


module.exports = router;