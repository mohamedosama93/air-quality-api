const axios = require('axios');
const sinon = require('sinon');
const airQualityService = require('../../src/services/airQualityService');
const AirQualityDTO = require("../../src/dtos/AirQualityDTO");

const lat = 48.856613;
const lon = 2.3522

describe('Air Quality Service', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should fetch air quality data successfully', async () => {
        // Mock API response
        const mockResponse = {
            "status": "success",
            "data": {
                "data": {
                    "city": "Paris",
                    "state": "Ile-de-France",
                    "country": "France",
                    "location": {
                        "type": "Point",
                        "coordinates": [
                            2.351666,
                            48.859425
                        ]
                    },
                    "current": {
                        "pollution": {
                            "ts": "2025-02-07T17:00:00.000Z",
                            "aqius": 75,
                            "mainus": "p2",
                            "aqicn": 31,
                            "maincn": "p2"
                        },
                        "weather": {
                            "ts": "2025-02-07T16:00:00.000Z",
                            "tp": 5,
                            "pr": 1016,
                            "hu": 83,
                            "ws": 5.14,
                            "wd": 70,
                            "ic": "10d"
                        }
                    }
                }
            },
        };
        sinon.stub(axios, 'get').resolves(mockResponse);

        const result = await airQualityService.fetchAirQuality(lat, lon);
        const expected = AirQualityDTO.from(mockResponse)

        expect(result).toEqual(expected);
    });

    it('should handle API errors', async () => {

        // Mock Axios error
        sinon.stub(axios, 'get').rejects(new Error('API failure'));

        const result = await airQualityService.fetchAirQuality(lat, lon);

        await expect(result).toEqual(null)
    });
});