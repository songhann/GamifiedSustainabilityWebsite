const express = require('express');
const router = express.Router();
const controller = require('../controllers/minigameController');
const itemcontroller = require('../controllers/itemController');
const playercontroller = require('../controllers/playerController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// get all games 
router.get('/', controller.getAllGames);

// get games by gameID
router.get('/:game_id', controller.getGamesbyGameID, playercontroller.jsOutput);

// adds reward item to the player inventory after winning a minigame
router.post('/item/player', jwtMiddleware.verifyToken, playercontroller.checkProfile, controller.getGamesbyGameID, itemcontroller.ObtainItem, itemcontroller.getItembyPlanetId,playercontroller.getAllPlanets, playercontroller.getUniqueItemsbyPlanetID, playercontroller.updatePlayerPlanetID, playercontroller.jsOutput);   

module.exports = router; 