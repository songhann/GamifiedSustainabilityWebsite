const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');


// gets all tasks
router.get('/', controller.readAllTask);  

// gets task by taskID
router.get('/:task_id', controller.readTaskbyId); 

module.exports = router;