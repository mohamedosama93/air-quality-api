const SequelizeMock = require('sequelize-mock');
const sinon = require('sinon');
const AirQualityRepository = require('../../src/repositories/airQualityRepo');
const AirQuality = require('../../src/models/airQuality');

// Create a mock database
const dbMock = new SequelizeMock();
const AirQualityMock = dbMock.define('AirQuality');

describe('Air Quality Repository', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should return the most polluted record', async () => {
        const mockRecord =
            {
                id: 2,
                ts: '2025-02-07T17:00:00.000Z',
                aqius: 85, // Highest AQI
                mainus: 'p2',
                aqicn: 40,
                maincn: 'p2'
            }

        sinon.stub(AirQuality, 'findOne').resolves(mockRecord);

        const result = await AirQualityRepository.getMostPolluted();

        expect(result).toEqual(mockRecord);
    });
});