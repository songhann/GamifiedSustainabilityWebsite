const model = require("../models/playerModel.js");

// gets all players
module.exports.selectAllprofiles = (req, res, next) => {

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectAllprofiles:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAllprofiles(callback);
}

// controller for sending response
module.exports.jsOutput = (req, res, next) => {
    res.status(res.locals.statuscode).json(res.locals.output);
}

// gets player by playerID
module.exports.checkProfile = (req, res, next) => {

    const data = {
        playerid: req.params.player_id || req.body.player_id || res.locals.userId
    }

    if (data.playerid === undefined || data.playerid === "") {
        res.status(400).send("Error: PlayerID or UserID is undefined");
        return;
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkProfile:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Player not found"
                })

            }
            else {
                res.locals.output = results[0];
                res.locals.playerinfo = results[0];
                res.locals.statuscode = 200;

                next();
            }
        }

    }

    model.checkProfile(data, callback);
}

// gets owned items of a player by playerID
module.exports.getItemsbyPlayerId = (req, res, next) => {

    const data = {
        playerid: res.locals.userId || req.params.player_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getItemsbyPlayerId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({ "message": "No Items owned" })
            } else {
                res.status(200).json(results);
            }
        }
    }



    model.getItemsbyPlayerId(data, callback);



}

// gets all the distinct items that a player owns by planetID
module.exports.getUniqueItemsbyPlanetID = (req, res, next) => {

    const data = {
        playerid: req.body.player_id || res.locals.userId,
        planetid: res.locals.playerinfo.planet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getUniqueItems:", error);
            res.status(500).json(error);
        } else {
            // if player owns all items avaiable in the planet , unlocks new planet
            if (res.locals.playerinfo.planet_id == res.locals.planetamount) {
                res.locals.output = { message: "Item Received" }
                res.locals.statuscode = 201
                res.locals.newplanetid = res.locals.playerinfo.planet_id;
            }

            else if (results[0].count == res.locals.itemsinplanet) {
                res.locals.newplanetid = res.locals.playerinfo.planet_id + 1;
                res.locals.output = { message: "New Planet Unlocked and Item Received" }
                res.locals.statuscode = 201
            }

            else {
                res.locals.newplanetid = res.locals.playerinfo.planet_id;
                res.locals.output = { message: "Item Received" }
                res.locals.statuscode = 201
            }

            next();
        }

    }

    model.getUniqueItemsbyPlanetID(data, callback);
}

// updates player's planetID by playerID
module.exports.updatePlayerPlanetID = (req, res, next) => {

    const data = {
        playerid: req.body.player_id || res.locals.userId,
        planetid: res.locals.newplanetid
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePlayerPlanetID:", error);
            res.status(500).json(error);
        } else {
            next();
        }
    }

    model.updatePlayerPlanetID(data, callback);
}

// gets coin transaction history by playerID
module.exports.getCoinTransactionHistory = (req, res, next) => {

    const data = {
        playerid: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getCoinTransactionHistory:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({ "message": "No Transactions done" })
            } else {
                res.status(200).json(results);
            }
        }
    }

    model.getCoinTransactionHistory(data, callback);
}

// checks if item is able to be traded, if so gets the playeritem_id 
module.exports.checkItemOwnershipforTrade = (req, res, next) => {

    const data = {
        itemid: req.body.item_id,
        oldplayerid: res.locals.userId
    }

    if (data.oldplayerid == undefined || data.oldplayerid == "" || data.itemid == undefined) {
        res.status(400).send("Error: Item or Owner ID is undefined");
        return;
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkItemOwnership:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "You do not own that item"
                });
            }
            // if player does not have a duplicate of that item , cannot trade it
            else if (results.length == 1) {
                res.status(403).json({
                    message: "Not able to trade this item"
                });
            }
            else {
                res.locals.playeritemid = results[0].playeritem_id;
                next();
            }
        }
    }
    model.checkItemOwnership(data, callback);
}

// updates playeritem by playeritemID and changes the player_id to the new owner of the item
module.exports.doTrade = (req, res, next) => {

    if (req.body.date == undefined) {
        res.status(400).send("Error: Date is undefined");
        return;
    }

    const data = {
        playeritemid: res.locals.playeritemid,
        itemid: req.body.item_id,
        newplayerid: req.body.player_id,
        oldplayerid: res.locals.userId,
        date: req.body.date
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error doTrade:", error);
            res.status(500).json(error);
        } else {
            next();
        }
    }

    model.doTrade(data, callback);
}

