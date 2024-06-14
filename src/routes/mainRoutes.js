const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const taskprogressRoutes = require('./taskprogressRoutes');
const playerRoutes = require('./playerRoutes');
const itemRoutes = require('./itemRoutes');
const minigameRoutes = require('./minigameRoutes');
const messageRoutes = require('./messageRoutes');
const planetRoutes = require('./planetRoutes');

router.use("/planets", planetRoutes);

router.use("/message", messageRoutes);

router.use("/users", userRoutes);

router.use("/tasks", taskRoutes);

router.use("/task_progress", taskprogressRoutes);

router.use("/players", playerRoutes);

router.use("/items", itemRoutes);

router.use("/minigames", minigameRoutes)

const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const userController = require('../controllers/userController');

// allows user to register a account
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

// allows user to login
router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

module.exports = router;