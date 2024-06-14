const model = require("../models/messageModel.js");
const pool = require("../services/db.js");

// posts a message
module.exports.createMessage = (req, res, next) => {
    if (req.body.message_text == undefined || req.body.message_text == "") {
        res.status(400).json({message : "You did not enter a message"});
        return;
    }

    const data = {
        user_id : res.locals.userId,
        message_text: req.body.message_text
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }

    model.insertSingle(data, callback);
}

// gets message by MessageID
module.exports.readMessageById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readMessageById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

// get all messages
module.exports.readAllMessage = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAll(callback);
}

// update message by MessageID
module.exports.updateMessageById = (req, res, next) => {
    if (req.body.message_text == undefined || req.body.message_text == "") {
        res.status(400).send("Error: message_text is undefined or empty");
        return;
    }

    const data = {
        id: req.params.id,
        message_text: req.body.message_text
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.updateById(data, callback);
}

//deletes message by MessageID
module.exports.deleteMessageById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(204).send();
        }
    }

    model.deleteById(data, callback);
}

// checks if message is associated with the given UserID
module.exports.verifyMessageAssociation = (req, res, next) => {
    if (req.params.id == undefined) {
        res.status(400).send("Error: id is undefined");
        return;
    }
    const data = {
        userid: res.locals.userId,
        messageid: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error verifyMessageAssociation:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(401).json({ message: "This message does not belong to you" })
            }
            else {
                next();
            }

        }
    }

    model.verifyMessageAssociation(data, callback);
}