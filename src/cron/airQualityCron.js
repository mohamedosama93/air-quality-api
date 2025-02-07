const cron = require('node-cron');
const AirQualityService = require('../services/airQualityService');
const AirQualityRepo = require("../repositories/airQualityRepo");

cron.schedule('* * * * *', async () => {
    try {
        const airQuality = await AirQualityService.fetchAirQuality(process.env.DEFAULT_LATITUDE, process.env.DEFAULT_LONGTIDUE);

        const {ts, aqius, mainus, aqicn, maincn} = airQuality.data.current.pollution;
        const airQualityData = {ts, aqius, mainus, aqicn, maincn};
         await AirQualityRepo.insert(airQualityData);
    } catch (e) {
     console.error("Failed to sync", e)
    }
});