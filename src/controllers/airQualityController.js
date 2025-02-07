const AirQualityService = require('../services/airQualityService');

const AirQualityController = {
    getAirQuality: async (req, res) => {
        console.log("here")
        const { lat, lon } = req.query;
        if (!lat || !lon) return res.status(400).json({ error: 'Latitude and Longitude are required' });

        try {
            const data = await AirQualityService.fetchAirQuality(lat, lon);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch air quality data' });
        }
    },

    getMostPolluted: async (req, res) => {
        try {
            const data = await AirQualityService.getMostPolluted();
            if (!data) {
                return res.status(400).json({ error: 'No data available' });
            }
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    }
};

module.exports = AirQualityController;