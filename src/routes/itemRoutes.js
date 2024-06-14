const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemController');
const playercontroller = require('../controllers/playerController');
const taskprogressController = require('../controllers/taskprogressController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// gets All Items
router.get('/' , controller.getAllItems);

// gets Items by PlanetID
router.get('/planet/:planet_id', controller.getItembyPlanetId, playercontroller.jsOutput);

// gets Items by ItemID
router.get('/:item_id', controller.getItembyItemId, playercontroller.jsOutput);

// allows player to purchase item and adds the item to inventory
router.post('/player', jwtMiddleware.verifyToken ,playercontroller.checkProfile,controller.getItembyItemId, controller.checkObtainable, controller.ObtainItem, controller.getItembyPlanetId, playercontroller.getAllPlanets, playercontroller.getUniqueItemsbyPlanetID,playercontroller.updatePlayerPlanetID, taskprogressController.updateCoins , playercontroller.jsOutput);

module.exports = router; 