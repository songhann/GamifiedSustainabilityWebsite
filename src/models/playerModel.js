const pool = require('../services/db');

// gets all players from database
module.exports.selectAllprofiles = (callback) => {
    const SQLSTATEMENT = `
    SELECT Player.* , User.username as username FROM Player
    INNER JOIN User ON User.user_id = Player.player_id
    `;

    pool.query(SQLSTATEMENT, callback);
}

// gets player by playerID from database
module.exports.checkProfile = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Player
    WHERE player_id = ?;
    `;

    const VALUES = [data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets all items owned by player by playerID from the database
module.exports.getItemsbyPlayerId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT PlayerItems.player_id, Items.*
    FROM Items
    INNER JOIN PlayerItems ON Items.item_id = PlayerItems.item_id
    WHERE PlayerItems.player_id = ?;
    `;

    const VALUES = [data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// updates player planetID by playerID in database
module.exports.updatePlayerPlanetID = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE Player
    SET planet_id = ?
    WHERE player_id = ?;
    `;

    const VALUES = [data.planetid, data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets the amount of distinct items a player owns based on planetID from database
module.exports.getUniqueItemsbyPlanetID = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT COUNT(DISTINCT PlayerItems.item_id) as count 
    FROM PlayerItems
    INNER JOIN Items ON PlayerItems.item_id = Items.item_id
    WHERE PlayerItems.player_id = ? AND Items.planet_id = ?
    `;

    const VALUES = [data.playerid, data.planetid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets coin transaction history of a player by playerID from database
module.exports.getCoinTransactionHistory = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM CoinTransactionHistory
    WHERE player_id = ?;
    `;

    const VALUES = [data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets PlayerItems by player_id and item_id from database
module.exports.checkItemOwnership = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT playeritem_id FROM PlayerItems
    WHERE player_id = ? AND item_id = ?;
    `;

    const VALUES = [data.oldplayerid, data.itemid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// updates playeritems with new playerID by playeritemID in database , creates new trade history into database
module.exports.doTrade = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE PlayerItems
    SET player_id = ?
    WHERE playeritem_id = ?;

    INSERT INTO TradeHistory (item_id, oldplayer_id, newplayer_id, trade_datetime)
    VALUES (?, ?, ?, ?);
    `;

    const VALUES = [data.newplayerid, data.playeritemid, data.itemid, data.oldplayerid, data.newplayerid, data.date];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets trade history of player by playerID from database
module.exports.getTradeHistory = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT TradeHistory.*, Items.item_name FROM TradeHistory
    INNER JOIN Items
    ON Items.item_id = TradeHistory.item_id
    WHERE oldplayer_id = ? OR newplayer_id = ?;
    `;

    const VALUES = [data.playerid, data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets PlayerItems by playerID and itemID from database
module.exports.checkIfPlayerItemExist = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM PlayerItems
    WHERE player_id = ? AND item_id = ?;
    `;

    const VALUES = [data.playerid, data.itemid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// updates PlayerPreset helmet slot in database
module.exports.equipHelmet = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE PlayerPreset
    SET helmet = ?
    WHERE player_id = ?;
    `;

    const VALUES = [data.itemid, data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// updates PlayerPreset helmet slot to 0 in database
module.exports.unequipHelmet = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE PlayerPreset
    SET helmet = 0
    WHERE player_id = ?;
    `;

    const VALUES = [data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// updates PlayerPreset top slot in database
module.exports.equipTop = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE PlayerPreset
    SET top = ?
    WHERE player_id = ?;
    `;

    const VALUES = [data.itemid, data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// updates PlayerPreset top slot to 0 in database
module.exports.unequipTop = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE PlayerPreset
    SET top = 0
    WHERE player_id = ?;
    `;

    const VALUES = [data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// updates PlayerPreset bottom slot in database
module.exports.equipBottom = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE PlayerPreset
    SET bottom = ?
    WHERE player_id = ?;
    `;

    const VALUES = [data.itemid, data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// updates PlayerPreset bottom slot to 0 in database
module.exports.unequipBottom = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE PlayerPreset
    SET bottom = 0
    WHERE player_id = ?;
    `;

    const VALUES = [data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// updates PlayerPreset boots slot in database
module.exports.equipBoots = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE PlayerPreset
    SET boots = ?
    WHERE player_id = ?;
    `;

    const VALUES = [data.itemid, data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// updates PlayerPreset boots slot to 0 in database
module.exports.unequipBoots = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE PlayerPreset
    SET boots = 0
    WHERE player_id = ?;
    `;

    const VALUES = [data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets all planets from database
module.exports.getAllPlanets = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Planets;
    `;

    pool.query(SQLSTATEMENT, callback);
}

// get distinct items owned by playerID and by planetID from database
module.exports.getUniqueItemsbyPlayerIdandPlanetId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT DISTINCT PlayerItems.item_id , Items.*
    FROM PlayerItems
    INNER JOIN Items ON PlayerItems.item_id = Items.item_id
    WHERE PlayerItems.player_id = ? AND Items.planet_id = ?
    `;

    const VALUES = [data.playerid, data.planetid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// updates PlayerPreset weapon slot in database
module.exports.equipWeapon = (data, callback) => {
    const SQLSTATEMENT =  `
    UPDATE PlayerPreset
    SET weapon = ?
    WHERE player_id = ?;
    
    `;
    const VALUES = [data.itemid, data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
// updates PlayerPreset weapon slot to 0 in database
module.exports.unequipWeapon = (data, callback) => {
    const SQLSTATEMENT =  `
    UPDATE PlayerPreset
    SET weapon = 0
    WHERE player_id = ?;
    
    `;
    const VALUES = [data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets PlayerPreset by playerID from database
module.exports.checkIfItemEquipped = (data, callback) => {
    const SQLSTATEMENT =  `
    SELECT  PlayerPreset.helmet,  PlayerPreset.top,  PlayerPreset.bottom ,  PlayerPreset.boots,  PlayerPreset.weapon FROM  PlayerPreset
    WHERE player_id = ? ;
    
    `;
    const VALUES = [data.playerid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}