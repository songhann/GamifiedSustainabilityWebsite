const pool = require('../services/db');

// gets all messages from database
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT Messages.*, User.username as username FROM Messages
    INNER JOIN User
    ON User.user_id = Messages.user_id;
    `;

    pool.query(SQLSTATMENT, callback);
}

// gets message by MessageID from database
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Messages
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// inserts new message into database
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Messages (message_text, user_id)
    VALUES (?, ?);
    `;
    const VALUES = [data.message_text, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// Updates Message by MessageID into the database
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Messages 
    SET message_text = ?
    WHERE id = ?;
    `;
    const VALUES = [data.message_text, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// deletes message by MessageID
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Messages 
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// checks if the message is associated with the user
module.exports.verifyMessageAssociation = (data, callback) => {
    const SQLSTATMENT = `
    SELECT id FROM Messages
    WHERE id = ? AND user_id = ?;
    `;
    const VALUES = [data.messageid, data.userid];

    pool.query(SQLSTATMENT, VALUES, callback);
}