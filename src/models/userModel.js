const pool = require('../services/db');

// gets email and user_id from database by email
module.exports.checkEmail = (data, callback) => {
    const SQLSTATEMENT=`
    SELECT email, user_id FROM User
    WHERE email = ?;
    `;

    const VALUES = [data.email]

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets username and user_id from database by username
module.exports.checkUsername = (data, callback) => {
    const SQLSTATEMENT=`
    SELECT username, user_id FROM User
    WHERE username = ?;
    `;
    const VALUES = [data.username]

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// creates user into the database and gets the inserted user from the database, creates player and playerpreset with it into the database
module.exports.insertSingle = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO User (username, email, password) 
    VALUES (?, ? , ?);

    SELECT user_id FROM User
    WHERE user_id = LAST_INSERT_ID();

    INSERT INTO Player (planet_id, coins)
    VALUES(1, 0);

    INSERT INTO PlayerPreset (player_id, helmet, top, bottom,boots, weapon)
    VALUES(LAST_INSERT_ID(), 0, 0, 0, 0, 0);
    `;

    const VALUES = [data.username, data.email, data.hash];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets all users from the database
module.exports.selectAllUsers = (callback) => {
    const SQLSTATEMENT=`
    SELECT * FROM User;
    `;

    pool.query(SQLSTATEMENT, callback);
}

// gets users by userID from the database, and the total points they have
module.exports.selectUserbyId = (data, callback) => {
    const SQLSTATEMENT =`
    SELECT User.*, COALESCE(SUM(Task.points), 0) as total_points
    FROM User
    LEFT JOIN TaskProgress
    ON User.user_id = TaskProgress.user_id
	LEFT JOIN Task
    ON TaskProgress.task_id = Task.task_id
    WHERE User.user_id = ?;
    `;

    const VALUES =[data.userid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// updates user by userID in the database
module.exports.updateUserById = (data, callback) => {
    const SQLSTATEMENT=`
    UPDATE User
    SET username = ?, email = ? 
    WHERE user_id = ?;

    SELECT * FROM User
    WHERE user_id = ?;
    `;

    const VALUES = [data.username, data.email, data.userid, data.userid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// deletes user by userID in the database,delets their player,playeritems and playerpreset in the database
module.exports.deleteUserbyId = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM User
    WHERE user_id = ?;

    ALTER TABLE User AUTO_INCREMENT =1;

    DELETE FROM TaskProgress
    WHERE user_id = ?;

    ALTER TABLE TaskProgress AUTO_INCREMENT =1;

    DELETE FROM Player
    WHERE player_id = ?;

    ALTER TABLE Player AUTO_INCREMENT =1;

    DELETE FROM PlayerItems
    WHERE player_id = ?;

    ALTER TABLE PlayerItems AUTO_INCREMENT =1;

    DELETE FROM PlayerPreset
    WHERE player_id = ?;

    ALTER TABLE PlayerPreset AUTO_INCREMENT =1;
    `;

    const VALUES = [data.userid, data.userid, data.userid, data.userid, data.userid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets userID from the user by userID from database
module.exports.checkUserId = (data, callback) => {
    const SQLSTATEMENT=`
    SELECT user_id FROM User
    WHERE user_id = ?;
    `;

    const VALUES = [data.userid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//gets user by userID from database
module.exports.getUserIfNull = (data, callback) => {
    const SQLSTATEMENT=`
    SELECT * 
    FROM User
    WHERE user_id = ?;
    `;

    const VALUES = [data.userid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// get user by username from the database
module.exports.getUserbyUsername = (data, callback) => {
    const SQLSTATEMENT=`
    SELECT * FROM User
    WHERE username = ?;

    `;
    const VALUES = [data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// checks if username or email already exits in the database
module.exports.checkUsernameOrEmailExist = (data, callback) => {
    const SQLSTATEMENT=`
    SELECT username FROM User
    WHERE username = ? OR email = ?;

    `;
    const VALUES = [data.username, data.email]

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets user sorted by total points from database
module.exports.getSortedUsers = (callback) => {
    const SQLSTATEMENT=`
    SELECT User.username, User.user_id, COALESCE(SUM(Task.points), 0) as total_points , ca2.player.planet_id as planet_level
    FROM User
    LEFT JOIN TaskProgress
    ON User.user_id = TaskProgress.user_id
    LEFT JOIN Player
    ON User.user_id = Player.player_id
    LEFT JOIN Task
    ON TaskProgress.task_id = Task.task_id
    GROUP BY User.user_id
    ORDER BY total_points DESC      
    `;

    pool.query(SQLSTATEMENT,callback);
}