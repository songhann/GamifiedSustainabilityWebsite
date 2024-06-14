const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskprogressController');
const Taskcontroller = require("../controllers/taskController");
const Usercontroller = require("../controllers/userController");
const playercontroller = require("../controllers/playerController");
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Creates a Task Progress
router.post('/', jwtMiddleware.verifyToken, Taskcontroller.checkTaskId, playercontroller.checkProfile, controller.getMultiplier,controller.CreateTaskProgress, controller.updateCoins ,playercontroller.jsOutput);

// Gets TaskProgress by UserID
router.get('/player', jwtMiddleware.verifyToken, controller.getTaskProgressbyUserID)








module.exports = router;