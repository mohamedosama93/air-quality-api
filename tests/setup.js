// tests/setup.js
require('dotenv').config({ path: '.env.test' });

module.exports = async () => {
    process.env.DB_DIALECT = 'sqlite';
    process.env.DB_STORAGE = ':memory:';
    process.env.DB_NAME = 'my_test_db';
    process.env.DB_HOST = 'localhost';
    process.env.DB_USER = 'test_user';
    process.env.DB_PASSWORD = 'test_password';
};