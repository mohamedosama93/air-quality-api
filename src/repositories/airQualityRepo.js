const AirQuality = require('../models/airQuality');

const AirQualityRepo = {
    insert: async (data) => {
        return AirQuality.create(data);
    },

    getMostPolluted: async () => {
        return await AirQuality.findOne({ order: [['aqius', 'DESC']] });
    }
};

module.exports = AirQualityRepo;