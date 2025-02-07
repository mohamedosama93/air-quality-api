const express = require('express');
const AirQualityController = require('../controllers/airQualityController');

const router = express.Router();

router.get('/air-quality', AirQualityController.getAirQuality);
router.get('/most-polluted', AirQualityController.getMostPolluted);

module.exports = router;