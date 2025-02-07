const axios = require('axios');
const AirQualityRepo = require('../repositories/airQualityRepo');
const AirQualityDTO = require("../dtos/AirQualityDTO");

const AirQualityService = {
    fetchAirQuality: async (lat, lon) => {
        try {
            const response = await axios.get(process.env.IQAIR_API_URL + "nearest_city", {
                params: { lat, lon, key: process.env.IQAIR_API_KEY },
                timeout: 2000
            });
            console.log(response.data ,AirQualityDTO.from(response));

            return AirQualityDTO.from(response);
        } catch (e) {
            console.log(e);
            return null;
        }
    },

    getMostPolluted: async () => {
        return await AirQualityRepo.getMostPolluted();
    }
};

module.exports = AirQualityService;