const model = require("../models/taskModel.js");


// gets all task 
module.exports.readAllTask = (req, res ,next) => {

    const callback = (error, results, fields) => {
        if(error){
            console.error("Error readAllTask:", error);
            res.status(500).json(error);
        } else{
            res.status(200).json(results);
        }
    }

    model.readAllTask(callback);
}

// gets task by taskID
module.exports.readTaskbyId = (req, res, next) => {

    const data = {
        taskid : req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskbyId:", error);
            res.status(500).json(error);
        } else{
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else {
            res.status(200).json(results[0]);
        }
        }
        
    }

    model.selectTaskbyId(data, callback);
}

// controller to check if task exists
module.exports.checkTaskId = (req, res, next) => {

    if(req.body.task_id == undefined)
    {
        res.status(404).send("Error: Task is undefined");
        return;
    }

    const data = {
        taskid: req.body.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkTaskId:", error);
            res.status(500).json(error);
        } else {
            if(results.length==0){
                res.status(409).json({"message": "Task ID does not exist"})
            }
            else next();
        }
    }
    
    model.checkTaskId(data, callback);
}