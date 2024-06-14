const pool = require('../services/db');

// inserts a task into the database , gets the task inserted from database
module.exports.createTask = (data, callback) =>{
    const SQLSTATEMENT=`
    INSERT INTO Task (title, description, points) 
    VALUES(?, ?, ?);

    SELECT * FROM Task
    WHERE task_id = LAST_INSERT_ID();
    `;

    const VALUES =[data.title, data.description, data.points]

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets all tasks from database
module.exports.readAllTask = (callback) => {
    const SQLSTATEMENT=`
    SELECT * FROM Task;
    `;

    pool.query(SQLSTATEMENT, callback);
}

// gets task by taskID from database
module.exports.selectTaskbyId = (data, callback) => {
    const SQLSTATEMENT=`
    SELECT * FROM Task
    WHERE task_id = ?;
    `;

    const VALUES = [data.taskid];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// updates task by taskID in the database and gets the task from database
module.exports.UpdateTaskbyId = (data, callback) => {
    const SQLSTATEMENT=`
    UPDATE Task 
    SET title = ?, description = ?, points = ?
    WHERE task_id = ?;

    SELECT * FROM Task
    WHERE task_id = ?
    `;

    const VALUES = [data.title, data.description, data.points, data.taskid, data.taskid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// deletes task by taskID and deletes taskprogress by taskID in database
module.exports.DeleteTaskbyId = (data, callback) => {
    const SQLSTATEMENT=`
    DELETE FROM Task
    WHERE task_id = ?;

    ALTER TABLE Task AUTO_INCREMENT =1;

    DELETE FROM TaskProgress
    WHERE task_id = ?;

    ALTER TABLE TaskProgress AUTO_INCREMENT =1;
    `;

    const VALUES = [data.taskid, data.taskid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets task_id from task by taskID from the database
module.exports.checkTaskId = (data, callback) => {
    const SQLSTATEMENT=`
    SELECT task_id FROM Task
    WHERE task_id = ?;
    `;

    const VALUES = [data.taskid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}