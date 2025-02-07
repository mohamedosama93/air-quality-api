require('dotenv').config();
const express = require('express');
const { connectDB, sequelize } = require('./src/config/db');
const airQualityRoutes = require('./src/routes/airQualityRoutes');
require('./src/cron/airQualityCron');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', airQualityRoutes);

const startServer = async () => {
    await connectDB();
    await sequelize.sync(); // Ensure database tables are created

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
module.exports = app;