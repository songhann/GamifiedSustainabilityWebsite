const model = require("../models/itemModel.js");

// gets All Items
module.exports.getAllItems = (req, res, next) => {

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getAllItems:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.getAllItems(callback);
}

// gets Items by planetID
module.exports.getItembyPlanetId = (req, res, next) => {

    const data = {
        planetid: req.params.planet_id || res.locals.playerinfo.planet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getItembyPlanetId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Planet not found"
                });
            }
            else {
                res.locals.output = results;
                res.locals.itemsinplanet = results.length;
                res.locals.statuscode = 200;
                next();
            }
        }

    }

    model.getItembyPlanetId(data, callback);
}

// gets Item by itemID
module.exports.getItembyItemId = (req, res, next) => {

    const data = {
        itemid: req.params.item_id || req.body.item_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getItembyItemId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Item not found"
                });
            }
            else {
                res.locals.output = results[0];
                res.locals.iteminfo = results[0];
                res.locals.statuscode = 200;
                next();
            }
        }

    }

    model.getItembyItemId(data, callback);
}

// controller to check if player is eligible to purchase a certain item
module.exports.checkObtainable = (req, res, next) => {

    if (req.body.item_id == undefined) {
        res.status(400).json({message: "Error: Item ID is undefined"});
        return;
    }

    if (req.body.date == undefined) {
        res.status(400).json({message: "Error: Date is undefined"});
        return;
    }

    if (res.locals.iteminfo.planet_id > res.locals.playerinfo.planet_id && res.locals.iteminfo.cost > res.locals.playerinfo.coins) {
        res.status(403).json({message: "Planet level not reached & insufficient coins to purchase item"});
        return;
    }

    if (res.locals.iteminfo.planet_id > res.locals.playerinfo.planet_id) {
        res.status(403).json({message: "Planet level not reached to purchase item"});
        return;
    }

    if (res.locals.iteminfo.cost > res.locals.playerinfo.coins) {
        res.status(403).json({message: "Insufficient coins to purchase item"});
        return;
    }

    else {
        res.locals.coinadded = 0 - res.locals.iteminfo.cost;
        res.locals.totalcoins = res.locals.playerinfo.coins - res.locals.iteminfo.cost;
        next();
    }
}
// adds the item into the player inventory
module.exports.ObtainItem = (req, res, next) => {

    const data = {
        itemid: req.body.item_id || res.locals.gameinfo.itemwon_id,
        playerid: res.locals.userId
    }

    res.locals.date = req.body.date;
    res.locals.note = 'Item bought';

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error ObtainItem:", error);
            res.status(500).json(error);
        } else {
            next();
        }
    }

    model.ObtainItem(data, callback);
}