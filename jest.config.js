module.exports = {
    setupFiles: ['dotenv/config'],  // Load environment variables before tests
    testEnvironment: 'node',
    globalSetup: './tests/setup.js',  // Explicitly set the absolute path
};