// gets trade history of a player by playerID
module.exports.getTradeHistory = (req, res, next) => {

    const data = {
        playerid: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getTradeHistory:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.getTradeHistory(data, callback);
}

// controller to check if the player owns this item by playerID and itemID
module.exports.checkIfPlayerItemExist = (req, res, next) => {

    if (req.body.item_id == undefined) {
        res.status(400).send("Error: Item ID is undefined");
        return;
    }

    const data = {
        itemid: req.body.item_id,
        playerid: req.params.player_id || res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkIfPlayerItemExist:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "You do not own that item"
                })
            }
            else {
                next();
            }
        }
    }

    model.checkIfPlayerItemExist(data, callback);
}

// gets player customisation of a player by playerID
module.exports.getPresetbyPlayerID = (req, res, next) => {

    const data = {
        playerid: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getPresetbyPlayerID:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.checkIfItemEquipped(data, callback);
}

// gets amount of planets in the game
module.exports.getAllPlanets = (req, res, next) => {

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getAllPlanets:", error);
            res.status(500).json(error);
        } else {
            res.locals.planetamount = results.length;
            res.locals.statuscode = 200;
            next();
        }
    }

    model.getAllPlanets(callback);
}

// output for trade 
module.exports.trademessage = (req, res, next) => {
    res.locals.output = { message: `Item gifted successfully` }
    next();
}

// get distinct items owned by PlayerID and planetID
module.exports.getUniqueItemsbyPlayerIdandPlanetId = (req, res, next) => {
    const data = {
        playerid: res.locals.userId,
        planetid: req.params.planet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getUniqueItemsbyPlayerIdandPlanetId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({ "message": "No Items owned in this planet" })
            } else {
                res.status(200).json(results);
            }
        }
    }

    model.getUniqueItemsbyPlayerIdandPlanetId(data, callback);
}

// Updates PlayerPreset of Player to itemID
module.exports.equipItem = (req, res, next) => {
    const data = {
        itemid: req.body.item_id,
        playerid: res.locals.userId
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error equipItem:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({ message: "Item equipped" });
        }
    }


    if (res.locals.iteminfo.item_name.includes("Boots") == true) {
        model.equipBoots(data, callback);

    }
    else if (res.locals.iteminfo.item_name.includes("Chestplate") == true) {
        model.equipTop(data, callback);

    }
    else if (res.locals.iteminfo.item_name.includes("Pants") == true) {
        model.equipBottom(data, callback);
    }
    else if (res.locals.iteminfo.item_name.includes("Helmet") == true) {
        model.equipHelmet(data, callback);
    }
    else {
        model.equipWeapon(data, callback);
    }

}

// updates PlayerPreset to 0 , unequip item
module.exports.unequipItem = (req, res, next) => {
    const data = {
        playerid: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error unequipItem:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({ message: "Item unequipped" });
        }
    }


    if (res.locals.iteminfo.item_name.includes("Boots") == true) {
        model.unequipBoots(data, callback);

    }
    else if (res.locals.iteminfo.item_name.includes("Chestplate") == true) {
        model.unequipTop(data, callback);

    }
    else if (res.locals.iteminfo.item_name.includes("Pants") == true) {
        model.unequipBottom(data, callback);
    }
    else if (res.locals.iteminfo.item_name.includes("Helmet") == true) {
        model.unequipHelmet(data, callback);
    }
    else {
        model.unequipWeapon(data, callback);
    }
}

// checks if item is in the PlayerPreset
module.exports.checkIfItemEquipped = (req, res, next) => {
    const data = {
        itemid: req.body.item_id,
        playerid: res.locals.userId
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error unequipItem:", error);
            res.status(500).json(error);
        }

        itemIsInPreset = false
        for (const [key, value] of Object.entries(results[0])) {
            if (data.itemid == value) {
                itemIsInPreset = true
                break;
            }

        }
        if (itemIsInPreset == false) {
            res.status(400).json({ "message": "Item is not equipped" })
        }
        else {
            next();
        }
    }

    model.checkIfItemEquipped(data, callback);

}
