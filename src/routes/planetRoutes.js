const express = require('express');
const router = express.Router();
const controller = require('../controllers/planetController');

// gets all planets
router.get('/', controller.getAllPlanets)

module.exports = router;