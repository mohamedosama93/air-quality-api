const request = require('supertest');
const app = require('../../index'); // Import Express app
const sinon = require('sinon');
const airQualityService = require('../../src/services/airQualityService');

describe('Air Quality API', () => {
    afterEach(() => {
        sinon.restore();
        app.close
    });

    it('should return air quality data for given coordinates', async () => {
        const mockData = { status: 'success', data: { aqi: 75 } };
        sinon.stub(airQualityService, 'fetchAirQuality').resolves(mockData);

        const response = await request(app).get('/api/air-quality?lat=48.856613&lon=2.352222');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.aqi).toBe(75);
    });

    it('should return 500 on service failure', async () => {
        sinon.stub(airQualityService, 'fetchAirQuality').rejects(new Error('API error'));

        const response = await request(app).get('/api/air-quality?lat=48.856613&lon=2.352222');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Failed to fetch air quality data');
    });

    it('should return most polluted', async () => {
        const mockData = { status: 'success', data: { aqi: 75 } };
        sinon.stub(airQualityService, 'getMostPolluted').resolves(mockData);

        const response = await request(app).get('/api/most-polluted');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.aqi).toBe(75);
    });
});