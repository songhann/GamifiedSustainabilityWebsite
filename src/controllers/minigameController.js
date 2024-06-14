const model = require("../models/minigameModel.js");

// get all minigames available
module.exports.getAllGames = (req, res, next) => {

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getAllGames:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.getAllGames(callback);
}

// gets minigame by gameID
module.exports.getGamesbyGameID = (req, res, next) => {

    const data = {
        gameid: req.params.game_id || req.body.game_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getGamesbyGameID:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Game not found"
                });
            }

            res.locals.output = results[0];
            res.locals.gameinfo = results[0];
            res.locals.statuscode = 200;

            next();

        }
    }

    model.getGamesbyGameID(data, callback);
}