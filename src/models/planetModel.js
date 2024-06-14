const pool = require('../services/db');

// get all planets from database
module.exports.getAllPlanets = (callback) => {
    const SQLSTATEMENT=`
    SELECT * FROM Planets;
    `;

    pool.query(SQLSTATEMENT, callback);
}