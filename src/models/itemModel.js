const pool = require('../services/db');

// gets All Items from database
module.exports.getAllItems = (callback)=> {
    const SQLSTATEMENT=`
    SELECT * FROM Items;
    `;

    pool.query(SQLSTATEMENT, callback);
}

// gets Items by planetID from database
module.exports.getItembyPlanetId = (data, callback)=> {
    const SQLSTATEMENT =`
    SELECT * FROM Items
    WHERE planet_id = ?;    
    `;

    const VALUES = [data.planetid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// gets Item by itemID from database
module.exports.getItembyItemId = (data, callback)=> {
    const SQLSTATEMENT =`
    SELECT * FROM Items
    WHERE item_id = ?;    
    `;

    const VALUES = [data.itemid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// creates a new PlayerItems into the database
module.exports.ObtainItem = (data, callback)=> {
    const SQLSTATEMENT=`
    INSERT INTO PlayerItems (player_id, item_id)
    VALUES (?,?);
    `;

    const VALUES = [data.playerid, data.itemid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}