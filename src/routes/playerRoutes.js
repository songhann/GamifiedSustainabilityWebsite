const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerController');
const itemcontroller = require('../controllers/itemController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


// gets All Player Profiles
router.get('/', controller.selectAllprofiles);

// Allow user to unequip item
router.put('/unequip', jwtMiddleware.verifyToken, controller.checkProfile, itemcontroller.getItembyItemId,  controller.checkIfPlayerItemExist, controller.checkIfItemEquipped , controller.unequipItem);


// Allow user to equip item
router.put('/equip', jwtMiddleware.verifyToken, controller.checkProfile, itemcontroller.getItembyItemId,  controller.checkIfPlayerItemExist, controller.equipItem);

// gets user preset
router.get('/preset', jwtMiddleware.verifyToken,controller.checkProfile, controller.getPresetbyPlayerID);

// gets items owned by a player by the playerID or by token
router.get('/byauthorization/items', jwtMiddleware.verifyToken, controller.checkProfile, controller.getItemsbyPlayerId);
router.get('/:player_id/items', controller.checkProfile, controller.getItemsbyPlayerId);

// gets item owned by a player by playerID and planetID
router.get('/byauthorization/items/planet/:planet_id', jwtMiddleware.verifyToken, controller.checkProfile, controller.getUniqueItemsbyPlayerIdandPlanetId);


// gets the coin transaction history by playerID
router.get('/byauthorization/transaction', jwtMiddleware.verifyToken,controller.checkProfile,controller.getCoinTransactionHistory);

// gets Player Profile by playerID or by token
router.get('/byauthorization', jwtMiddleware.verifyToken, controller.checkProfile , controller.jsOutput);
router.get('/:player_id', controller.checkProfile , controller.jsOutput);

// gets the trade history by playerID
router.get('/byauthorization/tradehistory',jwtMiddleware.verifyToken, controller.checkProfile, controller.getTradeHistory);

// Allows player to trade an item by itemID to another player
router.put('/trade', jwtMiddleware.verifyToken, controller.checkItemOwnershipforTrade, controller.checkProfile, controller.doTrade,itemcontroller.getItembyPlanetId, controller.getAllPlanets, controller.getUniqueItemsbyPlanetID, controller.updatePlayerPlanetID, controller.trademessage, controller.jsOutput);

module.exports = router;