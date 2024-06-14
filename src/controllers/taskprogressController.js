const model = require("../models/taskprogressModel.js");

// creates task progress 
module.exports.CreateTaskProgress = (req, res, next) => {
    if (req.body.completion_date == undefined) {
        res.status(400).send("Error: completion date is undefined");
        return;
    }

    const data = {
        userid: res.locals.userId,
        taskid: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    }

    res.locals.playerid = res.locals.userId;
    res.locals.date = req.body.completion_date;

    const callback = (error, results, fields) => {

        if (error) {
            console.error("Error CreateTaskProgress:", error);
            res.status(500).json(error);
        } else {
            res.locals.coinadded = results[3][0].points * res.locals.multiplier;
            res.locals.output = results[1][0];
            res.locals.statuscode = 201;
            res.locals.totalcoins = results[2][0].coins + (results[3][0].points * res.locals.multiplier);
            res.locals.note = 'Task Reward'
            next();
        }

    }

    model.CreateTaskProgress(data, callback);
}

// gets the multiplier for the planet that the player is in
module.exports.getMultiplier = (req, res, next) => {

    const data = {
        planetid: res.locals.playerinfo.planet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateCoins:", error);
            res.status(500).json(error);
        } else {
            res.locals.multiplier = results[0].multiplier
            next();
        }
    }

    model.getMultiplier(data, callback);
}

// updates the player coins 
module.exports.updateCoins = (req, res, next) => {

    const data = {
        totalcoins: res.locals.totalcoins,
        playerid: req.body.player_id || res.locals.userId,
        coinadded: res.locals.coinadded,
        date: res.locals.date,
        note: res.locals.note
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateCoins:", error);
            res.status(500).json(error);
        } else {
            next();
        }

    }

    model.updateCoins(data, callback);
}

// gets taskprogress by taskprogressID
module.exports.SelectTaskProgressbyId = (req, res, next) => {

    if (req.params.progress_id == undefined) {
        res.status(400).send("Error: Progress ID is undefined");
        return;
    }

    const data = {
        progressid: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error SelectTaskProgressbyId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({ "message": "Task Progress does not exist" })
            } else {
                res.status(200).json(results[0]);
            }
        }
    }

    model.SelectTaskProgressbyId(data, callback);
}

// checks if the TaskProgress is associated with the UserID
module.exports.checkIfTaskProgressBelongsToUser = (req, res, next) => {
    const data = {
        userid: res.locals.userId,
        taskprogressid: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkIfTaskProgressBelongsToUser:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({ "message": "Task Progress does not belong to this user" })
            } else {
                next();
            }
        }
    }

    model.checkIfTaskProgressBelongsToUser(data, callback);
}

// gets TaskProgress by UserID
module.exports.getTaskProgressbyUserID = (req, res, next) => {
    const data = {
        userid: res.locals.userId
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getTaskProgressbyUserID:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.getTaskProgressbyUserID(data, callback);
}