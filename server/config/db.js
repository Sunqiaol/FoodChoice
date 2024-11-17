const Sequelize = require('sequelize');

// Load environment variables from .env file
require('dotenv').config();

// Initialize Sequelize with database credentials
const sequelize = new Sequelize(
    'FoodChoice_dailybusy', // Database name
    process.env.DB_USERNAME, // Database username
    process.env.DB_PASSWORD, // Database password
    {
        host: process.env.DB_HOST, // Database host
        port: 3307, // PostgreSQL port
        dialect: 'mysql', // PostgreSQL dialect
        logging: console.log,
    }
);

// Test the connection to the database
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
