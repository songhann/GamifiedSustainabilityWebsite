const pool = require('../services/db');

//  inserts taskprogress into the database , gets the taskprogress and gets coins from player and points from task
module.exports.CreateTaskProgress = (data, callback) =>{
    const SQLSTATEMENT=` 
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
    VALUES (?, ?, ?, ?);

    SELECT progress_id, user_id, task_id, DATE(completion_date) as completion_date, notes FROM TaskProgress
    WHERE progress_id = LAST_INSERT_ID();

    SELECT coins FROM Player
    WHERE player_id = ?;

    SELECT points FROM Task
    WHERE task_id = ?;
    `;

    const VALUES = [data.userid, data.taskid, data.completion_date, data.notes, data.userid, data.taskid]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

// updates player 's coins by playerID and inserts a cointransaction history into the database
module.exports.updateCoins = (data, callback) => {
    const SQLSTATEMENT=`
    UPDATE Player
    SET coins = ?
    WHERE player_id = ?;

    INSERT INTO CoinTransactionHistory (amount_transacted, transaction_note, player_id, transaction_datetime)
    VALUES(?,?,?,?);
    `;

    const VALUES = [data.totalcoins, data.playerid, data.coinadded, data.note, data.playerid, data.date]

    pool.query(SQLSTATEMENT, VALUES, callback)

}

// gets taskprogress by taskprogressID from database
module.exports.SelectTaskProgressbyId = (data, callback) => {
    const SQLSTATEMENT=`
    SELECT * FROM TaskProgress
    WHERE progress_id = ?;
    `;

    const VALUES = [data.progressid]
    
    pool.query(SQLSTATEMENT, VALUES, callback)
}


// get multiplier from planetID from database
module.exports.getMultiplier = (data , callback)=>{
    const SQLSTATEMENT=`
    SELECT multiplier FROM Planets
    WHERE planet_id = ?;
    `;

    const VALUES = [data.planetid]
    
    pool.query(SQLSTATEMENT, VALUES, callback)
}

// checks if taskprogress belongs to userID
module.exports.checkIfTaskProgressBelongsToUser = (data, callback)=>{
    const SQLSTATEMENT=`
    SELECT progress_id FROM TaskProgress
    WHERE progress_id = ? AND user_id = ?;
    `;

    const VALUES = [data.taskprogressid, data.userid]
    
    pool.query(SQLSTATEMENT, VALUES, callback)
}

// get taskProgress by UserID from database
module.exports.getTaskProgressbyUserID = (data, callback) => {
    const SQLSTATEMENT=`
    SELECT TaskProgress.* , Task.title, Task.points FROM TaskProgress
    INNER JOIN Task
    ON TaskProgress.task_id = Task.task_id
    WHERE user_id = ?;
    `; 

    const VALUES = [data.userid]
    
    pool.query(SQLSTATEMENT, VALUES, callback)
}