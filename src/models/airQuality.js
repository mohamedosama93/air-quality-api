const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AirQuality = sequelize.define('AirQuality', {
    ts: {
        type: DataTypes.DATE,
        allowNull: false
    },
    aqius: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mainus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aqicn: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    maincn: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = AirQuality;