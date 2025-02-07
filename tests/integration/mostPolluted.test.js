const request = require('supertest');
const app = require('../../index');
const { sequelize } = require('../../src/config/db');

describe('Integration Test: GET /api/most-polluted', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        await sequelize.models.AirQuality.bulkCreate([
            {
                ts: '2025-02-07T16:00:00.000Z',
                aqius: 70,
                mainus: 'p2',
                aqicn: 35,
                maincn: 'p2',
            },
            {
                ts: '2025-02-07T17:00:00.000Z',
                aqius: 85,  // Highest AQI
                mainus: 'p2',
                aqicn: 40,
                maincn: 'p2',
            },
            {
                ts: '2025-02-07T18:00:00.000Z',
                aqius: 60,
                mainus: 'p2',
                aqicn: 25,
                maincn: 'p2',
            },
        ]);
    });

    afterEach(async () => {
        await sequelize.models.AirQuality.truncate();
        await app.close;
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should return the most polluted record', async () => {
        const response = await request(app).get('/api/most-polluted')

        // Verify the response
        expect(response.status).toBe(200);
        expect(response.body.aqius).toBe(85);
        expect(response.body.mainus).toBe('p2');
    });

    it('should return 400 if no data is found', async () => {
        // Remove all records to test the "no data" case
        await sequelize.models.AirQuality.truncate();

        const response = await request(app).get('/api/most-polluted');

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('No data available');
    });
});