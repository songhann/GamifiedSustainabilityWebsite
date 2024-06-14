const model = require("../models/planetModel.js");

// get all planets
module.exports.getAllPlanets = (req,res,next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getAllPlanets:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.getAllPlanets(callback);
}