const pool = require('../services/db');

// gets all games from database
module.exports.getAllGames = (callback)=>{
    const SQLSTATEMENT=`
    SELECT game_id, game_name, itemwon_id, DATE(created_on) as created_on , Items.item_name
    FROM Minigames
    INNER JOIN Items ON Minigames.itemwon_id = Items.item_id;
    `;

    pool.query(SQLSTATEMENT, callback);
}

// get minigame from gameID from the database
module.exports.getGamesbyGameID = (data, callback)=> {
    const SQLSTATEMENT=`
    SELECT game_id, game_name, itemwon_id, DATE(created_on) as created_on 
    FROM Minigames
    WHERE game_id = ?;
    `;

    const VALUES = [data.gameid];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
